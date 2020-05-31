import Path from '@antv/g2/lib/geometry/path';
import { pathIn } from '@antv/g2/lib/animate/animation/path-in';
import BaseGemo, { IBaseGemo } from './Base';
import { registerGeometry, registerAnimation } from '../core';


registerAnimation('path-in', pathIn);
registerGeometry('Path', Path);

interface IPathGemo extends IBaseGemo {}

export default class PathGeom extends BaseGemo<IPathGemo> {
  GemoBaseClassName = 'path'
}
