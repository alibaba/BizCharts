'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _util = require('../shared/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * prop function
 */
var chartItemEvents = [{ prop: 'onPlotMove', event: 'plotmove' }, { prop: 'onPlotEnter', event: 'plotenter' }, { prop: 'onPlotLeave', event: 'plotleave' }, { prop: 'onPlotClick', event: 'plotclick' }, { prop: 'onPlotDblClick', event: 'plotdblclick' }, { prop: 'onItemSelected', event: 'itemselected' }, { prop: 'onItemUnselected', event: 'itemunselected' }, { prop: 'onItemSelectedChange', event: 'itemselectedchange' }, { prop: 'onTooltipChange', event: 'tooltip:change' }, { prop: 'onTooltipShow', event: 'tooltip:show' }, { prop: 'onTooltipHide', event: 'tooltip:hide' }];

var baseEventNames = ['mouseenter', 'mousemove', 'mouseleave', 'click', 'dblclick', 'mousedown', 'mouseup', 'touchstart', 'touchmove', 'touchend'];

var baseEventsPostfix = ['Mouseenter', 'Mousemove', 'Mouseleave', 'Click', 'Dblclick', 'Mousedown', 'Mouseup', 'Touchstart', 'Touchmove', 'Touchend'];

var shapes = ['point', 'area', 'line', 'path', 'interval', 'schema', 'polygon', 'edge', 'axis-title', 'axis-label', 'axis-ticks', 'axis-line', 'axis-grid', 'legend-title', 'legend-item', 'legend-marker', 'legend-text', 'guide-text', 'guide-region', 'guide-line', 'guide-image', 'label'];

var shapesEvtNamePrefix = ['onPoint', 'onArea', 'onLine', 'onPath', 'onInterval', 'onSchema', 'onPolygon', 'onEdge', 'onAxisTitle', 'onAxisLabel', 'onAxisTicks', 'onAxisLine', 'onAxisGrid', 'onLegendTitle', 'onLegendItem', 'onLegendMarker', 'onLegendText', 'onGuideText', 'onGuideRegion', 'onGuideLine', 'onGuideImage', 'onLabel'];

var shapeEvents = [];
for (var i = 0; i < shapes.length; i += 1) {
  for (var j = 0; j < baseEventNames.length; j += 1) {
    shapeEvents.push({
      prop: '' + shapesEvtNamePrefix[i] + baseEventsPostfix[j],
      event: shapes[i] + ':' + baseEventNames[j]
    });
  }
}

var chartEvents = chartItemEvents.concat(shapeEvents);

function genBaseEvents() {
  return [{ prop: 'onMouseEnter', event: 'mouseenter' }, { prop: 'onMouseMove', event: 'mousemove' }, { prop: 'onMouseLeave', event: 'mouseleave' }, { prop: 'onClick', event: 'click' }, { prop: 'onDblClick', event: 'dblclick' }, { prop: 'onMouseDown', event: 'mousedown' }, { prop: 'onMouseUp', event: 'mouseup' }, { prop: 'onTouchStart', event: 'touchstart' }, { prop: 'onTouchMove', event: 'touchmove' }, { prop: 'onTouchEnd', event: 'touchend' }];
}

function genItemBaseEvents(type) {
  var geomEvents = genBaseEvents();
  _util2.default.map(geomEvents, function (key) {
    var event = key.event;
    key.event = type + ':' + event;
    return key;
  });
  return geomEvents;
}

var baseEvents = genBaseEvents();

var baseEventObjectTypes = {
  onMouseEnter: _propTypes2.default.object,
  onMouseMove: _propTypes2.default.object,
  onMouseLeave: _propTypes2.default.object,
  onClick: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),
  onDblClick: _propTypes2.default.object,
  onMouseDown: _propTypes2.default.object,
  onMouseUp: _propTypes2.default.object,
  onTouchStart: _propTypes2.default.object,
  onTouchMove: _propTypes2.default.object,
  onTouchEnd: _propTypes2.default.object
};

var baseEventFuncTypes = {
  onMouseEnter: _propTypes2.default.func,
  onMouseMove: _propTypes2.default.func,
  onMouseLeave: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  onDblClick: _propTypes2.default.func,
  onMouseDown: _propTypes2.default.func,
  onMouseUp: _propTypes2.default.func,
  onTouchStart: _propTypes2.default.func,
  onTouchMove: _propTypes2.default.func,
  onTouchEnd: _propTypes2.default.func
};

function bindEvents(chart) {
  var EVENTS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var props = arguments[2];

  _util2.default.each(EVENTS, function (key) {
    var prop = key.prop,
        event = key.event;

    var fns = props[prop];

    if (_util2.default.isFunction(fns)) {
      chart.on(event, fns);
    } else if (_util2.default.isObject(fns)) {
      for (var name in fns) {
        if (fns[name] !== undefined) {
          chart.on(name + ':' + event, fns[name]);
        }
      }
    }
  });
}

function bindBaseEvents(chart, props) {
  bindEvents(chart, baseEvents, props);
}

function updateEvents(chart) {
  var EVENTS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var props = arguments[2];
  var nextProps = arguments[3];

  _util2.default.each(EVENTS, function (key) {
    var prop = key.prop,
        event = key.event;

    var fns = props[prop];
    var nextFns = nextProps[prop];
    var name = void 0;

    if (!_util2.default.shallowEqual(fns, nextFns)) {
      if (_util2.default.isFunction(fns) && _util2.default.isFunction(nextFns)) {
        chart.off(event, fns);
        chart.on(event, nextFns);
      } else if (_util2.default.isObject(fns) && _util2.default.isObject(nextFns)) {
        for (name in fns) {
          if (Object.prototype.hasOwnProperty.call(fns, name)) {
            chart.off(name + ':' + event, fns[name]);
          }
        }
        for (name in nextFns) {
          if (Object.prototype.hasOwnProperty.call(nextFns, name)) {
            chart.on(name + ':' + event, nextFns[name]);
          }
        }
      }
    }
  });
}

function updateBaseEvents(chart, props, nextProps) {
  updateEvents(chart, baseEvents, props, nextProps);
}

function unbindEvents(chart) {
  var EVENTS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var props = arguments[2];

  _util2.default.each(EVENTS, function (key) {
    var prop = key.prop,
        event = key.event;

    var fns = props[prop];

    if (_util2.default.isFunction(fns)) {
      chart.off(event, fns);
    } else if (_util2.default.isObject(fns)) {
      for (var name in fns) {
        if (Object.prototype.hasOwnProperty.call(fns, name)) {
          chart.off(name + ':' + event, fns[name]);
        }
      }
    }
  });
}

function unbindBaseEvents(chart, props) {
  unbindEvents(chart, baseEvents, props);
}

exports.default = {
  baseEventObjectTypes: baseEventObjectTypes,
  baseEventFuncTypes: baseEventFuncTypes,
  genBaseEvents: genBaseEvents,
  genItemBaseEvents: genItemBaseEvents,
  bindEvents: bindEvents,
  bindBaseEvents: bindBaseEvents,
  updateEvents: updateEvents,
  updateBaseEvents: updateBaseEvents,
  unbindEvents: unbindEvents,
  unbindBaseEvents: unbindBaseEvents,
  chartEvents: chartEvents
};