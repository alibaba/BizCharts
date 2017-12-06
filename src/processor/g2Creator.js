import G2 from '@antv/g2';
import { Prop, Util } from '../shared';


const COORD_FUNC_PROPS = ['rotate', 'scale', 'reflect', 'transpose'];
const GEOM_FUNC_PROPS = ['position', 'color', 'size', 'shape', 'opacity', 'tooltip', 'style', 'animate', 'active', 'select'];


export default {
  chart(config) {
    const chartConfig = config.chart;
    const chart = new G2.Chart(config.chart);
    chart.coord('rect', {});
    chart.source(chartConfig.data, chartConfig.scale);
    chart.guide().clear();
    if (!config.Facet || !chartConfig.axis) {
      chart.axis(false);
    }
    chart.legend(false);
    chart.tooltip(false);
    if (chartConfig.filter) {

    }
    chartConfig.g2Instance = chart;
    return chart;
  },

  coord(chart, config) {
    const coordConfig = config.coord;

    if (!coordConfig) { return; }
    const coordIns = chart.coord(coordConfig.type, coordConfig);
    Prop.init(COORD_FUNC_PROPS, coordConfig, (value, key) => {
      coordIns[key](...value);
    });
    coordConfig.g2Instance = coordIns;
  },

  geoms(chart, config) {
    const geoms = config.geoms;

    if (!geoms) { return; }
    for (const id in geoms) {
      if (Object.prototype.hasOwnProperty.call(geoms, id)) {
        const geomConfig = geoms[id];
        const geom = chart[geomConfig.type]();

        if (geomConfig.adjust) {
          geom.adjust(geomConfig.adjust);
        }

        Prop.init(GEOM_FUNC_PROPS, geomConfig, (value, key) => {
          geom[key](...value);
        });

        // create label
        if (geomConfig.label) {
          const { content, ...labelOthers } = geomConfig.label;

          if (content) {
            if (Util.isArray(content)) {
              geom.label(content[0], content[1], labelOthers);
            } else {
              geom.label(content, labelOthers);
            }
          }
        }
        geomConfig.g2Instance = geom;
      }
    }
  },

  legends(chart, config) {
    const legends = config.legends;

    for (const id in legends) {
      if (Object.prototype.hasOwnProperty.call(legends, id)) {
        const legendConfig = legends[id];
        const { name, visible, ...cfg } = legendConfig;
        const arg = !visible ? visible : cfg;
        legendConfig.g2Instance = chart.legend(...(name ? [name, arg] : [arg]));
      }
    }
  },

  tooltip(chart, config) {
    const tooltipConfig = config.tooltip;

    if (!tooltipConfig) { return; }
    tooltipConfig.g2Instance = chart.tooltip({ ...tooltipConfig });
  },

  axises(chart, config) {
    const axises = config.axises;

    for (const id in axises) {
      if (Object.prototype.hasOwnProperty.call(axises, id)) {
        const axisConfig = axises[id];
        const { name, visible, ...others } = axisConfig;
        if (visible) {
          chart.axis(name, others);
        } else {
          chart.axis(name, false);
        }
      }
    }
  },

  views(chart, config) {
    const views = config.views;

    for (const id in views) {
      if (Object.prototype.hasOwnProperty.call(views, id)) {
        this.view(chart, views[id]);
      }
    }
  },

  view(chart, viewConfig) {
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
    this.guide(view, viewConfig);
  },

  guide(chart, config) {
    const guides = config.guide.elements;

    for (const id in guides) {
      if (Object.prototype.hasOwnProperty.call(guides, id)) {
        const guideConfig = guides[id];
        const { type, ...others } = guideConfig;
        chart.guide()[type](others);
      }
    }
  },

};
