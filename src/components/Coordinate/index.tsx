import _isNil from '@antv/util/lib/is-nil';
import { CoordinateCfg, CoordinateActions } from '@antv/g2/lib/interface';
import _isFunction from '@antv/util/lib/is-function';
// import _tranPropsToArray from '../../utils/tranPropsToArray';
import useChartView from '../../hooks/useChartView';

export interface ICoordinateProps extends CoordinateCfg {
  /** 坐标系类型 */
  type?: 'polar' | 'theta' | 'rect' | 'cartesian' | 'helix';
  /** 坐标系配置项，目前常用于极坐标。 */
  cfg?: CoordinateCfg;
  /**
   * 坐标系变换动作串行操作:
   * 1. rotate 表示旋转，使用弧度制。
   * 2. scale 表示沿着 x 和 y 方向的缩放比率。
   * 3. reflect 表示沿 x 方向镜像或者沿 y 轴方向映射。
   * 4. transpose 表示 x，y 轴置换。
   */
  actions?: CoordinateActions[];
  /** 是否转置。 */
  transpose?: boolean;
  /** 旋转，使用弧度制。 */
  rotate?: number;
  /** 表示沿着 x 和 y 方向的缩放比率。 */
  scale?: [number, number];
  /** 表示沿 x 方向镜像或者沿 y 轴方向映射。 */
  reflect?: 'x' | 'y';
}

export default function Coordinate(props: ICoordinateProps) {
  const { type, transpose, rotate, scale, reflect, actions, ...options } = props;
  const view = useChartView();
  const coordIns = view.coordinate();

  // 重置
  coordIns.update({});

  if (type) {
    view.coordinate(type, { ...options });
  } else {
    view.coordinate('rect', { ...options });
  }

  if (rotate) {
    coordIns.rotate(rotate);
  }
  if (scale) {
    coordIns.scale(...scale);
  }
  if (!_isNil(reflect)) {
    coordIns.reflect(reflect)
  }
  if (transpose) {
    coordIns.transpose();
  }

  if (_isFunction(actions)) {
    actions(coordIns);
  }

  return null;
}
