import _each from '@antv/util/lib/each';
import _isString from '@antv/util/lib/is-string';

// 支持正则匹配
const pickWithout = (obj: Record<string, any>, keys: (string | RegExp)[]) => {
  const ret: { [key: string]: any } = {};
  _each(obj, (v: any, k: string) => {
    let match = false;
    keys.forEach(itKey => {
      if (_isString(itKey) && itKey === k) {
        match = true;
      } else if (itKey instanceof RegExp && k.match(itKey)) {
        match = true;
      }
    })
    if (!match) {
      ret[k] = v;
    }
  });
  return ret;
}

export default pickWithout;
