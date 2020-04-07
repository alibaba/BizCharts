import Interval from '@antv/g2/esm/geometry/interval';
import BaseGemo, { IBaseGemo } from './Base';
import { registerGeometry } from '../core';

registerGeometry('Interval', Interval);

interface IIntervalGemo extends IBaseGemo {}

export default class IntervalGeom extends BaseGemo<IIntervalGemo> {
  GemoBaseClassName = 'interval'
}
