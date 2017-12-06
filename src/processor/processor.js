import iAdd from './add';
import { Prop } from '../shared';
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


export default class Processor extends iAdd() {
  constructor(props) {
    super(props);
    this.config = {};
    this.idToName = {};
  }

  addElement(name, id, config, parentInfo, viewId) {
    this.idToName[id] = name;
    if (parentInfo) {
      this.idToName[parentInfo.id] = parentInfo.name;
    }

    return this[addFuncMap[name]](config, id, viewId, parentInfo);
  }

  updateElement(id, config) {

  }

  deleteElement(id) {

  }

  createG2Instance() {
    const chart = g2Creator.chart(this.config);
    g2Creator.coord(chart, this.config);
    g2Creator.facet(chart, this.config);
    g2Creator.tooltip(chart, this.config);
    g2Creator.legends(chart, this.config);
    g2Creator.geoms(chart, this.config);
    g2Creator.axises(chart, this.config);
    g2Creator.views(chart, this.config);
    g2Creator.guide(chart, this.config);

    chart.render();

    this.chart = chart;
    return chart;
  }

  destory() {
    this.chart.destroy();
  }

  batchedUpdate() {

  }
}
