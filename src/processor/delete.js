// import warning from 'warning';
// import { Util } from '../shared';
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
  GuideLine: 'deleteTypedGuide',
  GuideImage: 'deleteTypedGuide',
  GuideText: 'deleteTypedGuide',
  GuideRegion: 'deleteTypedGuide',
  GuideHtml: 'deleteTypedGuide',
  GuideArc: 'deleteTypedGuide',
  Facet: 'deleteFacet',
};

const iDelete = {
  deleteAxis(chart, config, id) {
    const axisConfig = config.axises[id];
    chart.axis(axisConfig.name, false);
    delete config.axises[id];
  },

  deleteTooltip(chart, config) {
    chart.tooltip(false);
    delete config.tooltip;
  },

  deleteCoord(chart, config) {
    chart.coord('rect', {});
    delete config.coord;
  },

  deleteLegend(chart, config, id) {
    const legendConfig = config.legends[id];
    chart.legend(...(legendConfig.name ? [legendConfig.name, false] : [false]));
    delete config.legends[id];
  },

  deleteGuide(chart, config) {
    delete config.guide;
    chart.guide().clear();
  },

  deleteTypedGuide(chart, config, id) {
    delete config.guide.elements[id];
  },

  deleteView(chart, config, id) {
    chart.removeView(config.views[id].g2Instance);
  },

  synchronizeG2Delete(chart, config, deleteInfos, elementInfos) {
    Object.keys(deleteInfos).forEach((id) => {
      const funName = deleteFuncMap[elementInfos[id].name];
      if (funName) {
        this[funName](chart, config, id);
      }
    });
  },
};

export default iDelete;
