import configAdd from './configAdd';
import configMerge from './configMerge';
import g2Update from './g2Update';
import g2Delete from './g2Delete';
import g2Creator from './g2Creator';

export default class Processor {
  constructor() {
    this.config = {};
    this.updateConfig = {};
    this.elementInfos = {};
    this.idToName = {};
    this.added = false;
    this.initedG2 = false;
    this.updated = false;
    this.deleteInfos = {};
  }

  addElement(name, id, props, parentInfo, viewId) {
    if (!this.chart && this.initedG2) return;
    this.added = true;
    this.elementInfos[id] = {
      id,
      viewId,
      parentInfo,
      name,
    };
    if (parentInfo) {
      this.elementInfos[parentInfo.id] = {
        id: parentInfo.id,
        name: parentInfo.name,
      };
    }

    configAdd.addElement(name, this.config, props, id, viewId, parentInfo);
  }

  updateElement(name, id, props, parentInfo, viewId) {
    this.updated = true;
    configAdd.addElement(name, this.updateConfig, props, id, viewId, parentInfo);
  }

  deleteElement(name, id) {
    if (!this.chart) return;

    this.deleteInfos[id] = id;
  }

  createG2Instance() {
    const config = this.config;
    const chart = g2Creator.chart(config);
    g2Creator.synchronizeG2Add(chart, config);

    chart.render();

    this.chart = chart;
    this.initedG2 = true;
    return chart;
  }

  destory() {
    this.chart.destroy();
    this.chart = null;
  }

  resetStates() {
    this.added = false;
    this.updated = false;
    this.updateConfig = {};
    this.deleteInfos = {};
  }

  reExecuteChart() {
    this.chart.clear();
    configMerge.merge(this.config, this.updateConfig, this.deleteInfos, this.elementInfos, true);
    g2Update.updateChart(this.chart, this.config.chart, this.updateConfig.chart);
    g2Creator.synchronizeG2Add(this.chart, this.config);
    this.chart.repaint();
    this.resetStates();
    return this.chart;
  }

  batchedUpdate() {
    if (this.chart == null) return null;
    if (g2Update.needRebuildChart(this.config, this.updateConfig)) {
      configMerge.merge(this.config, this.updateConfig, this.deleteInfos, this.elementInfos, true);
      this.chart.destroy();
      this.chart = 'destroy';

      return this.createG2Instance();
    }
    if (g2Delete.needReExecute(this.deleteInfos, this.elementInfos)) {
      this.reExecuteChart();
      return this.chart;
    }

    g2Delete.synchronizeG2Delete(this.chart, this.config, this.deleteInfos, this.elementInfos);
    configMerge.mergeDelete(this.config, this.deleteInfos, this.elementInfos);

    if (this.added) {
      g2Creator.synchronizeG2Add(this.chart, this.config);
    }
    if (this.updated) {
      g2Update.synchronizeG2Update(this.chart, this.config, this.updateConfig);
    }
    if (this.added || this.updated) {
      this.chart.repaint();
    }

    configMerge.mergeUpdate(this.config, this.updateConfig, false);
    this.resetStates();

    return this.chart;
  }
}
