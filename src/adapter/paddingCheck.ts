import _isArray from '@antv/util/lib/is-array';
import _isString from '@antv/util/lib/is-string';
import warn from 'warning';

export default padding => {
  if (_isArray(padding)) {
    padding.forEach(element => {
      if (_isString(element)) {
        // @ts-ignore
        warn(true, 'padding 不支持auto 混合使用。请直接设置padding 为auto。更详细内容请查看Chart padding属性文档。')
      }
    });
  }
}
