import configAdd from './configAdd';
import configMerge from './configMerge';
import g2Update from './g2Update';
import g2Delete from './g2Delete';
import g2Creator from './g2Creator';
import { Util } from '../shared';

export default class Processor {
  constructor() {
    this.config = {};
    this.elementInfos = {};
    this.added = false;
    this.initedG2 = false;
    this.updated = false;
    this.deleted = false;
    this.deleteInfos = {};
  }

  calUpdateFlag(name, id) {
    /* eslint-disable  no-unused-vars */
    const { children, ...props } = this.elementInfos[id].props;
    const { children: nextChildren, ...nextProps } = this.elementInfos[id].updateProps;
    /* eslint-enable */
    if (name === 'Chart') {
      const { data, ...otherProps } = props;
      const { data: nextData, ...nextOtherProps } = nextProps;
      if (data !== nextData || !Util.isEqual(otherProps, nextOtherProps)) {
        this.updated = true;
      }
    } else {
      if (!Util.isEqual(props, nextProps)) {
        this.updated = true;
      }
    }
  }

  addElement(name, id, props, parentInfo, viewId) {
    if (!this.chart && this.initedG2) return;
    this.added = true;
    this.elementInfos[id] = {
      id,
      viewId,
      parentInfo,
      name,
      props: { ...props },
    };
    if (parentInfo && !this.elementInfos[parentInfo.id]) {
      this.elementInfos[parentInfo.id] = {
        id: parentInfo.id,
        name: parentInfo.name,
      };
    }

    configAdd.addElement(name, this.config, this.elementInfos[id]);
  }

  updateElement(name, id, props) {
    this.elementInfos[id].updateProps = { ...props };
    this.calUpdateFlag(name, id);
  }

  deleteElement(name, id) {
    if (!this.chart) return;

    this.deleteInfos[id] = id;
    this.deleted = true;
  }

  createG2Instance() {
    const config = this.config;
    const chart = g2Creator.createChart(config, this.elementInfos);
    g2Creator.executeChartConfig(chart, config, this.elementInfos);
    g2Creator.synchronizeG2Add(chart, config, this.elementInfos);

    chart.render();

    this.chart = chart;
    this.initedG2 = true;
    this.resetStates();
    return chart;
  }

  destory() {
    this.chart.destroy();
    this.chart = null;
  }

  resetStates() {
    const elems = this.elementInfos;
    for (const id in elems) {
      if (elems[id].updateProps) delete elems[id].updateProps;
      if (this.deleteInfos[id]) {
        delete elems[id];
      }
    }
    this.added = false;
    this.updated = false;
    this.deleteInfos = {};
  }

  reExecuteChart() {
    this.chart.clear();
    configMerge.merge(this.config, this.deleteInfos, this.elementInfos, true);
    g2Creator.executeChartConfig(this.chart, this.config, this.elementInfos);
    g2Creator.synchronizeG2Add(this.chart, this.config, this.elementInfos);
    this.chart.repaint();
    this.resetStates();
    return this.chart;
  }

  batchedUpdate() {
    if (this.chart == null) return null;
    if (g2Update.needRebuildChart(this.config)) {
      configMerge.merge(this.config, this.deleteInfos, this.elementInfos, true);
      this.chart.destroy();
      this.chart = 'destroy';
      return this.createG2Instance();
    }
    if (g2Delete.needReExecute(this.deleteInfos, this.elementInfos)
      || g2Update.needReExecute(this.config)
    ) {
      this.reExecuteChart();
      return this.chart;
    }

    if (this.deleted) {
      g2Delete.synchronizeG2Delete(this.chart, this.config, this.deleteInfos, this.elementInfos);
      configMerge.mergeDelete(this.config, this.deleteInfos, this.elementInfos);
    }

    if (this.added) {
      g2Creator.synchronizeG2Add(this.chart, this.config);
    }
    if (this.updated) {
      g2Update.synchronizeG2Update(this.chart, this.config);
    }
    if (this.added || this.deleted || this.updated) {
      this.chart.repaint();
    }

    configMerge.mergeUpdate(this.config, false);
    this.resetStates();

    return this.chart;
  }
}
