import React from 'react';
import uniqueId from '@antv/util/lib/unique-id';
import _debounce from '@antv/util/lib/debounce';
import _isFunction from '@antv/util/lib/is-function';
import _isArray from '@antv/util/lib/is-array';
import { getChartSize } from '@antv/g2/lib/util/dom';
import ResizeObserver from 'resize-observer-polyfill';
import ErrorBoundary from '../../boundary/ErrorBoundary';
import withContainer from '../../boundary/withContainer';
import { Chart as _Chart } from '../../core';
import RootChartContext from '../../context/root';
import warn from '../../utils/warning';

import { IChart, IEvent } from '../../interface';

import {
  BASE_EVENT_NAMES,
  DRAG_EVENT_NAMES,
  MOBILE_EVENT_NAMES,
  LIFE_CIRCLE_NAMES,
  AXIS_EVENT_TARGET,
  LEGEND_EVENT_TARGETS,
  ANNOTATION_EVENT_TARGET,
  LEGEND_EVENT,
  TOOLTIP_EVENT,
} from './events';

import { GenericView } from '../View';

function toHump(name) {
  return name
    //@ts-ignore
    .replace(/\:/g, '-')
    //@ts-ignore
    .replace(/\-(\w)/g, function(all, letter) {
      return letter.toUpperCase();
    })
    .replace(/^\S/, s => s.toUpperCase());
}

class Chart extends GenericView<IChart> {
  protected resizeObserver: ResizeObserver;
  constructor(props) {
    super(props);
    // 监听容器发生resize
    this.resizeObserver = new ResizeObserver(this.resize);
    this.resizeObserver.observe(props.container);
  }
  resize = _debounce(() => {
    if (this.props.autoFit && this.g2Instance) {
      const { width, height } = getChartSize(
        this.props.container,
        this.props.autoFit,
        this.g2Instance.width,
        this.g2Instance.height
      );
      this.g2Instance.changeSize(width, height);
    }
  }, 300);
  static defaultProps = {
    placeholder: false,
    visible: true,
  };
  ChartBaseClass: any = _Chart;
  isNewInstance: boolean = true;
  initInstance() {
    this.id = uniqueId(this.name);
    const options = this.getInitalConfig();
    this.g2Instance = new this.ChartBaseClass(options);
    this.isNewInstance = true;
    this.bindEvents();
    // 去掉g2监听window的resize事件，改成监听容器resize
    this.g2Instance.unbindAutoFit();
  }
  bindEvents() {
    // 画布事件
    [...BASE_EVENT_NAMES, ...DRAG_EVENT_NAMES, ...MOBILE_EVENT_NAMES, ...LIFE_CIRCLE_NAMES].forEach(
      eName => {
        const propsEventName = `on${toHump(eName)}`;
        this.g2Instance.on(eName, (args: IEvent) => {
          if (_isFunction(this.props[propsEventName])) {
            if (args) {
              this.props[propsEventName](args, this.g2Instance);
            } else {
              // 生命周期是没有 args
              this.props[propsEventName](this.g2Instance);
            }
          }
        });
      },
    );
    // 组件事件
    [...BASE_EVENT_NAMES, ...DRAG_EVENT_NAMES, ...MOBILE_EVENT_NAMES].forEach(eName => {
      [...AXIS_EVENT_TARGET, ...LEGEND_EVENT_TARGETS, ...ANNOTATION_EVENT_TARGET].forEach(
        target => {
          const propsEventName = `on${toHump(target)}${toHump(eName)}`;
          this.g2Instance.on(`${target}:${eName}`, (args: IEvent) => {
            if (_isFunction(this.props[propsEventName])) {
              this.props[propsEventName](args, this.g2Instance);
            }
          });
        },
      );
    });
    // 组件特殊事件
    [...LEGEND_EVENT, ...TOOLTIP_EVENT].forEach(eName => {
      const propsEventName = `on${toHump(eName)}`;
      this.g2Instance.on(eName, (args: IEvent) => {
        if (_isFunction(this.props[propsEventName])) {
          this.props[propsEventName](args, this.g2Instance);
        }
      });
    });
  }
  getInitalConfig() {
    const config = { ...this.props };
    if (config.forceFit !== undefined) {
      warn(false, 'forceFit 将会在4.1后不再支持，请使用`autoFit`替代');
      config.autoFit = config.forceFit;
    }

    return config;
  }

  componentDidMount() {
    if (!this.g2Instance) {
      return;
    }
    super.componentDidMount();
    if (this.g2Instance) {
      this.g2Instance.render();
      this.onGetG2Instance();
    }
  }

  componentDidUpdate(perProps) {
    if (!this.g2Instance) {
      return;
    }
    // 执行view共同的属性配置更新
    super.configInstance(perProps, this.props);

    // 更新图表大小
    const { width, height, autoFit } = this.props;
    // 自适应就不更新大小了
    if (!autoFit) {
      if (
        (width >= 0 && width !== this.g2Instance.width) ||
        (height >= 0 && height !== this.g2Instance.height)
      ) {
        const nextWidth = width ? width : this.g2Instance.width;
        const nextHeight = height ? height : this.g2Instance.height;
        // changeSize方法内部有调用render
        this.g2Instance.changeSize(nextWidth, nextHeight);
      }
    }
    this.g2Instance.render(true);
    this.onGetG2Instance();
  }

  onGetG2Instance() {
    // 当且仅当更新实例后执行
    if (_isFunction(this.props.onGetG2Instance) && this.isNewInstance) {
      this.props.onGetG2Instance(this.g2Instance);
    }
    this.isNewInstance = false;
  }

  componentWillUnmount() {
    this.destroy();
  }

  destroy() {
    if (this.g2Instance) {
      this.g2Instance.destroy();
      this.g2Instance = null;
    }
  }

  handleEmptyData() {
    // 如果上一个实例数据为空则直接销毁重建，以免影响动画
    const { data } = this.props;
    if (this.g2Instance
      && this.g2Instance.getData()
      && this.g2Instance.getData().length === 0
      && _isArray(data)
      && data.length !== 0 ) {
      this.destroy();
    }
  }

  checkInstanceReady() {
    this.handleEmptyData();
    super.checkInstanceReady();
    if (this.props.pure) {
      // 纯画布 关闭
      this.g2Instance.axis(false);
      this.g2Instance.tooltip(false);
      this.g2Instance.legend(false);
    } else {
      // 默认开启
      this.g2Instance.tooltip({ showMarkers: false });
      this.g2Instance.axis(true);
      this.g2Instance.legend(true);
    }
  }

  render() {
    const { placeholder, data } = this.props;
    if ((data === undefined || data.length === 0) && placeholder) {
      this.destroy();
      const pl = placeholder === true ? <div style={{ position: 'relative', top: '48%', color: '#aaa', textAlign: 'center' }}>暂无数据</div> : placeholder;
      return <ErrorBoundary>{pl}</ErrorBoundary>;
    }

    this.checkInstanceReady();
    return (
      <ErrorBoundary key={this.id}>
        <RootChartContext.Provider value={{ chart: this.g2Instance }}>
          {super.render(true)}
        </RootChartContext.Provider>
      </ErrorBoundary>
    );
  }
}

export default withContainer<IChart>(Chart);
