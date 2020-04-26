import Line from '@antv/g2/lib/geometry/line';
import '@antv/g2/lib/geometry/shape/line/step';
import BaseGemo, { IBaseGemo } from './Base';
import { registerGeometry } from '../core';

registerGeometry('Line', Line);

interface ILineGemo extends IBaseGemo {}

export default class LineGeom extends BaseGemo<ILineGemo> {
  GemoBaseClassName = 'line'
}
