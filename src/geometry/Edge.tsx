import Edge from '@antv/g2/lib/geometry/edge';
import BaseGemo, { IBaseGemoProps } from './Base';
import { registerGeometry } from '../core';
import '@antv/g2/lib/geometry/shape/edge';

registerGeometry('Edge', Edge);


export interface IEdgeGemoProps extends IBaseGemoProps {}

export default class EdgeGeom extends BaseGemo<IEdgeGemoProps> {
  GemoBaseClassName = 'edge'
}
