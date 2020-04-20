import _isArray from '@antv/util/esm/is-array';

export default function (prop) {
  if (_isArray(prop)) {
    return prop;
  }
  return [prop];
}
