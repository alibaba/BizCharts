import Point from '@antv/g2/lib/geometry/point';
import BaseGemo, { IBaseGemo } from './Base';
import { registerGeometry } from '../core';

registerGeometry('Point', Point);

interface IPointGemo extends IBaseGemo {}

export default class PointGeom extends BaseGemo<IPointGemo> {
  GemoBaseClassName = 'point'
}
