'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _shared = require('../shared');

var _common = require('./common');

var _common2 = _interopRequireDefault(_common);

var _g2Creator = require('./g2Creator');

var _g2Creator2 = _interopRequireDefault(_g2Creator);

var _configMerge = require('./configMerge');

var _configMerge2 = _interopRequireDefault(_configMerge);

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// import interfaceEs6 from 'interface-es6';


var COORD_FUNC_PROPS = _common2.default.COORD_FUNC_PROPS;
var GEOM_FUNC_PROPS = _common2.default.GEOM_FUNC_PROPS;

var iUpdate = {
  needRebuildChart: function needRebuildChart(config) {
    if (config.chart.props == null || config.chart.updateProps == null) return false;
    var chartProps = config.chart.props;
    var nextChartProps = config.chart.updateProps;

    if (!_shared.Util.shallowEqual(chartProps.padding, nextChartProps.padding) || !_shared.Util.shallowEqual(chartProps.background, nextChartProps.background) || !_shared.Util.shallowEqual(chartProps.plotBackground, nextChartProps.plotBackground) || !_shared.Util.shallowEqual(chartProps.pixelRatio, nextChartProps.pixelRatio)) return true;

    return false;
  },
  needReExecute: function needReExecute(config) {
    var geoms = config.geoms;

    if (geoms == null) return false;

    for (var id in geoms) {
      if (geoms[id].props && geoms[id].updateProps && (geoms[id].props.type !== geoms[id].updateProps.type || geoms[id].props.color && !geoms[id].updateProps.color || geoms[id].props.size && !geoms[id].updateProps.size || geoms[id].props.shape && !geoms[id].updateProps.shape)) return true;
    }
    return false;
    // return Object.keys(geoms).find((id) => {
    //   if (!geoms[id].props || !geoms[id].updateProps) return false;
    //   return geoms[id].props.type !== geoms[id].updateProps.type;
    // });
  },
  needRepaint: function needRepaint(config) {
    var chartConfig = config.chart;
    var data = chartConfig.props.data;
    var nextData = chartConfig.updateProps.data;

    return data === nextData;
  },
  synchronizeG2Update: function synchronizeG2Update(chart, config) {
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
  updateChart: function updateChart(chart, chartConfig) {
    if (!chartConfig) return;

    var props = chartConfig.props;
    var nextProps = chartConfig.updateProps;
    var width = props.width,
        height = props.height,
        animate = props.animate,
        data = props.data,
        scale = props.scale;
    var nextWidth = nextProps.width,
        nextHeight = nextProps.height,
        nextAnimate = nextProps.animate,
        nextData = nextProps.data,
        nextScale = nextProps.scale;


    if (data !== nextData) {
      chart.changeData(nextData);
    }

    if (!_shared.Util.shallowEqual(scale, nextScale)) {
      if (_shared.Util.isArray(nextScale)) {
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

    _event2.default.updateEvents(chart, _event2.default.chartEvents, chartConfig.props, nextProps);
    _event2.default.updateBaseEvents(chart, chartConfig.updateProps, nextProps);
  },
  updateAxis: function updateAxis(chart, axisConfig) {
    var _axisConfig$props = axisConfig.props,
        name = _axisConfig$props.name,
        visible = _axisConfig$props.visible,
        others = _objectWithoutProperties(_axisConfig$props, ['name', 'visible']);

    var _axisConfig$updatePro = axisConfig.updateProps,
        nextName = _axisConfig$updatePro.name,
        nextVisible = _axisConfig$updatePro.visible,
        nextOthers = _objectWithoutProperties(_axisConfig$updatePro, ['name', 'visible']);

    // warning(name === nextName, '`name` propertry should not be changed in `<Axis />`');

    if (visible !== nextVisible) {
      chart.axis(name, !!nextVisible);
    }

    // todo others have g2Instance
    if (!_shared.Util.shallowEqual(others, nextOthers)) {
      chart.axis(name, nextOthers);
    }
  },
  updateAxises: function updateAxises(chart, axises) {
    if (!axises) return;
    for (var id in axises) {
      if (axises[id] && axises[id].props && axises[id].updateProps) {
        this.updateAxis(chart, axises[id]);
      }
    }
  },
  updateTooltip: function updateTooltip(chart, config) {
    if (!config.tooltip) return;
    var props = config.tooltip.props;
    var nextProps = config.tooltip.updateProps;

    if (props == null && nextProps == null) {
      return;
    }

    if (!_shared.Util.shallowEqual(props, nextProps)) {
      chart.tooltip(_extends({}, nextProps));
    }
  },
  updateCoord: function updateCoord(chart, config) {
    var coordConfig = config.coord;
    if (!coordConfig) return;

    var props = coordConfig.props;
    var nextProps = coordConfig.updateProps;

    if (props == null || nextProps == null) {
      return;
    }

    // type can not be in coord's second param.
    var nextAttrs = _shared.Util.without(nextProps, COORD_FUNC_PROPS.concat(['type']));

    if (!_shared.Util.shallowEqual(props, nextProps)) {
      var g2Instance = chart.coord(nextProps.type, nextAttrs);
      coordConfig.g2Instance = g2Instance;
      _shared.Prop.init(COORD_FUNC_PROPS, nextProps, function (value, key) {
        if (key === 'reflect') {
          _shared.Util.each(value, function (v) {
            return g2Instance[key](v);
          });
        } else if (key === 'transpose') {
          if (value[0] === true) g2Instance[key].apply(g2Instance, _toConsumableArray(value));
        } else {
          g2Instance[key].apply(g2Instance, _toConsumableArray(value));
        }
      });
    }
  },
  updateLegend: function updateLegend(chart, legendConfig) {
    var props = legendConfig.props;
    var nextProps = legendConfig.updateProps;

    if (!nextProps) return;

    if (_shared.Util.shallowEqual(props, nextProps)) {
      return;
    }

    var name = nextProps.name,
        visible = nextProps.visible,
        cfg = _objectWithoutProperties(nextProps, ['name', 'visible']);

    var arg = !visible ? visible : cfg;

    chart.legend.apply(chart, _toConsumableArray(name ? [name, arg] : [arg]));
  },
  updateLegends: function updateLegends(chart, legends) {
    if (legends == null) {
      return;
    }

    for (var id in legends) {
      if (legends[id]) {
        this.updateLegend(chart, legends[id]);
      }
    }
  },
  updateLabel: function updateLabel(geom, props, nextProps) {
    if (props == null || nextProps == null) {
      return;
    }

    var content = props.content,
        others = _objectWithoutProperties(props, ['content']);

    var nextContent = nextProps.content,
        nextOthers = _objectWithoutProperties(nextProps, ['content']);

    if (!_shared.Util.shallowEqual(others, nextOthers) || !_shared.Util.shallowEqual(content, nextContent)) {
      if (_shared.Util.isArray(nextContent)) {
        geom.label(nextContent[0], nextContent[1], nextOthers);
      } else {
        geom.label(nextContent, nextOthers);
      }
    }
  },
  updateGeom: function updateGeom(chart, geomConfig) {
    var props = geomConfig.props;
    var nextProps = geomConfig.updateProps;

    if (!props || !nextProps) return;

    if (props.type !== nextProps.type) {
      // needReExecute chart
      return;
    }
    var geom = geomConfig.g2Instance;
    if (_shared.Util.shallowEqual(props, nextProps)) {
      if (geomConfig.label) {
        this.updateLabel(geom, geomConfig.label.props, geomConfig.label.updateProps);
      }
      return;
    }

    var adjust = props.adjust,
        attrs = _objectWithoutProperties(props, ['adjust']);

    var nextAdjust = nextProps.adjust,
        nextAttrs = _objectWithoutProperties(nextProps, ['adjust']);

    if (adjust || nextAdjust) {
      geom.adjust(nextAdjust);
    }
    _shared.Prop.update(GEOM_FUNC_PROPS, attrs, nextAttrs, function (value, key) {
      geom[key].apply(geom, _toConsumableArray(value));
    });

    if (geomConfig.label) {
      this.updateLabel(geom, geomConfig.label.props, geomConfig.label.updateProps);
    }
  },
  updateGeoms: function updateGeoms(chart, geoms) {
    if (geoms == null) {
      return false;
    }

    for (var id in geoms) {
      if (geoms[id]) {
        this.updateGeom(chart, geoms[id]);
      }
    }

    return false;
  },
  isTypedGuideChanged: function isTypedGuideChanged(config) {
    if (!_shared.Util.shallowEqual(config.props, config.updateProps)) {
      return true;
    }

    return false;
  },
  updateGuide: function updateGuide(chart, guide) {
    if (!guide || !guide.elements) {
      return;
    }

    var guides = guide.elements;
    var needRebuildGuide = false;

    for (var id in guides) {
      if (guides[id]) {
        if (guides[id].updateProps || this.isTypedGuideChanged(guides[id])) {
          needRebuildGuide = true;
          break;
        }
      }
    }

    if (needRebuildGuide) {
      _configMerge2.default.mergeGuide(guide, true);
      chart.guide().clear();
      _g2Creator2.default.guide(chart, guide);
    }
  },
  updateView: function updateView(chart, viewInfo) {
    if (!viewInfo || !viewInfo.props || !viewInfo.updateProps || viewInfo.parentInfo.name === 'Facet') {
      return;
    }
    var view = viewInfo.g2Instance;
    var props = viewInfo.props;
    var nextProps = viewInfo.updateProps;
    /*
       Others object must exclude geoms property.
       Because geoms property will cover the g2 view' inner geoms property.
    */
    var scale = props.scale,
        data = props.data,
        animate = props.animate,
        axis = props.axis,
        filter = props.filter;
    var nextScale = nextProps.scale,
        nextAnimate = nextProps.animate,
        nextData = nextProps.data,
        nextAxis = nextProps.axis,
        nextFilter = nextProps.filter;


    if (animate !== nextAnimate) {
      view.animate(nextAnimate);
    }

    if (data !== nextData) {
      view.changeData(nextData);
    }

    if (!_shared.Util.shallowEqual(scale, nextScale)) {
      view.scale(nextScale);
    }

    if (!_shared.Util.shallowEqual(filter, nextFilter)) {
      nextFilter.forEach(function (filterArg) {
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
  updateViews: function updateViews(chart, config) {
    var views = config.views;

    if (!views) return;

    for (var id in views) {
      var curView = views[id];
      if (curView && (curView.needReExecute || this.needReExecute(curView))) {
        _g2Creator2.default.synchronizeG2View(curView.g2Instance, curView);
        views[id].needReExecute = false;
      } else {
        this.updateView(chart, curView);
      }
    }
  },
  updateFacet: function updateFacet(chart, config) {
    var facetConfig = config.facet;
    if (!facetConfig) return;
    var props = facetConfig.props;
    var nextProps = facetConfig.updateProps;
    if (props == null || nextProps == null) return;

    var type = props.type,
        others = _objectWithoutProperties(props, ['type']);

    var nextType = nextProps.type,
        nextOthers = _objectWithoutProperties(nextProps, ['type']);

    if (type !== nextType || !_shared.Util.shallowEqual(others, nextOthers)) {
      facetConfig.props = nextProps;
      _g2Creator2.default.facet(chart, config);
    }
  }
};

exports.default = iUpdate;