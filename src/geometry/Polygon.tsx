import Polygon from '@antv/g2/esm/geometry/polygon';
import BaseGemo, { IBaseGemo } from './Base';
import { registerGeometry } from '../core';

registerGeometry('Polygon', Polygon);

interface IPolygonGemo extends IBaseGemo {}

export default class PolygonGeom extends BaseGemo<IPolygonGemo> {
  GemoBaseClassName = 'polygon'
}
