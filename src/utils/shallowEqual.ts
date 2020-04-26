import _each from '@antv/util/lib/each';
import _isArray from '@antv/util/lib/is-array';
import _isObject from '@antv/util/lib/is-object';

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  }
  return x !== x && y !== y; //  NaN == NaN
}

function length(obj) {
  if (_isArray(obj)) {
    return obj.length;
  }
  if (_isObject(obj)) {
    return Object.keys(obj).length;
  }
  return 0;
}

export default function(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  if (_isArray(objA) !== _isArray(objB)) {
    return false;
  }

  if (length(objA) !== length(objB)) {
    return false;
  }

  let ret = true;

  _each(objA, (v, k) => {
    if (!is(v, objB[k])) {
      ret = false;
      return ret;
    }
    return true;
  });

  return ret;
}
