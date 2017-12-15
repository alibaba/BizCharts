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

const deleteFuncMap = {
  Chart: 'deleteChart',
  Coord: 'deleteCoord',
  Geom: 'deleteGeom',
  Axis: 'deleteAxis',
  Tooltip: 'deleteTooltip',
  Legend: 'deleteLegend',
  Label: 'deleteLabel',
  View: 'deleteView',
  Guide: 'deleteGuide',
  GuideLine: 'deleteGuideLine',
  GuideImage: 'deleteGuideImage',
  GuideText: 'deleteGuideText',
  GuideRegion: 'deleteGuideRegion',
  GuideHtml: 'deleteGuideHtml',
  GuideArc: 'deleteGuideArc',
  Facet: 'deleteFacet',
};

export default class Processor extends iAdd() {
  constructor(props) {
    super(props);
    this.config = null;
    this.addConfig = {};
    this.updateConfig = {};
    this.idToName = {};
    this.added = false;
    this.updated = false;
    this.deleted = false;
    this.rebuild = false;
  }

  addElement(name, id, props, parentInfo, viewId) {
    console.log('add element', name);
    this.added = true;
    this.config = this.addConfig;
    this.idToName[id] = name;
    if (parentInfo) {
      this.idToName[parentInfo.id] = parentInfo.name;
    }

    this[addFuncMap[name]](props, id, viewId, parentInfo);
  }

  updateElement(name, id, props, parentInfo, viewId) {
    console.log('update element', name, props);
    this.updated = true;
    this.config = this.updateConfig;
    this[addFuncMap[name]](props, id, viewId, parentInfo);
  }

  deleteElement(name, id) {
    console.log('delete element', name);
    this.deleted = true;
    if (iDelete[deleteFuncMap[name]] == null) return;
    if (iDelete[deleteFuncMap[name]](this.chart, this.addConfig, id)) {
      this.rebuild = true;
    }
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
    g2Creator.guide(chart, this.config);
    g2Creator.facet(chart, this.config);

    chart.render();

    this.chart = chart;
    return chart;
  }

  rebuildChart() {
    this.chart.clear();
    iMerge.merge(this.addConfig, this.updateConfig, true);
    g2Creator.addUpdate(this.chart, this.addConfig);
    this.chart.repaint();
    this.added = false;
    this.deleted = false;
    this.updated = false;
    this.updateConfig = {};
    this.rebuild = false;

    return this.chart;
  }

  destory() {
    this.chart.destroy();
  }

  batchedUpdate() {
    if (this.rebuild) {
      return this.rebuildChart();
    }
    if (this.added) {
      g2Creator.addUpdate(this.chart, this.addConfig);
    }
    if (this.updated) {
      iUpdate.update(this.chart, this.addConfig, this.updateConfig);
    }
    if (this.deleted || this.updated) {
      this.chart.repaint();
    }
    this.added = false;
    this.deleted = false;
    this.updated = false;
    this.updateConfig = {};

    return this.chart;
  }
}
