import Point from '@antv/g2/lib/geometry/point';
import BaseGemo, { IBaseGemoProps } from './Base';
import { registerGeometry } from '../core';

registerGeometry('Point', Point);

// 注册图形
import '@antv/g2/lib/geometry/shape/point/hollow';
import '@antv/g2/lib/geometry/shape/point/image';
import '@antv/g2/lib/geometry/shape/point/solid';

export interface IPointGemoProps extends IBaseGemoProps {}

export default class PointGeom extends BaseGemo<IPointGemoProps> {
  GemoBaseClassName = 'point';
}
