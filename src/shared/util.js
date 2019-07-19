/**
 * util function
 */

import { Util } from '@antv/g2/lib/core';

/* eslint-disable no-self-compare */

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  }
  return x !== x && y !== y; //  NaN == NaN
}

function length(obj) {
  if (Util.isArray(obj)) {
    return obj.length;
  } else if (Util.isObject(obj)) {
    return Object.keys(obj).length;
  }

  return 0;
}

export default Util.mix({}, Util, {
  shallowEqual(objA, objB) {
    if (is(objA, objB)) {
      return true;
    }

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
      return false;
    }

    if (Util.isArray(objA) !== Util.isArray(objB)) {
      return false;
    }

    if (length(objA) !== length(objB)) {
      return false;
    }

    let ret = true;

    Util.each(objA, (v, k) => {
      if (!is(v, objB[k])) {
        ret = false;
        return ret;
      }
      return true;
    });

    return ret;
  },

  without(objA, keys = []) {
    const ret = {};
    Util.each(objA, (v, k) => {
      if (Util.indexOf(keys, k) === -1) {
        ret[k] = v;
      }
    });
    return ret;
  },

  length,
});
