'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTheme = exports.track = exports.PathUtil = exports.Animate = exports.Shape = exports.Util = exports.G2 = undefined;

var _core = require('@antv/g2/lib/core');

var _core2 = _interopRequireDefault(_core);

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
  track: track, // 不可开启，兼容旧版
  setTheme: setTheme
};

exports.default = BizCharts;