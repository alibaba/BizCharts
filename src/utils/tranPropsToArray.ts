import _isArray from '@antv/util/lib/is-array';

export default function (prop) {
  if (_isArray(prop)) {
    return prop;
  }
  return [prop];
}
