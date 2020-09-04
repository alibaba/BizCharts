import uniqueId from '@antv/util/lib/unique-id';
import _each from '@antv/util/lib/each';
import _isFunction from '@antv/util/lib/is-function';
import _isArray from '@antv/util/lib/is-array';
import _isEqual from '@antv/util/lib/is-equal';
import HTMLComponent from '@antv/component/lib/abstract/html-component';
import { Chart as G2Chart } from '../../core';
import warn from '../../utils/warning';
import shallowEqual from '../../utils/shallowEqual';
import pickWithout from '../../utils/pickWithout';
import cloneDeep from '../../utils/cloneDeep';
import { REACT_PIVATE_PROPS } from '../../utils/constant';

import { IEvent } from '../../interface';
import { pickEventName } from './events';

// @ts-ignore
HTMLComponent.prototype.removeDom = () => {
  const container = this.get('container');
  if (container && container.parentNode) {
    container.parentNode.removeChild(container);
  }
}


const processData = (data) => {
  if (data && data.rows) {
    return data.rows;
  }
  return data;
}

class ChartHelper {
  public chart: G2Chart;
  public config: Record<string, any> = {};
  private isNewInstance: boolean;
  public extendGroup: any;
  public key: string;
  
  createInstance(config) {
    this.chart = new G2Chart(config);
    this.key = uniqueId('bx-chart');
    this.chart.emit('initialed');
    this.isNewInstance = true; // 更新了实例的标记
    this.extendGroup = {
      isChartCanvas: true,
      chart: this.chart,
    };
  }
  render() {
    if (!this.chart) {
      return;
    }
    if (this.isNewInstance) {
      this.chart.render();
      this.onGetG2Instance();
      // @ts-ignore
      this.chart.unbindAutoFit(); // 不使用g2的监听
      this.isNewInstance = false;
    } else {
      this.chart.render(true);
    }
    // 处理elements状态
    this.chart.emit('processElemens');
  }
  private onGetG2Instance() {
    // 当且仅当 isNewInstance 的时候执行。
    if (_isFunction(this.config.onGetG2Instance)) {
      this.config.onGetG2Instance(this.chart);
    }
  }
  shouldReCreateInstance(newConfig) {
    // 如果上一个实例数据为空则直接销毁重建，以免影响动画
    if (!this.chart || newConfig.forceUpdate) {
      return true;
    }
    const { data:preData, ...preOptions} = this.config;
    const { data, ...options } = newConfig;
    if (_isArray(this.config.data)
      && this.config.data.length === 0
      && _isArray(data)
      && data.length !== 0 ) {
      return true;
    }
    const unCompareProps = [...REACT_PIVATE_PROPS, 'width', 'height', 'container', '_container', '_interactions', 'placeholder',  /^on/, /^\_on/];
    if (!_isEqual(pickWithout(preOptions, [...unCompareProps]),
      pickWithout(options, [...unCompareProps]))) {
      return true;
    }
    return false;
  }
  update(props) {
    const newConfig = cloneDeep(this.adapterOptions(props));
    if (this.shouldReCreateInstance(newConfig)) {
      this.destory();
      this.createInstance(newConfig);
    }
    // 重置
    if (newConfig.pure) {
      // 纯画布 关闭
      this.chart.axis(false);
      this.chart.tooltip(false);
      this.chart.legend(false);
    }

    // 事件
    const events = pickEventName(this.config);
    const newEvents = pickEventName(newConfig);

    // 配置
    const { data, interactions, ...options } = newConfig;

    const { data: preData, interactions: preInteractions = [] } = this.config;
    if (!this.isNewInstance) {
      // 取消事件绑定
      events.forEach(ev => {
        this.chart.off(ev[1], this.config[`_${ev[0]}`])
      });
    }

    /** 更新 */
    // 绑定事件
    newEvents.forEach(evName => {
      newConfig[`_${evName[0]}`] = (ev: IEvent) => {
        // 输入chart实例方便用户使用
        newConfig[evName[0]](ev, this.chart);
      }
      this.chart.on(evName[1], newConfig[`_${evName[0]}`])
    });

    // 数据
    if(_isArray(preData) && preData.length) {
      // 数据只做2级浅比较
      let isEqual = true;
      if (preData.length !== data.length) {
        isEqual = false;
      } else {
        preData.forEach((element, index) => {
          if (!shallowEqual(element, data[index])) {
            isEqual = false;
          }
        });
      }
      if (!isEqual) {
        this.chart.changeData(data);
      }
    } else {
      this.chart.data(data);
    }

    // 比例尺
    this.chart.scale(options.scale);

    // 交互 interactions
    preInteractions.forEach(interact => {
      // 这里不做对比，无意义，都是要销毁重建，不如直接全量销毁
      this.chart.removeInteraction(interact);
    });
    interactions.forEach(interact => {
      this.chart.interaction(interact);
    });

    // filter
    _each(this.config.filter, (it, index) => {
      // 销毁
      if (_isArray(it)) {
        this.chart.filter(it[0], null);
      } else {
        this.chart.filter(index, null);
      }
    });
    _each(newConfig.filter, (it, index) => {
      if (_isArray(it)) {
        this.chart.filter(it[0], it[1]);
      } else {
        this.chart.filter(index, it);
      }
    })

    // 主题
    this.chart.theme(newConfig.theme);

    // 缓存处理后的配置
    this.config = newConfig;

  }
  adapterOptions({data, ...others}) {
    // 剔除 React 自身的属性
    const options = pickWithout(others, [...REACT_PIVATE_PROPS]);
    // 适配
    const { forceFit } = options;
    if (forceFit) {
      options.autoFit = forceFit;
      warn(false, 'forceFit 将会在4.1后不再支持，请使用`autoFit`替代');
    }
    options.data = processData(data) || [];
    return options;
  }
  destory() {
    if (!this.chart) {
      return;
    }
    this.extendGroup = null;
    let { chart } = this;
    chart.hide();
    setTimeout(() => {
      // 大坑勿改: 这样做是为了等react 先卸载，再销毁图表实例。
      chart.destroy();
      chart = null;
    }, 0)
    this.chart = null;
    this.config = {};
  }
}

export default ChartHelper;
