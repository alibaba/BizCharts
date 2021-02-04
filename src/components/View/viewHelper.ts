
import _isArray from '@antv/util/lib/is-array';
import _deepMix from '@antv/util/lib/deep-mix';
import _each from '@antv/util/lib/each';
import G2View from '@antv/g2/lib/chart/view';
import G2Chart from '@antv/g2/lib/chart/chart';
import warn from 'warning';
import shallowEqual from '../../utils/shallowEqual';


export default class ViewHelper {
  public config: Record<string, any> = {};
  public view: G2View;
  public readonly isRootView = false;
  public chart: G2Chart;
  constructor(chart) {
    this.chart = chart;
  }
  creatViewInstance(options) {
    this.view = this.chart.createView(this.processOptions(options));
    // @ts-ignore
    this.view.rootChart = this.chart;
  }
  getView() {
    return this.view;
  }
  update(newConfig) {
    // 不需要重建实例
    const { data: preData} = this.config;

    const { scale, animate, filter, visible } = newConfig;
    let { data = [] } = newConfig;
    if (data.rows) {
      warn(!data.rows, 'bizcharts@4不支持 dataset数据格式，请使用data={dv.rows}');
      data = data.rows;
    }
    if (!this.view || _isArray(preData) && preData.length === 0) {
      // hack g2 数据切换的问题
      this.destroy();
      this.creatViewInstance(newConfig);
    }
    // 数据
    if(_isArray(preData)) {
      this.view.changeData(data);
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
        this.view.changeData(data);
      }
    } else {
      this.view.data(data);
    }

    // 比例尺
    this.view.scale(scale);

    // animate
    this.view.animate(animate);
    
    // filter
    _each(this.config.filter, (it, index) => {
      // 销毁
      if (_isArray(it)) {
        this.view.filter(it[0], null);
      } else {
        this.view.filter(index, null);
      }
    });
    _each(filter, (it, index) => {
      if (_isArray(it)) {
        this.view.filter(it[0], it[1]);
      } else {
        this.view.filter(index, it);
      }
    })

    // visible 
    if (visible) {
      this.view.show();
    } else {
      this.view.hide();
    }

    this.config = { ...newConfig, data };
  }
  destroy() {
    if (this.view) {
      this.view.destroy();
      this.view = null;
    }
    this.config = {};
  }
  processOptions(options) {
    const { region, start, end, ...other } = options;
    warn(!start, 'start 属性将在5.0后废弃，请使用 region={{ start: {x:0,y:0}}} 替代');
    warn(!end, 'end 属性将在5.0后废弃，请使用 region={{ end: {x:0,y:0}}} 替代');

    const regionCfg = _deepMix(
      { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
      { start, end },
      region,
    );
    return { ...other, region: regionCfg }
  }
}
