/** 
 * 对比不一致则执行回调
*/
import _each from '@antv/util/lib/each';
import _isArray from '@antv/util/lib/is-array';
import _shallowEqual from './shallowEqual';

export default (preProps: any, nextProps: any | null, keys: string[], callback: Function) => {
  // preProps 为null 即初始化。
  if (preProps === null) {
    _each(keys, (key) => {
      let value = nextProps[key];
      if (value !== undefined) {
        if (!_isArray(value)) {
          value = [value];
        }
        callback(value, key);
      }
    });
    return;
  }

  let value;
  let nextValue;
  _each(keys, (key) => {
    value = preProps[key];
    nextValue = nextProps[key];
    if (!_shallowEqual(nextValue, value)) {
      if (!_isArray(nextValue)) {
        nextValue = [nextValue];
      }
      callback(nextValue, key);
    }
  });
}
