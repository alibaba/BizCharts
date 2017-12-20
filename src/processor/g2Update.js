
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
  needRebuildChart(config, nextConfig) {
    if (config.chart == null || nextConfig.chart == null) return false;
    const chartProps = config.chart;
    const nextChartProps = nextConfig.chart;

    if (!Util.shallowEqual(chartProps.padding, nextChartProps.padding)
      || !Util.shallowEqual(chartProps.background, nextChartProps.background)
      || !Util.shallowEqual(chartProps.plotBackground, nextChartProps.plotBackground)
      || !Util.shallowEqual(chartProps.pixelRatio, nextChartProps.pixelRatio)
    ) return true;

    return false;
  },

  synchronizeG2Update(chart, config, nextConfig) {
    this.updateChart(chart, config.chart, nextConfig.chart);
    this.updateAxises(chart, config.axises, nextConfig.axises);
    this.updateTooltip(chart, config, nextConfig);
    this.updateCoord(chart, config, nextConfig);
    this.updateLegends(chart, config.legends, nextConfig.legends);
    this.updateGeoms(chart, config.geoms, nextConfig.geoms);
    this.updateGuide(chart, config.guide, nextConfig.guide);
    this.updateViews(chart, config, nextConfig);
    this.updateFacet(chart, config, nextConfig);
  },

  updateChart(chart, props, nextProps) {
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

    EventUtil.updateEvents(chart, EventUtil.chartEvents, props, nextProps);
    EventUtil.updateBaseEvents(chart, props, nextProps);
  },

  updateAxis(chart, props, nextProps) {
    const { name, visible, ...others } = props;
    const { name: nextName, visible: nextVisible, ...nextOthers } = nextProps;

    warning(name === nextName, '`name` propertry should not be changed in `<Axis />`');

    if (visible !== nextVisible) {
      if (!nextVisible) {
        chart.axis(name, false);
        return;
      }
    }

    if (!Util.shallowEqual(others, nextOthers)) {
      chart.axis(name, nextOthers);
    }
  },

  updateAxises(chart, axises, nextAxises) {
    if (axises == null || nextAxises == null) {
      return;
    }

    if (Util.length(axises) !== Util.length(nextAxises)) {
      console.log('error !!!, update axis length not equal');
      // return;
    }

    for (const id in axises) {
      if (Object.prototype.hasOwnProperty.call(axises, id)
        && Object.prototype.hasOwnProperty.call(nextAxises, id)
      ) {
        this.updateAxis(chart, axises[id], nextAxises[id]);
      }
    }

    return;
  },

  updateTooltip(chart, config, nextConfig) {
    const props = config.tooltip;
    const nextProps = nextConfig.tooltip;

    if (props == null && nextProps == null) {
      return;
    }

    if (!Util.shallowEqual(props, nextProps)) {
      chart.tooltip({ ...nextProps });
    }
  },

  updateCoord(chart, config, nextConfig) {
    const props = config.coord;
    const nextProps = nextConfig.coord;

    if (props == null || nextProps == null) {
      return;
    }
    let g2Instance = props.g2Instance;

    const attrs = Util.without(props, COORD_FUNC_PROPS);
    const nextAttrs = Util.without(nextProps, COORD_FUNC_PROPS);
    if (!Util.shallowEqual(attrs, nextAttrs)) {
      g2Instance = chart.coord(nextProps.type, nextAttrs);
    }

    // diff value
    Prop.update(COORD_FUNC_PROPS, props, nextProps, (value, key) => {
      g2Instance[key](...value);
    });
  },

  updateLegend(chart, props, nextProps) {
    if (Util.shallowEqual(props, nextProps)) {
      return;
    }

    const { name, visible, ...cfg } = nextProps;
    const arg = !visible ? visible : cfg;

    chart.legend(...(name ? [name, arg] : [arg]));
  },

  updateLegends(chart, legends, nextLegends) {
    if (legends == null || nextLegends == null) {
      return;
    }

    for (const id in legends) {
      if (Object.prototype.hasOwnProperty.call(legends, id)
        && Object.prototype.hasOwnProperty.call(nextLegends, id)
      ) {
        this.updateLegend(chart, legends[id], nextLegends[id]);
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

  updateGeom(chart, props, nextProps) {
    if (props.type !== nextProps.type) {
      return true;
    }
    if (Util.shallowEqual(props, nextProps)) {
      return false;
    }
    const geom = props.g2Instance;
    const { adjust, ...attrs } = props;
    const { adjust: nextAdjust, ...nextAttrs } = nextProps;

    if (adjust || nextAdjust) {
      geom.adjust(nextAdjust);
    }
    Prop.update(GEOM_FUNC_PROPS, attrs, nextAttrs, (value, key) => {
      geom[key](...value);
    });

    this.updateLabel(geom, props.label, nextProps.label);

    return false;
  },

  updateGeoms(chart, geoms, nextGeoms) {
    if (geoms == null && nextGeoms == null) {
      return false;
    }

    if (Util.length(geoms) !== Util.length(nextGeoms)) {
      console.log('error !!!, update geoms length not equal');
    }

    for (const id in geoms) {
      if (Object.prototype.hasOwnProperty.call(geoms, id)
          && Object.prototype.hasOwnProperty.call(nextGeoms, id)) {
        if (this.updateGeom(chart, geoms[id], nextGeoms[id])) { return true; }
      }
    }

    return false;
  },

  isTypedGuideChanged(chart, props, nextProps) {
    if (!Util.shallowEqual(props, nextProps)) {
      return true;
    }

    return false;
  },

  updateGuide(chart, guide, nextGuide) {
    if (guide == null || nextGuide == null) {
      return;
    }

    const guides = guide.elements;
    const guidesLen = Object.keys(guides).length;
    const nextGuides = nextGuide.elements;
    const nextGuidesLen = Object.keys(nextGuides).length;
    let needRebuildGuide = false;

    if ((guides && !nextGuides) || (guidesLen !== nextGuidesLen)) {
      needRebuildGuide = true;
    } else {
      for (const id in guides) {
        if (nextGuides[id]) {
          if (this.isTypedGuideChanged(guides[id], nextGuides[id])) {
            needRebuildGuide = true;
            break;
          }
        }
      }
    }

    if (needRebuildGuide) {
      configMerge.mergeGuide(guide, nextGuide, true);
      chart.guide().clear();
      g2Creator.guide(chart, guide);
    }
  },

  updateView(chart, props, nextProps) {
    if (props == null || nextProps == null) { return; }
    const view = props.g2Instance;
    /*
       Others object must exclude geoms property.
       Because geoms property will cover the g2 view' inner geoms property.
    */
    const { scale, data, animate, axis } = props;
    const { scale: nextScale, animate: nextAnimate, data: nextData, axis: nextAxis } = nextProps;

    if (animate !== nextAnimate) {
      view.animate(nextAnimate);
    }

    if (data !== nextData) {
      view.changeData(nextData);
    }

    if (!Util.shallowEqual(scale, nextScale)) {
      view.scale(nextScale);
    }

    if (axis !== nextAxis) {
      view.axis(nextAxis);
    }

    this.updateCoord(view, props, nextProps);
    this.updateAxises(view, props.axises, nextProps.axises);
    this.updateGeoms(view, props.geoms, nextProps.geoms);
    this.updateGuide(view, props.guide, nextProps.guide);
  },

  updateViews(chart, config, nextConfig) {
    const views = config.views;
    const nextViews = nextConfig.views;

    if (!views || !nextViews) return;

    for (const id in views) {
      if (nextViews[id]) {
        if (views[id].needReExecute) {
          g2Creator.synchronizeG2View(views[id].g2Instance, nextViews[id]);
        } else {
          this.updateView(chart, views[id], nextViews[id]);
        }
      }
    }
  },

  updateFacet(chart, config, nextConfig) {
    const props = config.facet;
    const nextProps = nextConfig.facet;
    if (props == null || nextProps == null) return;

    const { children, type, ...others } = props;
    const { children: nextChildren, type: nextType, ...nextOthers } = nextProps;

    if (type !== nextType || !Util.shallowEqual(others, nextOthers)) {
      props.g2Instance = chart.facet(nextType, nextOthers);
    }
  },

};

export default iUpdate;
