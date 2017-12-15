// import warning from 'warning';
// import { Util } from '../shared';

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

  deleteGeom() {
    return true;
  },

  deleteLabel() {
    return true;
  },
};

export default iDelete;
