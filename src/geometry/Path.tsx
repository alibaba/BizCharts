import BaseGemo, { IBaseGemo } from './Base';
import Path from '@antv/g2/esm/geometry/path';
import { registerGeometry } from '../core';

registerGeometry('Path', Path);

interface IPathGemo extends IBaseGemo {}

export default class PathGeom extends BaseGemo<IPathGemo> {
  GemoBaseClassName = 'path'
}
