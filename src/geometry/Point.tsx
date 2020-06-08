import Point from '@antv/g2/lib/geometry/point';
import BaseGemo, { IBaseGemoProps } from './Base';
import { registerGeometry } from '../core';

registerGeometry('Point', Point);

export interface IPointGemoProps extends IBaseGemoProps {}

export default class PointGeom extends BaseGemo<IPointGemoProps> {
  GemoBaseClassName = 'point'
}
