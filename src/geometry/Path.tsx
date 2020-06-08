import Path from '@antv/g2/lib/geometry/path';
import { pathIn } from '@antv/g2/lib/animate/animation/path-in';
import BaseGemo, { IBaseGemoProps } from './Base';
import { registerGeometry, registerAnimation } from '../core';


registerAnimation('path-in', pathIn);
registerGeometry('Path', Path);

export interface IPathGemoProps extends IBaseGemoProps {}

export default class PathGeom extends BaseGemo<IPathGemoProps> {
  GemoBaseClassName = 'path'
}
