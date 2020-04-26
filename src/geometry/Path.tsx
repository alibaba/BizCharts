import Path from '@antv/g2/lib/geometry/path';
import BaseGemo, { IBaseGemo } from './Base';
import { registerGeometry } from '../core';

registerGeometry('Path', Path);

interface IPathGemo extends IBaseGemo {}

export default class PathGeom extends BaseGemo<IPathGemo> {
  GemoBaseClassName = 'path'
}
