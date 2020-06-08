import isArray from '@antv/util/lib/is-array';
import forIn from '@antv/util/lib/for-in';

const cloneDeep = (deepObject) => {
  const map = [];
  const clone = (obj) => {
    map.push(obj);
    if (map.includes(obj)) {
      return obj;
    }
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
    let rst;
    if (isArray(obj)) {
      rst = [];
      for (let i = 0, l = obj.length; i < l; i++) {
        if (typeof obj[i] === 'object' && obj[i] != null) {
          rst[i] = clone(obj[i]);
        }
        else {
          rst[i] = obj[i];
        }
      }
    }
    else {
      rst = {};
      forIn(obj, (value, k) => {
        if (typeof value === 'object' && value != null) {
          rst[k] = clone(value);
        }
        else {
          rst[k] = value;
        }
      })
    }
    return rst;
  };
  return clone(deepObject);
}

export default cloneDeep;
