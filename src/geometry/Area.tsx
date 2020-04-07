import Area from '@antv/g2/esm/geometry/area';
import BaseGemo, { IBaseGemo } from './Base';
import { registerGeometry } from '../core';

registerGeometry('Area', Area);

interface IAreaGemo extends IBaseGemo {}

export default class AreaGeom extends BaseGemo<IAreaGemo> {
  GemoBaseClassName = 'area'
}
