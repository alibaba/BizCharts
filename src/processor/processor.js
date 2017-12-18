import iAdd from './add';
import iUpdate from './update';
import iDelete from './delete';
import iMerge from './merge';
import g2Creator from './g2Creator';

const addFuncMap = {
  Chart: 'addChart',
  Coord: 'addCoord',
  Geom: 'addGeom',
  Axis: 'addAxis',
  Tooltip: 'addTooltip',
  Legend: 'addLegend',
  Label: 'addLabel',
  View: 'addView',
  Guide: 'addGuide',
  GuideLine: 'addGuideLine',
  GuideImage: 'addGuideImage',
  GuideText: 'addGuideText',
  GuideRegion: 'addGuideRegion',
  GuideHtml: 'addGuideHtml',
  GuideArc: 'addGuideArc',
  Facet: 'addFacet',
};

const deleteRebuildElements = {
  Geom: true,
  Label: true,
};

export default class Processor extends iAdd() {
  constructor(props) {
    super(props);
    this.config = null;
    this.addConfig = {};
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
    this.config = this.addConfig;
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

    this[addFuncMap[name]](props, id, viewId, parentInfo);
  }

  updateElement(name, id, props, parentInfo, viewId) {
    this.updated = true;
    this.config = this.updateConfig;
    this[addFuncMap[name]](props, id, viewId, parentInfo);
  }

  deleteElement(name, id) {
    if (!this.chart) return;

    this.deleteInfos[id] = id;
  }

  createG2Instance() {
    this.config = this.addConfig;
    const chart = g2Creator.chart(this.config);
    g2Creator.coord(chart, this.config);
    g2Creator.axises(chart, this.config);
    g2Creator.legends(chart, this.config);
    g2Creator.tooltip(chart, this.config);
    g2Creator.geoms(chart, this.config);
    g2Creator.views(chart, this.config);
    g2Creator.guide(chart, this.config.guide);
    g2Creator.facet(chart, this.config);

    chart.render();

    this.chart = chart;
    this.initedG2 = true;
    return chart;
  }

  reExecuteChart() {
    this.chart.clear();
    iMerge.merge(this.addConfig, this.updateConfig, true);
    g2Creator.addUpdate(this.chart, this.addConfig);
    this.chart.repaint();
    this.added = false;
    this.updated = false;
    this.updateConfig = {};

    return this.chart;
  }

  destory() {
    this.chart.destroy();
    this.chart = null;
  }

  needReExecute() {
    const elementInfos = this.elementInfos;
    return Object.keys(this.deleteInfos).find((id) => {
      return deleteRebuildElements[elementInfos[id].name] && !elementInfos[id].viewId;
    });
  }

  batchedUpdate() {
    if (this.chart == null) return null;
    if (this.needReExecute()) {
      this.reExecuteChart();
      return this.chart;
    }

    iDelete.synchronizeG2Delete(this.chart, this.addConfig, this.deleteInfos, this.elementInfos);

    if (this.added) {
      g2Creator.synchronizeG2Add(this.chart, this.addConfig);
    }
    if (this.updated) {
      iUpdate.synchronizeG2Update(this.chart, this.addConfig, this.updateConfig);
    }
    if (this.added || this.updated) {
      this.chart.repaint();
    }
    iMerge.merge(this.addConfig, this.updateConfig, false);
    this.added = false;
    this.updated = false;
    this.updateConfig = {};

    return this.chart;
  }
}
