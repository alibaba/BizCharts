import BaseGemo, { IBaseGemo } from './Base';
import Line from '@antv/g2/esm/geometry/line';
import { registerGeometry } from '../core';

registerGeometry('Line', Line);

interface ILineGemo extends IBaseGemo {}

export default class LineGeom extends BaseGemo<ILineGemo> {
  GemoBaseClassName = 'line'
}
