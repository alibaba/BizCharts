'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _core = require('@antv/g2/lib/core');

var G2 = _interopRequireWildcard(_core);

var _shared = require('../shared');

var _common = require('./common');

var _common2 = _interopRequireDefault(_common);

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

var _configMerge = require('./configMerge');

var _configMerge2 = _interopRequireDefault(_configMerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var COORD_FUNC_PROPS = _common2.default.COORD_FUNC_PROPS;
var GEOM_FUNC_PROPS = _common2.default.GEOM_FUNC_PROPS;

exports.default = {
  createChart: function createChart(config) {
    var chartConfig = config.chart;
    var shouldForceFit = chartConfig.props.forceFit;
    chartConfig.props.forceFit = false;
    var chart = new G2.Chart(chartConfig.props);
    if (chartConfig.props.afterChartInitialized) {
      chartConfig.props.afterChartInitialized(chart);
    }
    // 保证第一次渲染是正确的
    if (shouldForceFit) {
      chart.forceFit();
    }
    chartConfig.g2Instance = chart;
    return chart;
  },
  executeChartConfig: function executeChartConfig(chart, config) {
    var chartConfig = config.chart;
    var props = chartConfig.props;
    chart.coord('rect', {});
    chart.source(props.data, props.scale);
    if (!config.facet && !props.axis || !config.facet || props.axis === false) {
      chart.axis(false);
    }
    chart.legend(false);
    chart.tooltip(false);
    if (props.filter) {
      props.filter.forEach(function (filterArg) {
        chart.filter(filterArg[0], filterArg[1]);
      });
    }
    _event2.default.bindEvents(chart, _event2.default.chartEvents, props);
    _event2.default.bindBaseEvents(chart, props);
  },
  coord: function coord(chart, config) {
    var coordConfig = config.coord;
    if (!coordConfig || coordConfig.g2Instance) {
      return;
    }

    var _coordConfig$props = coordConfig.props,
        type = _coordConfig$props.type,
        others = _objectWithoutProperties(_coordConfig$props, ['type']);

    var coordIns = chart.coord(type || 'rect', _shared.Util.without(others, COORD_FUNC_PROPS));
    _shared.Prop.init(COORD_FUNC_PROPS, others, function (value, key) {
      if (key === 'reflect') {
        _shared.Util.each(value, function (v) {
          return coordIns[key](v);
        });
      } else if (key === 'transpose') {
        if (value[0] === true) coordIns[key].apply(coordIns, _toConsumableArray(value));
      } else {
        coordIns[key].apply(coordIns, _toConsumableArray(value));
      }
    });
    coordConfig.g2Instance = coordIns;
  },
  createLabel: function createLabel(geom, labelConfig) {
    if (!labelConfig || labelConfig.g2Instance) {
      return;
    }

    var _labelConfig$props = labelConfig.props,
        content = _labelConfig$props.content,
        labelOthers = _objectWithoutProperties(_labelConfig$props, ['content']);

    if (content) {
      if (_shared.Util.isArray(content)) {
        labelConfig.g2Instance = geom.label(content[0], content[1], labelOthers);
      } else {
        labelConfig.g2Instance = geom.label(content, labelOthers);
      }
    }
  },
  createGeom: function createGeom(chart, geomConfig) {
    if (geomConfig.g2Instance) {
      if (geomConfig.label) {
        this.createLabel(geomConfig.g2Instance, geomConfig.label);
      }
      return;
    }

    var props = geomConfig.props;
    var geom = chart[props.type || 'interval']();

    if (props.adjust) {
      geom.adjust(props.adjust);
    }

    _shared.Prop.init(GEOM_FUNC_PROPS, props, function (value, key) {
      geom[key].apply(geom, _toConsumableArray(value));
    });

    geomConfig.g2Instance = geom;

    // create label
    this.createLabel(geom, geomConfig.label);
  },
  geoms: function geoms(chart, config) {
    var geoms = config.geoms;

    if (!geoms) {
      return;
    }
    for (var id in geoms) {
      if (Object.prototype.hasOwnProperty.call(geoms, id)) {
        this.createGeom(chart, geoms[id]);
      }
    }
  },
  legends: function legends(chart, config) {
    var legends = config.legends;

    for (var id in legends) {
      if (legends[id]) {
        var legendConfig = legends[id];
        if (legendConfig.g2Instance) {
          return;
        }

        var _legendConfig$props = legendConfig.props,
            name = _legendConfig$props.name,
            visible = _legendConfig$props.visible,
            cfg = _objectWithoutProperties(_legendConfig$props, ['name', 'visible']);

        var relVisible = visible;
        if (!Object.prototype.hasOwnProperty.call(legendConfig.props, 'visible')) {
          relVisible = true;
        }
        var arg = !relVisible ? relVisible : cfg;
        legendConfig.g2Instance = chart.legend.apply(chart, _toConsumableArray(name ? [name, arg] : [arg]));
      }
    }
  },
  tooltip: function tooltip(chart, config) {
    var tooltipConfig = config.tooltip;

    if (!tooltipConfig || tooltipConfig.g2Instance) {
      return;
    }
    tooltipConfig.g2Instance = chart.tooltip(_extends({}, tooltipConfig.props));
  },
  createAxis: function createAxis(chart, axisConfig) {
    if (axisConfig.g2Instance) {
      return;
    }

    var _axisConfig$props = axisConfig.props,
        name = _axisConfig$props.name,
        visible = _axisConfig$props.visible,
        others = _objectWithoutProperties(_axisConfig$props, ['name', 'visible']);

    if (visible || !Object.prototype.hasOwnProperty.call(axisConfig.props, 'visible')) {
      axisConfig.g2Instance = chart.axis(name, others);
    } else {
      axisConfig.g2Instance = chart.axis(name, false);
    }
  },
  axises: function axises(chart, config) {
    var axises = config.axises;

    for (var id in axises) {
      if (axises[id]) {
        this.createAxis(chart, axises[id]);
      }
    }
  },
  views: function views(chart, config) {
    var views = config.views;

    for (var id in views) {
      if (views[id]) {
        this.createView(chart, views[id]);
      }
    }
  },
  createView: function createView(chart, viewConfig) {
    if (viewConfig.parentInfo.name === 'Facet') {
      return;
    }
    if (viewConfig.g2Instance) {
      if (viewConfig.filter) {
        viewConfig.filter.forEach(function (filterArg) {
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

    var _viewConfig$props = viewConfig.props,
        scale = _viewConfig$props.scale,
        data = _viewConfig$props.data,
        instance = _viewConfig$props.instance,
        axis = _viewConfig$props.axis,
        filter = _viewConfig$props.filter,
        geoms = _viewConfig$props.geoms,
        others = _objectWithoutProperties(_viewConfig$props, ['scale', 'data', 'instance', 'axis', 'filter', 'geoms']);
    /* eslint-enable */


    var view = void 0;
    if (instance) {
      view = instance;
    } else {
      view = chart.view(_extends({}, others));
    }

    if (data) {
      view.source(data, scale);
    }

    if (scale) {
      view.scale(scale);
    }

    if (filter) {
      filter.forEach(function (filterArg) {
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
  facetView: function facetView(view, viewConfig) {
    /* eslint-disable  no-unused-vars */
    var _viewConfig$props2 = viewConfig.props,
        scale = _viewConfig$props2.scale,
        data = _viewConfig$props2.data,
        axis = _viewConfig$props2.axis,
        geoms = _viewConfig$props2.geoms,
        others = _objectWithoutProperties(_viewConfig$props2, ['scale', 'data', 'axis', 'geoms']);
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
    _configMerge2.default.mergeView(viewConfig, true);
  },
  guide: function guide(chart, _guide) {
    if (!_guide) {
      return;
    }

    var guides = _guide.elements;

    for (var id in guides) {
      if (guides[id]) {
        var guideConfig = guides[id];
        if (!guideConfig.g2Instance) {
          /* eslint-disable  no-unused-vars */
          var _guideConfig$props = guideConfig.props,
              type = _guideConfig$props.type,
              others = _objectWithoutProperties(_guideConfig$props, ['type']);
          /* eslint-enable */


          guideConfig.g2Instance = chart.guide()[guideConfig.type](others);
        }
      }
    }
  },
  facet: function facet(chart, config) {
    var _this = this;

    var facetConfig = config.facet;

    if (!facetConfig || facetConfig.g2Instance) {
      return;
    }

    var _facetConfig$props = facetConfig.props,
        children = _facetConfig$props.children,
        type = _facetConfig$props.type,
        others = _objectWithoutProperties(_facetConfig$props, ['children', 'type']);

    if (!children) {
      chart.facet(type, others);
      return;
    }
    var views = config.views;
    var facetView = null;
    for (var id in views) {
      if (views[id] && views[id].parentInfo.name === 'Facet' && views[id].parentInfo.id === facetConfig.id) {
        // facet view
        facetView = views[id];
        break;
      }
    }
    if (facetView) {
      _configMerge2.default.mergeView(facetView, true);
      others.eachView = function (view) {
        _this.facetView(view, facetView);
      };
      chart.facet(type, others);
    }
  },
  synchronizeG2Add: function synchronizeG2Add(chart, config) {
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
  synchronizeG2Views: function synchronizeG2Views(chart, config) {
    var views = config.views;

    for (var id in views) {
      if (views[id]) {
        this.synchronizeG2View(views[id].g2Instance, views[id]);
      }
    }
  },
  synchronizeG2View: function synchronizeG2View(view, viewConfig) {
    /*
       Others object must exclude geoms property.
       Because geoms property will cover the g2 view' inner geoms property.
    */
    view.clear();
    this.clearViewG2Instance(viewConfig);
    /* eslint-disable  no-unused-vars */

    var _viewConfig$props3 = viewConfig.props,
        scale = _viewConfig$props3.scale,
        data = _viewConfig$props3.data,
        instance = _viewConfig$props3.instance,
        axis = _viewConfig$props3.axis,
        geoms = _viewConfig$props3.geoms,
        others = _objectWithoutProperties(_viewConfig$props3, ['scale', 'data', 'instance', 'axis', 'geoms']);
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
  clearViewG2Instance: function clearViewG2Instance(viewConfig) {
    if (viewConfig.coord) {
      delete viewConfig.coord.g2Instance;
    }
    if (viewConfig.axises) {
      Object.keys(viewConfig.axises).forEach(function (id) {
        delete viewConfig.axises[id].g2Instance;
      });
    }
    if (viewConfig.geoms) {
      Object.keys(viewConfig.geoms).forEach(function (id) {
        delete viewConfig.geoms[id].g2Instance;
        if (viewConfig.geoms[id].label) {
          delete viewConfig.geoms[id].label.g2Instance;
        }
      });
    }
    if (viewConfig.guide && viewConfig.guide.elements) {
      Object.keys(viewConfig.guide.elements).forEach(function (id) {
        delete viewConfig.guide.elements[id].g2Instance;
      });
    }
  }
};