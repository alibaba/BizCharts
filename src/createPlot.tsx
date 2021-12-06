import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';

import _uniqId from '@antv/util/lib/unique-id';

import _isFunction from '@antv/util/lib/is-function';
import withContainer from './boundary/withContainer';
import ErrorBoundary, { ErrorFallback } from './boundary/ErrorBoundary';
import RootChartContext from './context/root';
import ChartViewContext from './context/view';
import { visibleHelper } from './utils/plotTools';
import shallowEqual from './utils/shallowEqual';
import pickWithout from './utils/pickWithout';
import cloneDeep from './utils/cloneDeep';
import { REACT_PIVATE_PROPS } from './utils/constant';
import { Plot } from '@antv/g2plot/lib/core/plot';
import { ResizeObserver } from '@juggle/resize-observer';
import getElementSize from './utils/getElementSize';
import {
  polyfillEvents,
  polyfillTitleEvent,
  polyfillDescriptionEvent,
} from './plots/core/polyfill';
import { debounce, isArray, isFunction, isNil } from '@antv/util';
import isEqual from './utils/isEqual';
import warn from 'warning';

// 国际化处理
import { registerLocale } from '@antv/g2plot/lib/core/locale';
import { EN_US_LOCALE } from '@antv/g2plot/lib/locales/en_US';
import { ZH_CN_LOCALE } from '@antv/g2plot/lib/locales/zh_CN';
/** default locale register */
registerLocale('en-US', EN_US_LOCALE);
registerLocale('zh-CN', ZH_CN_LOCALE);

const DEFAULT_PLACEHOLDER = (
  <div
    style={{ position: 'absolute', top: '48%', left: '50%', color: '#aaa', textAlign: 'center' }}
  >
    暂无数据
  </div>
);

const DESCRIPTION_STYLE: CSSProperties = {
  padding: '8px 24px 10px 10px',
  fontFamily: 'PingFang SC',
  fontSize: 12,
  color: 'grey',
  textAlign: 'left',
  lineHeight: '16px',
};

const TITLE_STYLE: CSSProperties = {
  padding: '10px 0 0 10px',
  fontFamily: 'PingFang SC',
  fontSize: 18,
  color: 'black',
  textAlign: 'left',
  lineHeight: '20px',
};

interface BasePlotOptions {
  /**
   * 获取g2Plot实例的勾子函数
   */
  onGetG2Instance?: (chart: Plot<any>) => void;
  errorContent?: React.ReactNode;
  /**
   * 图表事件
   */
  events?: Record<string, Function>;
  /**
   * 图表标题。如需绑定事件请直接使用ReactNode。
   */
  readonly title?: React.ReactNode;
  /**
   * 图表副标题。如需绑定事件请直接使用ReactNode。
   */
  readonly description?: React.ReactNode;
  /**
   * 请使用autoFit替代forceFit
   */
  forceFit?: boolean;
  /**
   * 是否是物料组件，因搭建引擎消费ref和原来的组件吐的react实例不兼容。
   * 该属性会影响ref的消费，为ali-lowcode-engine消费而生。
   */
  isMaterial?: boolean;
}

export { BasePlotOptions };

class BasePlot extends React.Component<any> {
  [x: string]: any;
  g2Instance: any;
  preConfig: any;
  public _context: { chart: any } = { chart: null };

  componentDidMount() {
    if (this.props.children && this.g2Instance.chart) {
      this.g2Instance.chart.render();
    }
    polyfillEvents(this.g2Instance, {}, this.props);
    this.g2Instance.data = this.props.data;
    this.preConfig = cloneDeep(pickWithout(this.props, [
      ...REACT_PIVATE_PROPS,
      'container',
      'PlotClass',
      'onGetG2Instance',
      'data',
    ]));
  }
  componentDidUpdate(prevProps) {
    if (this.props.children && this.g2Instance.chart) {
      this.g2Instance.chart.render();
    }
    // 兼容1.0 的events写法
    polyfillEvents(this.g2Instance, prevProps, this.props);
  }
  componentWillUnmount() {
    if (this.g2Instance) {
      setTimeout(() => {
        this.g2Instance.destroy();
        this.g2Instance = null;
        this._context.chart = null;
      }, 0);
    }
  }
  public getG2Instance() {
    return this.g2Instance;
  }

