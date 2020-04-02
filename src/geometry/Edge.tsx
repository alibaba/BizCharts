import BaseGemo, { IBaseGemo } from './Base';
import Edge from '@antv/g2/esm/geometry/edge';
import { registerGeometry } from '../core';

registerGeometry('Edge', Edge);

interface IEdgeGemo extends IBaseGemo {}

export default class EdgeGeom extends BaseGemo<IEdgeGemo> {
  GemoBaseClassName = 'edge'
}
