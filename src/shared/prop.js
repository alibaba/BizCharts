/**
 * prop function
 */

import Util from './util';

export default {
  init(keys = {}, props, callback) {
    Util.each(keys, (key) => {
      let value = props[key];
      if (value !== undefined) {
        if (!Util.isArray(value)) {
          value = [value];
        }
        callback(value, key);
      }
    });
  },

  update(keys, props, nextProps, callback) {
    let value;
    let nextValue;
    Util.each(keys, (key) => {
      value = props[key];
      nextValue = nextProps[key];
      if (!Util.shallowEqual(nextValue, value)) {
        if (!Util.isArray(nextValue)) {
          nextValue = [nextValue];
        }
        callback(nextValue, key);
      }
    });
  },
};
