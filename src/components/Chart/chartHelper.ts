import uniqueId from '@antv/util/lib/unique-id';
import _each from '@antv/util/lib/each';
import _isFunction from '@antv/util/lib/is-function';
import _isArray from '@antv/util/lib/is-array';
import _isEqual from '@antv/util/lib/is-equal';
import { Chart as G2Chart } from '../../core';
import warn from 'warning';
import shallowEqual from '../../utils/shallowEqual';
import pickWithout from '../../utils/pickWithout';
import cloneDeep from '../../utils/cloneDeep';
import { REACT_PIVATE_PROPS } from '../../utils/constant';
import { VIEW_LIFE_CIRCLE } from '@antv/g2/lib/constant';
import EventEmitter from '@antv/event-emitter';

import { IEvent } from '../../interface';
import { pickEventName } from './events';


const processData = (data) => {
  if (data && data.rows) {
    return data.rows;
  }
  return data;
}

class ChartHelper extends EventEmitter {
  public chart: G2Chart;
  public config: Record<string, any> = {};
  private isNewInstance: boolean;
  public extendGroup: any;
  public key: string;
  
  createInstance(config) {
    this.chart = new G2Chart({ ...config });
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
    // this.chart.render();
    // if (this.isNewInstance) {
    //   this.onGetG2Instance();
    //   // @ts-ignore
    //   this.chart.unbindAutoFit(); // 不使用g2的监听
    //   this.isNewInstance = false;
    // }
    // // 处理elements状态
    // this.chart.emit('processElemens');
    try {
      // 普通error 只能兜住react render周期里的error。 chart render周期的error 要单独处理
      this.chart.render();
      if (this.isNewInstance) {
        this.onGetG2Instance();
        // @ts-ignore
        this.chart.unbindAutoFit(); // 不使用g2的监听
        this.isNewInstance = false;
      }
      // 处理elements状态
      this.chart.emit('processElemens');

    } catch(e) {
      this.emit('renderError', e);
      this.destory();
      if(console) {
        console.error(e?.stack)
      }
    }
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
      && preData.length === 0
      && _isArray(data)
      && data.length !== 0 ) {
      return true;
    }
    // scale 切换不需要重建实例
    const unCompareProps = [...REACT_PIVATE_PROPS, 'scale', 'width', 'height', 'container', '_container', '_interactions', 'placeholder',  /^on/, /^\_on/];
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

    // 数据 更新
    if(_isArray(preData) && preData.length) {
      // 数据只做2级浅比较
      // fixme: 做4级比较
      let isEqual = true;
      if (newConfig.notCompareData) {
        // 手动关闭对比
        isEqual = false;
      }
      if (preData.length !== data.length) {
        // 长度不相等
        isEqual = false;
      } else {
        preData.forEach((element, index) => {
          if (!shallowEqual(element, data[index])) {
            isEqual = false;
          }
        });
      }
      if (!isEqual) {
        // @ts-ignore
        this.chart.isDataChanged = true;
        this.chart.emit(VIEW_LIFE_CIRCLE.BEFORE_CHANGE_DATA);
        // 1. 保存数据
        this.chart.data(data);
        // 2. 最后再渲染
        // 3. 遍历子 view 进行 change data
        const views = this.chart.views;
        for (let i = 0, len = views.length; i < len; i++) {
          const view = views[i];
          // 子 view 有自己的数据, 会在执行view的配置时会覆盖
          view.changeData(data);
        }
        this.chart.emit(VIEW_LIFE_CIRCLE.AFTER_CHANGE_DATA);
      }
    } else {
      this.chart.data(data);
    }

    // 比例尺
    this.chart.scale(options.scale);

    // 动画
    if (options.animate === false) {
      this.chart.animate(false);
    } else {
      this.chart.animate(true);
    }

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

    if (options.forceFit) {
      warn(false, 'forceFit 已废弃，请使用`autoFit`替代');
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
    chart.destroy();
    chart = null;
    this.chart = null;
    this.config = {};
  }
}

export default ChartHelper;
