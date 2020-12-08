import React, { CSSProperties } from 'react';

import _uniqId from '@antv/util/lib/unique-id';
import _isEqual from '@antv/util/lib/is-equal';
import _isFunction from '@antv/util/lib/is-function';
import withContainer from './boundary/withContainer';
import ErrorBoundary from './boundary/ErrorBoundary';
import RootChartContext from './context/root';
import ChartViewContext from './context/view';
import { visibleHelper } from './utils/plotTools';
import shallowEqual from './utils/shallowEqual';
import pickWithout from './utils/pickWithout';
import cloneDeep from './utils/cloneDeep';
import { REACT_PIVATE_PROPS } from './utils/constant';
import { Plot } from '@antv/g2plot/lib/core/plot';
import { polyfillEvents, polyfillTitleEvent, polyfillDescriptionEvent } from './plots/core/polyfill';

const DEFAULT_PLACEHOLDER = <div style={{ position: 'absolute', top: '48%', left: '50%', color: '#aaa', textAlign: 'center' }}>暂无数据</div>;


const DESCRIPTION_STYLE: CSSProperties =  {
  padding: '8px 24px 10px 10px',
  fontFamily: 'PingFang SC',
  fontSize: 12,
  color: 'grey',
  textAlign: 'left',
  lineHeight: '16px',
};

const TITLE_HEIGHT = 30;
const DESCRIPTION_HEIGHT = 34;

const TITLE_STYLE: CSSProperties = {
  padding: '10px 0 0 10px',
  fontFamily: 'PingFang SC',
  fontSize: 18,
  color: 'black',
  textAlign: 'left',
  lineHeight: '20px',
}

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
  * forceFit即将废弃，请使用autoFit替代
  */
  forceFit?: boolean,
};

export { BasePlotOptions };

class BasePlot extends React.Component<any> {
  [x: string]: any;
  g2Instance: any;
  preConfig: any;
  public _context: { chart: any } = { chart: null };

  componentDidMount() {
    console.log('this.props', this.props)
    polyfillEvents(this.g2Instance, {}, this.props);
    this.g2Instance.data = this.props.data;
    this.preConfig = pickWithout(this.props, [...REACT_PIVATE_PROPS, 'container', 'PlotClass', 'onGetG2Instance', 'data']);
  }
  componentDidUpdate(prevProps) {
    // 兼容1.0 的events写法
    polyfillEvents(this.g2Instance, prevProps, this.props);
  }
  componentWillUnmount() {
    if(this.g2Instance) {
      setTimeout(() => {
        this.g2Instance.destroy();
        this.g2Instance = null;
        this._context.chart = null;
      }, 0)
    }
  }
  public getG2Instance() {
    return this.g2Instance;
  }

  getChartView() {
    console.log(this.g2Instance);
    return this.g2Instance.chart;
  }

  protected checkInstanceReady() {
    if (!this.g2Instance) {
      this.initInstance();
      this.g2Instance.render();
    } else if (this.shouldReCreate()) {
      // 只有数据更新就不重绘，其他全部直接重新创建实例。
      this.g2Instance.destroy();
      this.initInstance();
      this.g2Instance.render();
    } else if (this.diffConfig()) {
      const options = pickWithout(this.props, ['container', 'PlotClass', 'onGetG2Instance', 'children']);
      this.g2Instance.update(options);
    } else if (this.diffData()) {
      this.g2Instance.changeData(this.props.data);
    }
  }


  initInstance() {
    const { container, PlotClass, onGetG2Instance, children, ...options } = this.props;
    this.g2Instance = new PlotClass(container, options);
    this._context.chart = this.g2Instance;
    if(_isFunction(onGetG2Instance)) {
      onGetG2Instance(this.g2Instance);
    }
  }
  diffConfig() {
    // 只有数据更新就不重绘，其他全部直接重新创建实例。
    const preConfig = this.preConfig || {};
    const currentConfig = pickWithout(this.props, [...REACT_PIVATE_PROPS, 'container', 'PlotClass', 'onGetG2Instance', 'data']);
    this.preConfig = cloneDeep(currentConfig);
    return !_isEqual(preConfig, currentConfig);
  }
  diffData() {
    // 只有数据更新就不重绘，其他全部直接重新创建实例。
    const preData = this.g2Instance.data || [];
    const data = this.props.data || [];
    // 数据只做2级浅比较
    this.g2Instance.data = this.props.data;
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
    return <RootChartContext.Provider value={this._context}>
      {/* 每次更新都直接刷新子组件 */}
      <ChartViewContext.Provider value={chartView} >
        <div>
          {this.props.children}
        </div>
      </ChartViewContext.Provider>
    </RootChartContext.Provider>;
  }
}

const BxPlot = withContainer(BasePlot) as any;

function createPlot<IPlotConfig extends Record<string, any>>(Plot, name: string, transCfg: Function = (cfg) => cfg) {
  const Com = React.forwardRef<any, IPlotConfig>((props: IPlotConfig, ref) => {
    const { title, description, autoFit, errorContent, placeholder, ...cfg } = props;
    const realCfg = transCfg(cfg);
    // 每个图表的showPlaceholder 逻辑不一样，有的是判断value，该方法为静态方法
    if (placeholder && !realCfg.data) {
      const pl = placeholder === true ?  DEFAULT_PLACEHOLDER : placeholder;
      // plot 默认是400px高度
      return <ErrorBoundary errorContent={errorContent}>
        <div style={{ width: props.width || '100%',  height: props.height || 400, textAlign: 'center' }}>
          {pl}
        </div>
      </ErrorBoundary>;
    }
    const titleCfg = visibleHelper(title);
    const descriptionCfg = visibleHelper(description);

    if (titleCfg.visible) {
      // 兼容1.0 plot title的高度
      realCfg.height -= TITLE_HEIGHT;
    }

    if (descriptionCfg.visible) {
      // 兼容1.0 plot description的高度
      realCfg.height -= DESCRIPTION_HEIGHT;
    }

    return <ErrorBoundary errorContent={errorContent}>
      <div>
        {/* title 不一定有 */}
        { titleCfg.visible && <div {...polyfillTitleEvent(realCfg)} className="bizcharts-plot-title" style={TITLE_STYLE}>{titleCfg.text}</div> }
        {/* description 不一定有 */}
        { descriptionCfg.visible && <div {...polyfillDescriptionEvent(realCfg)} className="bizcharts-plot-description" style={DESCRIPTION_STYLE}>{descriptionCfg.text}</div> }
        <BxPlot
          // API 统一
          appendPadding={[10, 5, 10, 10]}
          forceFit={autoFit}
          ref={ref}
          {...realCfg}
          PlotClass={Plot}
        />
      </div>
    </ErrorBoundary>
  });
  Com.displayName = name || Plot.name;
  return Com;
}

export default createPlot;
