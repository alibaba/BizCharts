'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  init: function init() {
    var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var props = arguments[1];
    var callback = arguments[2];

    _util2.default.each(keys, function (key) {
      var value = props[key];
      if (value !== undefined) {
        if (!_util2.default.isArray(value)) {
          value = [value];
        }
        callback(value, key);
      }
    });
  },
  update: function update(keys, props, nextProps, callback) {
    var value = void 0;
    var nextValue = void 0;
    _util2.default.each(keys, function (key) {
      value = props[key];
      nextValue = nextProps[key];
      if (!_util2.default.shallowEqual(nextValue, value)) {
        if (!_util2.default.isArray(nextValue)) {
          nextValue = [nextValue];
        }
        callback(nextValue, key);
      }
    });
  }
}; /**
    * prop function
    */