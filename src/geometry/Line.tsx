import Line from '@antv/g2/lib/geometry/line';
import '@antv/g2/lib/geometry/shape/line/step';
import BaseGemo, { IBaseGemoProps } from './Base';
import { registerGeometry } from '../core';
import '@antv/g2/lib/geometry/shape/line/step';

registerGeometry('Line', Line);


export interface ILineGemoProps extends IBaseGemoProps {}

export default class LineGeom extends BaseGemo<ILineGemoProps> {
  GemoBaseClassName = 'line';
}
