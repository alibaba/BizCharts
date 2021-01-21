import Heatmap from '@antv/g2/lib/geometry/heatmap';
import BaseGemo, { IBaseGemoProps } from './Base';
import { registerGeometry } from '../core';

registerGeometry('Heatmap', Heatmap);


export interface IHeatmapGemoProps extends IBaseGemoProps {}

export default class HeatmapGeom extends BaseGemo<IHeatmapGemoProps> {
  GemoBaseClassName = 'heatmap'
}
