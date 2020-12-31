import Line from '@antv/g2/lib/geometry/line';
import '@antv/g2/lib/geometry/shape/line/step';
import BaseGemo, { IBaseGemoProps } from './Base';
import { registerGeometry } from '../core';

registerGeometry('Line', Line);

import '@antv/g2/lib/geometry/shape/line/step';

export interface ILineGemoProps extends IBaseGemoProps {}

export default class LineGeom extends BaseGemo<ILineGemoProps> {
  GemoBaseClassName = 'line';
}