  getChartView() {
    return this.g2Instance.chart;
  }

  protected checkInstanceReady() {
    // 缓存配置
    const currentConfig = pickWithout(this.props, [
      ...REACT_PIVATE_PROPS,
      'container',
      'PlotClass',
      'onGetG2Instance',
      'data',
    ]);
    if (!this.g2Instance) {
      this.initInstance();
      this.g2Instance.render();
    } else if (this.shouldReCreate()) {
      // forceupdate
      this.g2Instance.destroy();
      this.initInstance();
      this.g2Instance.render();
    } else if (this.diffConfig() ) {
      // options更新
      this.g2Instance.update({
        ...currentConfig,
        data: this.props.data
      });
    } else if (this.diffData()) {
      this.g2Instance.changeData(this.props.data);
    }
    
    this.preConfig = cloneDeep(currentConfig);
    this.g2Instance.data = this.props.data;
  }

  initInstance() {
    const { container, PlotClass, onGetG2Instance, children, ...options } = this.props;
    this.g2Instance = new PlotClass(container, options);
    this._context.chart = this.g2Instance;
    if (_isFunction(onGetG2Instance)) {
      onGetG2Instance(this.g2Instance);
    }
  }
  diffConfig() {
    // 只有数据更新就不重绘，其他全部直接重新创建实例。
    const preConfig = this.preConfig || {};
    const currentConfig = pickWithout(this.props, [
      ...REACT_PIVATE_PROPS,
      'container',
      'PlotClass',
      'onGetG2Instance',
      'data',
    ]);
    return !isEqual(preConfig, currentConfig);
  }
  diffData() {
    // 只有数据更新就不重绘，其他全部直接重新创建实例。
    const preData = this.g2Instance.data;
    const data = this.props.data;

    if (!isArray(preData) || !isArray(data)) {
      // 非数组直接对比
      return !preData === data;
    }
    if (preData.length !== data.length) {
      return true;
    }
    let isEqual = true;
    preData.forEach((element, index) => {
      if (!shallowEqual(element, data[index])) {
        isEqual = false;
      }
    });
    return !isEqual;
  }

  shouldReCreate() {
    const { forceUpdate } = this.props;
    if (forceUpdate) {
      return true;
    }
    return false;
  }

  render() {
    this.checkInstanceReady();
    const chartView = this.getChartView();
    return (
      <RootChartContext.Provider value={this._context}>
        {/* 每次更新都直接刷新子组件 */}
        <ChartViewContext.Provider value={chartView}>
          <div key={_uniqId('plot-chart')}>{this.props.children}</div>
        </ChartViewContext.Provider>
      </RootChartContext.Provider>
    );
  }
}

const BxPlot = withContainer(BasePlot) as any;

