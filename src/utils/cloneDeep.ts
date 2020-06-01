import isArray from '@antv/util/lib/is-array';

const cloneDeep = (deepObject) => {
  let map = [];
  const clone = function (obj) {
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
      for (let k in obj) {
        if (typeof obj[k] === 'object' && obj[k] != null) {
          rst[k] = clone(obj[k]);
        }
        else {
          rst[k] = obj[k];
        }
      }
    }
    return rst;
  };
  return clone(deepObject);
}

export default cloneDeep;
//# sourceMappingURL=clone.js.map
