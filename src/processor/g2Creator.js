import G2 from '@antv/g2';
import { Prop, Util } from '../shared';
import common from './common';
import EventUtil from './event';

const COORD_FUNC_PROPS = common.COORD_FUNC_PROPS;
const GEOM_FUNC_PROPS = common.GEOM_FUNC_PROPS;

export default {
  createChart(config) {
    const chartConfig = config.chart;
    const chart = new G2.Chart(chartConfig);
    this.executeChartConfig(chart, config);
    chartConfig.g2Instance = chart;
    return chart;
  },

  executeChartConfig(chart, config) {
    const chartConfig = config.chart;
    chart.coord('rect', {});
    chart.source(chartConfig.data, chartConfig.scale);
    if (!config.Facet || !chartConfig.axis) {
      chart.axis(false);
    }
    chart.legend(false);
    chart.tooltip(false);
    if (chartConfig.filter) {
    }
    EventUtil.bindEvents(chart, EventUtil.chartEvents, config.chart);
    EventUtil.bindBaseEvents(chart, config.chart);
  },

  coord(chart, config) {
    const coordConfig = config.coord;

    if (!coordConfig || coordConfig.g2Instance) { return; }

    const { type, ...others } = config.coord;
    const coordIns = chart.coord(
      type || 'rect',
      Util.without(others, COORD_FUNC_PROPS)
    );
    Prop.init(COORD_FUNC_PROPS, others, (value, key) => {
      coordIns[key](...value);
    });
    coordConfig.g2Instance = coordIns;
  },

  createLabel(geom, labelConfig) {
    if (!labelConfig || labelConfig.g2Instance) { return; }
    const { content, ...labelOthers } = labelConfig;

    if (content) {
      if (Util.isArray(content)) {
        labelConfig.g2Instance = geom.label(content[0], content[1], labelOthers);
      } else {
        labelConfig.g2Instance = geom.label(content, labelOthers);
      }
    }
  },

  createGeom(chart, geomConfig) {
    if (geomConfig.g2Instance) {
      if (geomConfig.label) {
        this.createLabel(geomConfig.g2Instance, geomConfig.label);
      }
      return;
    }

    const geom = chart[geomConfig.type]();

    if (geomConfig.adjust) {
      geom.adjust(geomConfig.adjust);
    }

    Prop.init(GEOM_FUNC_PROPS, geomConfig, (value, key) => {
      geom[key](...value);
    });

    geomConfig.g2Instance = geom;

    // create label
    this.createLabel(geom, geomConfig.label);
  },

  geoms(chart, config) {
    const geoms = config.geoms;

    if (!geoms) { return; }
    for (const id in geoms) {
      if (Object.prototype.hasOwnProperty.call(geoms, id)) {
        this.createGeom(chart, geoms[id]);
      }
    }
  },

  legends(chart, config) {
    const legends = config.legends;

    for (const id in legends) {
      if (Object.prototype.hasOwnProperty.call(legends, id)) {
        const legendConfig = legends[id];
        if (legendConfig.g2Instance) { return; }
        const { name, visible, ...cfg } = legendConfig;
        const arg = !visible ? visible : cfg;
        legendConfig.g2Instance = chart.legend(...(name ? [name, arg] : [arg]));
      }
    }
  },

  tooltip(chart, config) {
    const tooltipConfig = config.tooltip;

    if (!tooltipConfig || tooltipConfig.g2Instance) { return; }
    tooltipConfig.g2Instance = chart.tooltip({ ...tooltipConfig });
  },

  createAxis(chart, axisConfig) {
    if (axisConfig.g2Instance) { return; }
    const { name, visible, ...others } = axisConfig;
    if (visible || !Object.prototype.hasOwnProperty.call(axisConfig, visible)) {
      axisConfig.g2Instance = chart.axis(name, others);
    } else {
      axisConfig.g2Instance = chart.axis(name, false);
    }
  },

  axises(chart, config) {
    const axises = config.axises;

    for (const id in axises) {
      if (Object.prototype.hasOwnProperty.call(axises, id)) {
        this.createAxis(chart, axises[id]);
      }
    }
  },

  views(chart, config) {
    const views = config.views;

    for (const id in views) {
      if (Object.prototype.hasOwnProperty.call(views, id)) {
        this.createView(chart, views[id]);
      }
    }
  },

  createView(chart, viewConfig) {
    if (viewConfig.g2Instance) {
      this.coord(viewConfig.g2Instance, viewConfig);
      this.axises(viewConfig.g2Instance, viewConfig);
      this.geoms(viewConfig.g2Instance, viewConfig);
      this.guide(viewConfig.g2Instance, viewConfig.guide);
      return;
    }
    /*
       Others object must exclude geoms property.
       Because geoms property will cover the g2 view' inner geoms property.
    */
    const { scale, data, instance, axis, geoms, ...others } = viewConfig;
    let view;
    if (instance) {
      view = instance;
    } else {
      view = chart.view({ ...others });
    }

    if (data) {
      view.source(data, scale);
    }

    if (scale) {
      view.scale(scale);
    }

    if (!(axis === true || instance)) {
      view.axis(false);
    }

    viewConfig.g2Instance = view;

    this.coord(view, viewConfig);
    this.axises(view, viewConfig);
    this.geoms(view, viewConfig);
    this.guide(view, viewConfig.guide);
  },

  guide(chart, guide) {
    if (!guide) { return; }

    const guides = guide.elements;

    for (const id in guides) {
      if (Object.prototype.hasOwnProperty.call(guides, id)) {
        const guideConfig = guides[id];
        if (!guideConfig.g2Instance) {
          const { type, ...others } = guideConfig;
          guideConfig.g2Instance = chart.guide()[type](others);
        }
      }
    }
  },

  facet(chart, config) {
    const facetConfig = config.facet;

    if (!facetConfig || facetConfig.g2Instance) { return; }

    const { children, type, ...others } = facetConfig;
    facetConfig.g2Instance = chart.facet(type, others);
  },

  synchronizeG2Add(chart, config) {
    this.coord(chart, config);
    this.axises(chart, config);
    this.legends(chart, config);
    this.tooltip(chart, config);
    this.geoms(chart, config);
    this.views(chart, config);
    // this.synchronizeG2Views(chart, config);
    this.guide(chart, config.guide);
    this.facet(chart, config);
  },

  synchronizeG2Views(chart, config) {
    const views = config.views;

    for (const id in views) {
      if (Object.prototype.hasOwnProperty.call(views, id)) {
        this.synchronizeG2View(views[id].g2Instance, views[id]);
      }
    }
  },

  synchronizeG2View(view, viewConfig) {
    /*
       Others object must exclude geoms property.
       Because geoms property will cover the g2 view' inner geoms property.
    */
    view.clear();
    this.clearViewG2Instance(viewConfig);
    const { scale, data, instance, axis, geoms, ...others } = viewConfig;

    if (data) {
      view.source(data, scale);
    }

    if (scale) {
      view.scale(scale);
    }

    if (!(axis === true || instance)) {
      view.axis(false);
    }
    this.coord(view, viewConfig);
    this.axises(view, viewConfig);
    this.geoms(view, viewConfig);
    this.guide(view, viewConfig.guide);
  },

  clearViewG2Instance(viewConfig) {
    if (viewConfig.coord) {
      delete viewConfig.coord.g2Instance;
    }
    if (viewConfig.axises) {
      Object.keys(viewConfig.axises).forEach((id) => {
        delete viewConfig.axises[id].g2Instance;
      });
    }
    if (viewConfig.geoms) {
      Object.keys(viewConfig.geoms).forEach((id) => {
        delete viewConfig.geoms[id].g2Instance;
        if (viewConfig.geoms[id].label) {
          delete viewConfig.geoms[id].label.g2Instance;
        }
      });
    }
    if (viewConfig.guide && viewConfig.guide.elements) {
      Object.keys(viewConfig.guide.elements).forEach((id) => {
        delete viewConfig.guide.elements[id].g2Instance;
      });
    }
  },

};
