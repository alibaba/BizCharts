import Polygon from '@antv/g2/lib/geometry/polygon';
import BaseGemo, { IBaseGemoProps } from './Base';
import { registerGeometry } from '../core';

import '@antv/g2/lib/geometry/shape/polygon';
import '@antv/g2/lib/geometry/shape/polygon/square';


registerGeometry('Polygon', Polygon);

export interface IPolygonGemoProps extends IBaseGemoProps {}

export default class PolygonGeom extends BaseGemo<IPolygonGemoProps> {
  GemoBaseClassName = 'polygon'
}
