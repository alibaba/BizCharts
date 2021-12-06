
import { isObject, isArray } from '@antv/util';

const isEqual = (value: any, other: any): boolean => {
  if (isObject(value) && isObject(other)) {
    const valueKeys = Object.keys(value);
    const otherKeys = Object.keys(other);
    if (valueKeys.length !== otherKeys.length) {
      return false;
    }
    let rst = true;
    for (let i = 0; i < valueKeys.length; i++) {
      rst = isEqual(value[valueKeys[i]], other[valueKeys[i]]);
      if (!rst) {
        break;
      }
    }
    return rst;
  }
  if (isArray(value) && isArray(other)) {
    if (value.length !== other.length) {
      return false;
    }
    let rst = true;
    for (let i = 0; i < value.length; i++) {
      rst = isEqual(value[i], other[i]);
      if (!rst) {
        break;
      }
    }
    return rst;
  }
  if (value === other) {
    return true;
  }
  if (!value || !other) {
    return false;
  }
  return false;
};

export default isEqual;
