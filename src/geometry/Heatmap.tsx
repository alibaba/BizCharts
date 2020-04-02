import BaseGemo, { IBaseGemo } from './Base';
import Heatmap from '@antv/g2/esm/geometry/heatmap';
import { registerGeometry } from '../core';

registerGeometry('Heatmap', Heatmap);

interface IHeatmapGemo extends IBaseGemo {}

export default class HeatmapGeom extends BaseGemo<IHeatmapGemo> {
  GemoBaseClassName = 'heatmap'
}
