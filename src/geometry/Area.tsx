import Area from '@antv/g2/lib/geometry/area';
import BaseGemo, { IBaseGemoProps } from './Base';
import { registerGeometry } from '../core';

import '@antv/g2/lib/geometry/shape/area';

registerGeometry('Area', Area);

export interface IAreaGemoProps extends IBaseGemoProps {}

export default class AreaGeom extends BaseGemo<IAreaGemoProps> {
  GemoBaseClassName = 'area'
}
