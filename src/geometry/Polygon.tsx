import Polygon from '@antv/g2/lib/geometry/polygon';
import BaseGemo, { IBaseGemoProps } from './Base';
import { registerGeometry } from '../core';

registerGeometry('Polygon', Polygon);

export interface IPolygonGemoProps extends IBaseGemoProps {}

export default class PolygonGeom extends BaseGemo<IPolygonGemoProps> {
  GemoBaseClassName = 'polygon'
}
