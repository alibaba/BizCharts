import Edge from '@antv/g2/lib/geometry/edge';
import BaseGemo, { IBaseGemo } from './Base';
import { registerGeometry } from '../core';

registerGeometry('Edge', Edge);

interface IEdgeGemo extends IBaseGemo {}

export default class EdgeGeom extends BaseGemo<IEdgeGemo> {
  GemoBaseClassName = 'edge'
}
