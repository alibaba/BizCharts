
import { useEffect } from 'react';
import useChartView from '../../hooks/useChartView';
import warn from '../../utils/warning';
import _isNil from '@antv/util/lib/is-nil';
import _isFunction from '@antv/util/lib/is-function';
import _tranPropsToArray from '../../utils/tranPropsToArray';

const parseArg = (str) => {
  if (str && Number(str) === Number(str)) {
    return Number(str);
  }
  return str;
}

export default function Coordinate(props) {
  const { type, transpose, rotate, scale, reflect, actions, ...options } = props;
  const view = useChartView();
  let coordIns = view.coordinate();
  console.log(0)
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

  useEffect(() => {
    console.log(1)
    return () => {
      // 销毁，即恢复默认状态
      console.log(2)
      coordIns.update({});
    }
  });
  return null;
}
