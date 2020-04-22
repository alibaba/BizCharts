
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

  // transform 坐标系转化
  // if (_isString(transform)) {
  //   const trs = transform.match(/(.*?)\((.*?)\)\;?/g) || [];
  //   trs.forEach(str => {
  //     const match = str.match(/(.*)\((.*?)\)\;?/);
  //     const action = match[1];
  //     const argStr = match[2];
  //     let args = []; 
  //     console.log(action, argStr);
  //     if (argStr.includes(',')) {
  //       args = argStr.split(',').map(parseArg);
  //     } else {
  //       args = [parseArg(argStr)];
  //     }
  //     coordIns[action](...args);
  //   })
  // }
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


  // actions 可重复执行，有顺序要求，所以废弃之前的api用法
  warn(!transpose, 'transpose 是坐标系转置动作。所以请使用transform替代。')
  warn(!reflect, 'reflect 是坐标系镜像, 沿 x 方向镜像或者沿 y 轴方向映射动作。所以请使用transform替代。')
  warn(!rotate, 'rotate 是坐标系旋转指定动作。所以请使用transform')
  warn(!scale, 'scale 是坐标系缩放动作。所以请使用transform')

  useEffect(() => {
    return () => {
      // 销毁，即恢复默认状态
      view.coordinate({
        type: 'rect',
        actions: [],
        cfg: {},
      });
    }
  });
  return null;
}
