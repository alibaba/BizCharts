'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTheme = exports.track = exports.Interactions = exports.PathUtil = exports.Animate = exports.Shape = exports.Util = exports.G2 = exports.Facet = exports.Label = exports.Guide = exports.View = exports.Geom = exports.Tooltip = exports.Legend = exports.Axis = exports.Coord = exports.Chart = undefined;

var _Chart = require('./components/Chart');

Object.defineProperty(exports, 'Chart', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Chart).default;
  }
});

var _Coord = require('./components/Coord');

Object.defineProperty(exports, 'Coord', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Coord).default;
  }
});

var _Axis = require('./components/Axis');

Object.defineProperty(exports, 'Axis', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Axis).default;
  }
});

var _Legend = require('./components/Legend');

Object.defineProperty(exports, 'Legend', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Legend).default;
  }
});

var _Tooltip = require('./components/Tooltip');

Object.defineProperty(exports, 'Tooltip', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Tooltip).default;
  }
});

var _Geom = require('./components/Geom');

Object.defineProperty(exports, 'Geom', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Geom).default;
  }
});

var _View = require('./components/View');

Object.defineProperty(exports, 'View', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_View).default;
  }
});

var _Guide = require('./components/Guide');

Object.defineProperty(exports, 'Guide', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Guide).default;
  }
});

var _Label = require('./components/Label');

Object.defineProperty(exports, 'Label', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Label).default;
  }
});

var _Facet = require('./components/Facet');

Object.defineProperty(exports, 'Facet', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Facet).default;
  }
});

var _core = require('@antv/g2/lib/core');

var _core2 = _interopRequireDefault(_core);

var _interaction = require('@antv/g2/lib/interaction');

var _interaction2 = _interopRequireDefault(_interaction);

var _util = require('./shared/util');

var _util2 = _interopRequireDefault(_util);

var _themes = require('./themes');

var _themes2 = _interopRequireDefault(_themes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.G2 = _core2.default;
exports.Util = _util2.default;
exports.Shape = _core.Shape;
exports.Animate = _core.Animate;
exports.PathUtil = _core.PathUtil;
exports.Interactions = _interaction2.default;
var track = exports.track = function track() {};
var setTheme = exports.setTheme = function setTheme(theme) {
  var themeObj = theme;
  if (typeof theme === 'string' && _themes2.default[theme]) {
    themeObj = _themes2.default[theme];
  }
  _core2.default.Global.setTheme(themeObj);
};

var BizCharts = {
  G2: _core2.default,
  Util: _util2.default,
  Shape: _core.Shape,
  Animate: _core.Animate,
  PathUtil: _core.PathUtil,
  track: track,
  setTheme: setTheme,
  Interactions: _interaction2.default
};

exports.default = BizCharts;