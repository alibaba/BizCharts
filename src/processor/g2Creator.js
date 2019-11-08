import * as G2 from '@antv/g2/lib/core';
import { Prop, Util } from '../shared';
import common from './common';
import EventUtil from './event';
import configMerge from './configMerge';

const COORD_FUNC_PROPS = common.COORD_FUNC_PROPS;
const GEOM_FUNC_PROPS = common.GEOM_FUNC_PROPS;

export default {
  createChart(config) {
    const chartConfig = config.chart;
    const shouldForceFit = chartConfig.props.forceFit;
    chartConfig.props.forceFit = false;
    const chart = new G2.Chart(chartConfig.props);
    if (chartConfig.props.afterChartInitialized) {
      chartConfig.props.afterChartInitialized(chartConfig.g2Instance);
    }
    // 保证第一次渲染是正确的
    if (shouldForceFit) {
      chart.forceFit();
    }
    chartConfig.g2Instance = chart;
    return chart;
  },

  executeChartConfig(chart, config) {
    const chartConfig = config.chart;
    const props = chartConfig.props;
    chart.coord('rect', {});
    chart.source(props.data, props.scale);
    if ((!config.facet && !props.axis) || (!config.facet || props.axis === false)) {
      chart.axis(false);
    }
    chart.legend(false);
    chart.tooltip(false);
    if (props.filter) {
      props.filter.forEach((filterArg) => {
        chart.filter(filterArg[0], filterArg[1]);
      });
    }
    EventUtil.bindEvents(chart, EventUtil.chartEvents, props);
    EventUtil.bindBaseEvents(chart, props);
  },

  coord(chart, config) {
    const coordConfig = config.coord;
    if (!coordConfig || coordConfig.g2Instance) { return; }

    const { type, ...others } = coordConfig.props;
    const coordIns = chart.coord(
      type || 'rect',
      Util.without(others, COORD_FUNC_PROPS)
    );
    Prop.init(COORD_FUNC_PROPS, others, (value, key) => {
      if (key === 'reflect') {
        Util.each(value, v => coordIns[key](v));
      } else if (key === 'transpose') {
        if (value[0] === true) coordIns[key](...value);
      } else {
        coordIns[key](...value);
      }
    });
    coordConfig.g2Instance = coordIns;
  },

  createLabel(geom, labelConfig) {
    if (!labelConfig || labelConfig.g2Instance) { return; }
    const { content, ...labelOthers } = labelConfig.props;

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

    const props = geomConfig.props;
    const geom = chart[props.type || 'interval']();

    if (props.adjust) {
      geom.adjust(props.adjust);
    }

    Prop.init(GEOM_FUNC_PROPS, props, (value, key) => {
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
      if (legends[id]) {
        const legendConfig = legends[id];
        if (legendConfig.g2Instance) { return; }
        const { name, visible, ...cfg } = legendConfig.props;
        let relVisible = visible;
        if (!Object.prototype.hasOwnProperty.call(legendConfig.props, 'visible')) {
          relVisible = true;
        }
        const arg = !relVisible ? relVisible : cfg;
        legendConfig.g2Instance = chart.legend(...(name ? [name, arg] : [arg]));
      }
    }
  },

  tooltip(chart, config) {
    const tooltipConfig = config.tooltip;

    if (!tooltipConfig || tooltipConfig.g2Instance) { return; }
    tooltipConfig.g2Instance = chart.tooltip({ ...tooltipConfig.props });
  },

  createAxis(chart, axisConfig) {
    if (axisConfig.g2Instance) { return; }
    const { name, visible, ...others } = axisConfig.props;
    if (visible || !Object.prototype.hasOwnProperty.call(axisConfig.props, 'visible')) {
      axisConfig.g2Instance = chart.axis(name, others);
    } else {
      axisConfig.g2Instance = chart.axis(name, false);
    }
  },

  axises(chart, config) {
    const axises = config.axises;

    for (const id in axises) {
      if (axises[id]) {
        this.createAxis(chart, axises[id]);
      }
    }
  },

  views(chart, config) {
    const views = config.views;

    for (const id in views) {
      if (views[id]) {
        this.createView(chart, views[id]);
      }
    }
  },

  createView(chart, viewConfig) {
    if (viewConfig.parentInfo.name === 'Facet') {
      return;
    }
    if (viewConfig.g2Instance) {
      if (viewConfig.filter) {
        viewConfig.filter.forEach((filterArg) => {
          viewConfig.g2Instance.filter(filterArg[0], filterArg[1]);
        });
      }
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
    /* eslint-disable  no-unused-vars */
    const { scale, data, instance, axis, filter, geoms, ...others } = viewConfig.props;
    /* eslint-enable */
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

    if (filter) {
      filter.forEach((filterArg) => {
        view.filter(filterArg[0], filterArg[1]);
      });
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

  facetView(view, viewConfig) {
    /* eslint-disable  no-unused-vars */
    const { scale, data, axis, geoms, ...others } = viewConfig.props;
    /* eslint-enable */
    if (data) {
      view.source(data, scale);
    }

    if (scale) {
      view.scale(scale);
    }

    if (axis === false) {
      view.axis(false);
    }

    this.coord(view, viewConfig);
    this.axises(view, viewConfig);
    this.geoms(view, viewConfig);
    this.guide(view, viewConfig.guide);
    configMerge.mergeView(viewConfig, true);
  },

  guide(chart, guide) {
    if (!guide) { return; }

    const guides = guide.elements;

    for (const id in guides) {
      if (guides[id]) {
        const guideConfig = guides[id];
        if (!guideConfig.g2Instance) {
          /* eslint-disable  no-unused-vars */
          const { type, ...others } = guideConfig.props;
          /* eslint-enable */
          guideConfig.g2Instance = chart.guide()[guideConfig.type](others);
        }
      }
    }
  },

  facet(chart, config) {
    const facetConfig = config.facet;

    if (!facetConfig || facetConfig.g2Instance) { return; }

    const { children, type, ...others } = facetConfig.props;

    if (!children) {
      chart.facet(type, others);
      return;
    }
    const views = config.views;
    let facetView = null;
    for (const id in views) {
      if (views[id] && views[id].parentInfo.name === 'Facet' && views[id].parentInfo.id === facetConfig.id) {
        // facet view
        facetView = views[id];
        break;
      }
    }
    if (facetView) {
      configMerge.mergeView(facetView, true);
      others.eachView = (view) => {
        this.facetView(view, facetView);
      };
      chart.facet(type, others);
    }
  },

  synchronizeG2Add(chart, config) {
    this.coord(chart, config);
    this.axises(chart, config);
    this.legends(chart, config);
    this.tooltip(chart, config);
    this.geoms(chart, config);
    this.facet(chart, config);
    this.views(chart, config);
    // this.synchronizeG2Views(chart, config);
    this.guide(chart, config.guide);
  },

  synchronizeG2Views(chart, config) {
    const views = config.views;

    for (const id in views) {
      if (views[id]) {
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
    /* eslint-disable  no-unused-vars */
    const { scale, data, instance, axis, geoms, ...others } = viewConfig.props;
    /* eslint-enable */
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
