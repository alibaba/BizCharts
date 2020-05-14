'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * util function
                                                                                                                                                                                                                                                                               */

var _core = require('@antv/g2/lib/core');

/* eslint-disable no-self-compare */

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  }
  return x !== x && y !== y; //  NaN == NaN
}

function length(obj) {
  if (_core.Util.isArray(obj)) {
    return obj.length;
  } else if (_core.Util.isObject(obj)) {
    return Object.keys(obj).length;
  }

  return 0;
}

exports.default = _core.Util.mix({}, _core.Util, {
  shallowEqual: function shallowEqual(objA, objB) {
    if (is(objA, objB)) {
      return true;
    }

    if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
      return false;
    }

    if (_core.Util.isArray(objA) !== _core.Util.isArray(objB)) {
      return false;
    }

    if (length(objA) !== length(objB)) {
      return false;
    }

    var ret = true;

    _core.Util.each(objA, function (v, k) {
      if (!is(v, objB[k])) {
        ret = false;
        return ret;
      }
      return true;
    });

    return ret;
  },
  without: function without(objA) {
    var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var ret = {};
    _core.Util.each(objA, function (v, k) {
      if (_core.Util.indexOf(keys, k) === -1) {
        ret[k] = v;
      }
    });
    return ret;
  },


  length: length
});