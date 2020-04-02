import BaseGemo, { IBaseGemo } from './Base';
import Point from '@antv/g2/esm/geometry/point';
import { registerGeometry } from '../core';

registerGeometry('Point', Point);

interface IPointGemo extends IBaseGemo {}

export default class PointGeom extends BaseGemo<IPointGemo> {
  GemoBaseClassName = 'point'
}
