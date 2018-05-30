
// import interfaceEs6 from 'interface-es6';
import warning from 'warning';
import { Util, Prop } from '../shared';
import common from './common';
import g2Creator from './g2Creator';
import configMerge from './configMerge';
import EventUtil from './event';

const COORD_FUNC_PROPS = common.COORD_FUNC_PROPS;
const GEOM_FUNC_PROPS = common.GEOM_FUNC_PROPS;

const iUpdate = {
  needRebuildChart(config) {
    if (config.chart.props == null || config.chart.updateProps == null) return false;
    const chartProps = config.chart.props;
    const nextChartProps = config.chart.updateProps;

    if (!Util.shallowEqual(chartProps.padding, nextChartProps.padding)
      || !Util.shallowEqual(chartProps.background, nextChartProps.background)
      || !Util.shallowEqual(chartProps.plotBackground, nextChartProps.plotBackground)
      || !Util.shallowEqual(chartProps.pixelRatio, nextChartProps.pixelRatio)
    ) return true;

    return false;
  },

  needReExecute(config) {
    const geoms = config.geoms;

    if (geoms == null) return false;

    for (const id in geoms) {
      if (geoms[id].props && geoms[id].updateProps
        &&
        (geoms[id].props.type !== geoms[id].updateProps.type
         || (geoms[id].props.color && !geoms[id].updateProps.color)
         || (geoms[id].props.size && !geoms[id].updateProps.size)
         || (geoms[id].props.shape && !geoms[id].updateProps.shape)
        )
      ) return true;
    }
    return false;
    // return Object.keys(geoms).find((id) => {
    //   if (!geoms[id].props || !geoms[id].updateProps) return false;
    //   return geoms[id].props.type !== geoms[id].updateProps.type;
    // });
  },

  synchronizeG2Update(chart, config) {
    this.updateChart(chart, config.chart);
    this.updateAxises(chart, config.axises);
    this.updateTooltip(chart, config);
    this.updateCoord(chart, config);
    this.updateLegends(chart, config.legends);
    this.updateGeoms(chart, config.geoms);
    this.updateGuide(chart, config.guide);
    this.updateFacet(chart, config);
    this.updateViews(chart, config);
  },

  updateChart(chart, chartConfig) {
    if (!chartConfig) return;

    const props = chartConfig.props;
    const nextProps = chartConfig.updateProps;
    const { width, height, animate, data, scale } = props;
    const { width: nextWidth, height: nextHeight, animate: nextAnimate, data: nextData,
    scale: nextScale } = nextProps;

    if (data !== nextData) {
      chart.changeData(nextData);
    }

    if (!Util.shallowEqual(scale, nextScale)) {
      if (Util.isArray(nextScale)) {
        chart.scale(nextScale[0], nextScale[1]);
      } else {
        chart.scale(nextScale);
      }
    }

    if (animate !== nextAnimate) {
      chart.animate(nextAnimate);
    }

    if (width !== nextWidth && height !== nextHeight) {
      chart.changeSize(nextWidth, nextHeight);
    } else if (width !== nextWidth) {
      chart.changeWidth(nextWidth);
    } else if (height !== nextHeight) {
      chart.changeHeight(nextHeight);
    }

    EventUtil.updateEvents(chart, EventUtil.chartEvents, chartConfig.props, nextProps);
    EventUtil.updateBaseEvents(chart, chartConfig.updateProps, nextProps);
  },

  updateAxis(chart, axisConfig) {
    const { name, visible, ...others } = axisConfig.props;
    const { name: nextName, visible: nextVisible, ...nextOthers } = axisConfig.updateProps;

    warning(name === nextName, '`name` propertry should not be changed in `<Axis />`');

    if (visible !== nextVisible) {
      chart.axis(name, !!nextVisible);
    }

    // todo others have g2Instance
    if (!Util.shallowEqual(others, nextOthers)) {
      chart.axis(name, nextOthers);
    }
  },

  updateAxises(chart, axises) {
    if (!axises) return;

    for (const id in axises) {
      if (axises[id] && axises[id].props && axises[id].updateProps) {
        this.updateAxis(chart, axises[id]);
      }
    }

    return;
  },

  updateTooltip(chart, config) {
    if (!config.tooltip) return;
    const props = config.tooltip.props;
    const nextProps = config.tooltip.updateProps;

    if (props == null && nextProps == null) {
      return;
    }

    if (!Util.shallowEqual(props, nextProps)) {
      chart.tooltip({ ...nextProps });
    }
  },

  updateCoord(chart, config) {
    const coordConfig = config.coord;
    if (!coordConfig) return;

    const props = coordConfig.props;
    const nextProps = coordConfig.updateProps;

    if (props == null || nextProps == null) {
      return;
    }

    // type can not be in coord's second param.
    const nextAttrs = Util.without(nextProps, COORD_FUNC_PROPS.concat(['type']));

    if (!Util.shallowEqual(props, nextProps)) {
      const g2Instance = chart.coord(nextProps.type, nextAttrs);
      coordConfig.g2Instance = g2Instance;
      Prop.init(COORD_FUNC_PROPS, nextProps, (value, key) => {
        g2Instance[key](...value);
      });
    }
  },

  updateLegend(chart, legendConfig) {
    const props = legendConfig.props;
    const nextProps = legendConfig.updateProps;

    if (!nextProps) return;

    if (Util.shallowEqual(props, nextProps)) {
      return;
    }

    const { name, visible, ...cfg } = nextProps;
    const arg = !visible ? visible : cfg;

    chart.legend(...(name ? [name, arg] : [arg]));
  },

  updateLegends(chart, legends) {
    if (legends == null) {
      return;
    }

    for (const id in legends) {
      if (legends[id]) {
        this.updateLegend(chart, legends[id]);
      }
    }
  },

  updateLabel(geom, props, nextProps) {
    if (props == null || nextProps == null) {
      return;
    }

    const { content, ...others } = props;
    const { content: nextContent, ...nextOthers } = nextProps;

    if (!Util.shallowEqual(others, nextOthers)
        || !Util.shallowEqual(content, nextContent)
      ) {
      if (Util.isArray(nextContent)) {
        geom.label(nextContent[0], nextContent[1], nextOthers);
      } else {
        geom.label(nextContent, nextOthers);
      }
    }
  },

  updateGeom(chart, geomConfig) {
    const props = geomConfig.props;
    const nextProps = geomConfig.updateProps;

    if (!props || !nextProps) return;

    if (props.type !== nextProps.type) {
      // needReExecute chart
      return;
    }
    const geom = geomConfig.g2Instance;
    if (Util.shallowEqual(props, nextProps)) {
      if (geomConfig.label) {
        this.updateLabel(geom, geomConfig.label.props, geomConfig.label.updateProps);
      }
      return;
    }
    const { adjust, ...attrs } = props;
    const { adjust: nextAdjust, ...nextAttrs } = nextProps;

    if (adjust || nextAdjust) {
      geom.adjust(nextAdjust);
    }
    Prop.update(GEOM_FUNC_PROPS, attrs, nextAttrs, (value, key) => {
      geom[key](...value);
    });

    if (geomConfig.label) {
      this.updateLabel(geom, geomConfig.label.props, geomConfig.label.updateProps);
    }
  },

  updateGeoms(chart, geoms) {
    if (geoms == null) {
      return false;
    }

    for (const id in geoms) {
      if (geoms[id]) {
        this.updateGeom(chart, geoms[id]);
      }
    }

    return false;
  },

  isTypedGuideChanged(config) {
    if (!Util.shallowEqual(config.props, config.updateProps)) {
      return true;
    }

    return false;
  },

  updateGuide(chart, guide) {
    if (!guide || !guide.elements) {
      return;
    }

    const guides = guide.elements;
    let needRebuildGuide = false;

    for (const id in guides) {
      if (guides[id]) {
        if (guides[id].updateProps || this.isTypedGuideChanged(guides[id])) {
          needRebuildGuide = true;
          break;
        }
      }
    }

    if (needRebuildGuide) {
      configMerge.mergeGuide(guide, true);
      chart.guide().clear();
      g2Creator.guide(chart, guide);
    }
  },

  updateView(chart, viewInfo) {
    if (!viewInfo || !viewInfo.props || !viewInfo.updateProps || viewInfo.parentInfo.name === 'Facet') { return; }
    const view = viewInfo.g2Instance;
    const props = viewInfo.props;
    const nextProps = viewInfo.updateProps;
    /*
       Others object must exclude geoms property.
       Because geoms property will cover the g2 view' inner geoms property.
    */
    const { scale, data, animate, axis, filter } = props;
    const { scale: nextScale, animate: nextAnimate, data: nextData,
      axis: nextAxis, filter: nextFilter }
      = nextProps;

    if (animate !== nextAnimate) {
      view.animate(nextAnimate);
    }

    if (data !== nextData) {
      view.changeData(nextData);
    }

    if (!Util.shallowEqual(scale, nextScale)) {
      view.scale(nextScale);
    }

    if (!Util.shallowEqual(filter, nextFilter)) {
      nextFilter.forEach((filterArg) => {
        view.filter(filterArg[0], filterArg[1]);
      });
    }

    if (axis !== nextAxis) {
      view.axis(nextAxis);
    }

    this.updateCoord(view, viewInfo);
    this.updateAxises(view, viewInfo.axises);
    this.updateGeoms(view, viewInfo.geoms);
    this.updateGuide(view, viewInfo.guide);
  },

  updateViews(chart, config) {
    const views = config.views;

    if (!views) return;

    for (const id in views) {
      const curView = views[id];
      if (curView && (curView.needReExecute || this.needReExecute(curView))) {
        g2Creator.synchronizeG2View(curView.g2Instance, curView);
        views[id].needReExecute = false;
      } else {
        this.updateView(chart, curView);
      }
    }
  },

  updateFacet(chart, config) {
    const facetConfig = config.facet;
    if (!facetConfig) return;
    const props = facetConfig.props;
    const nextProps = facetConfig.updateProps;
    if (props == null || nextProps == null) return;

    const { type, ...others } = props;
    const { type: nextType, ...nextOthers } = nextProps;

    if (type !== nextType || !Util.shallowEqual(others, nextOthers)) {
      facetConfig.props = nextProps;
      g2Creator.facet(chart, config);
    }
  },

};

export default iUpdate;