function createPlot<IPlotConfig extends Record<string, any>>(
  PlotClass,
  name: string,
  transCfg: Function = cfg => cfg,
) {
  const Com = React.forwardRef<any, IPlotConfig>((props: IPlotConfig, ref) => {
    // containerStyle 应该删掉，可以通过containerProps.style 配置不影响用户暂时保留
    const { title, description, autoFit = true, forceFit, errorContent = ErrorFallback, containerStyle, containerProps, placeholder, ErrorBoundaryProps, isMaterial, ...cfg } = props;
    
    const realCfg = transCfg(cfg);
    const container = useRef<HTMLDivElement>();
    const titleDom = useRef();
    const descDom = useRef();

    const [chartHeight, setChartHeight] = useState(0);
    const resizeObserver = useRef<ResizeObserver>();
    const resizeFn = useCallback(() => {
      if (!container.current) {
        return
      }
      const containerSize = getElementSize(container.current, props)
      const titleSize = titleDom.current ? getElementSize(titleDom.current) : { width: 0, height: 0 };
      const descSize = descDom.current ? getElementSize(descDom.current) : { width: 0, height: 0 };
      let ch = (containerSize.height - titleSize.height - descSize.height);
      if (ch === 0) {
        // 高度为0 是因为用户没有设置高度
        ch = 350;
      }
      if (ch < 20) {
        // 设置了高度，但是太小了
        ch = 20;
      }
      // 误差达到1像素后再重置，防止精度问题
      if (Math.abs(chartHeight - ch) > 1) {
        setChartHeight(ch);
      }
    },  [container.current, titleDom.current, chartHeight, descDom.current])
    const resize = useCallback(debounce(resizeFn, 500),[resizeFn])

    const FallbackComponent = React.isValidElement(errorContent) ? () => errorContent : errorContent;
    // 每个图表的showPlaceholder 逻辑不一样，有的是判断value，该方法为静态方法
    if (placeholder && !realCfg.data) {
      const pl = placeholder === true ? DEFAULT_PLACEHOLDER : placeholder;
      // plot 默认是400px高度
      return <ErrorBoundary FallbackComponent={FallbackComponent} {...ErrorBoundaryProps}>
        <div style={{ width: props.width || '100%',  height: props.height || 400, textAlign: 'center', position: 'relative' }}>
          {pl}
        </div>
      </ErrorBoundary>;
    }
    const titleCfg = visibleHelper(title, false) as any;
    const descriptionCfg = visibleHelper(description, false) as any;
    const titleStyle = {...TITLE_STYLE, ...titleCfg.style};
    const descStyle = { ...DESCRIPTION_STYLE, ...descriptionCfg.style, top: titleStyle.height };
    const isAutoFit = (forceFit !== undefined) ? forceFit : autoFit;

    if (!isNil(forceFit)) {
      warn(false, '请使用autoFit替代forceFit');
    };

    useEffect(() => {
      if (!isAutoFit) {
        if (container.current) {
          resizeFn();
          resizeObserver.current && resizeObserver.current.unobserve(container.current);
        }
      } else {
        if (container.current) {
          resizeFn();
          resizeObserver.current = new ResizeObserver(resize);
          resizeObserver.current.observe(container.current);
        } else {
          setChartHeight(0);
        }
      }
      return () => {
        resizeObserver.current && container.current && resizeObserver.current.unobserve(container.current)
      };
    }, [container.current, isAutoFit])


    return <ErrorBoundary FallbackComponent={FallbackComponent} {...ErrorBoundaryProps}>
      <div ref={(el) => {
        container.current = el; // null or div
        // 合并ref，供搭建引擎消费。原来的ref已使用，搭建引擎需要最外层div。
        if (isMaterial) {
          if (isFunction(ref)) {
            ref(el);
          } else if(ref) {
            ref.current = el;
          }
        }
      }} className="bizcharts-plot" {...containerProps} style={{ position:'relative', height: props.height || '100%', width: props.width || '100%' }}>
        {/* title 不一定有 */}
        { titleCfg.visible && <div ref={titleDom} {...polyfillTitleEvent(realCfg)} className="bizcharts-plot-title" style={titleStyle}>{titleCfg.text}</div> }
        {/* description 不一定有 */}
        { descriptionCfg.visible && <div ref={descDom} {...polyfillDescriptionEvent(realCfg)} className="bizcharts-plot-description" style={descStyle}>{descriptionCfg.text}</div> }
        {!!chartHeight && <BxPlot
          // API 统一
          appendPadding={[10 , 5, 10, 10]}
          autoFit={isAutoFit}
          // 注意：isMaterial ref 吐的是最外层div，供ali-lowcode-engine消费。原先的消费方式不能breack。
          ref={isMaterial ? undefined : ref}
          {...realCfg}
          PlotClass={PlotClass}
          containerStyle={{
            // 精度有误差
            ...containerStyle,
            height: chartHeight,
          }}
        />}
      </div>
    </ErrorBoundary>
  });
  Com.displayName = name || PlotClass.name;
  return Com;
}

export default createPlot;
