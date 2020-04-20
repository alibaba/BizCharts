
import { useEffect } from 'react';
import useChartView from '@/hooks/useChartView';
import warn from '@/utils/warning';
import _each from '@antv/util/esm/each';
import _isNil from '@antv/util/esm/is-nil';
import _tranPropsToArray from '@/utils/tranPropsToArray';

export default function Coordinate(props) {
  const { type, transpose, rotate, scale, reflect, actions, ...options } = props;
  const view = useChartView();
  let coordIns = null;


  if (type) {
    coordIns = view.coordinate(type, { type: 'rect', actions: [], ...options });
  } else {
    coordIns = view.coordinate({ type: 'rect', actions: [], ...options });
  }

  if (rotate) {
    coordIns.rotate(rotate);
  }
  if (scale) {
    coordIns.rotate(..._tranPropsToArray(scale));
  }
  if (!_isNil(reflect)) {
    coordIns.reflect(reflect)
  }
  if (transpose) {
    coordIns.transpose();
  }

  if (type) {
    coordIns = view.coordinate(type, options);
  } else {
    coordIns = view.coordinate(options);
  }


  // actions 可重复执行，有顺序要求，所以废弃之前的api用法
  warn(!transpose, 'transpose 是坐标系转置动作。所以请使用actions替代。')
  warn(!reflect, 'reflect 是坐标系镜像, 沿 x 方向镜像或者沿 y 轴方向映射动作。所以请使用actions替代。')
  warn(!rotate, 'rotate 是坐标系旋转指定动作。所以请使用actions: [type:string, angle:number][] || IActions[] = [["rotate", Math.PI * 0.2]]替代。action中的顺序和次数会影响最终效果。')
  warn(!scale, 'scale 是坐标系缩放动作。所以请使用actions: [type:string, [x: number, y: number]][] || IActions[] = [["scale", [2, 2]]]替代。action中的顺序和次数会影响最终效果。')

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
