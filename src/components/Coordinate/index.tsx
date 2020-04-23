import _isNil from '@antv/util/lib/is-nil';
import _isFunction from '@antv/util/lib/is-function';
import useChartView from '../../hooks/useChartView';
import _tranPropsToArray from '../../utils/tranPropsToArray';

export default function Coordinate(props) {
  const { type, transpose, rotate, scale, reflect, actions, ...options } = props;
  const view = useChartView();
  const coordIns = view.coordinate();

  // 重置
  coordIns.update({});

  if (type) {
    view.coordinate(type, { ...options });
  } else {
    view.coordinate({ type: 'rect', ...options });
  }

  if (_isFunction(actions)) {
    actions(coordIns);
  }

  if (rotate) {
    coordIns.rotate(rotate);
  }
  if (scale) {
    coordIns.scale(..._tranPropsToArray(scale));
  }
  if (!_isNil(reflect)) {
    coordIns.reflect(reflect)
  }
  if (transpose) {
    coordIns.transpose();
  }

  return null;
}
