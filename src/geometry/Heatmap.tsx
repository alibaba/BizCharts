import Heatmap from '@antv/g2/esm/geometry/heatmap';
import BaseGemo, { IBaseGemo } from './Base';
import { registerGeometry } from '../core';

registerGeometry('Heatmap', Heatmap);

interface IHeatmapGemo extends IBaseGemo {}

export default class HeatmapGeom extends BaseGemo<IHeatmapGemo> {
  GemoBaseClassName = 'heatmap'
}
