import 'react';
import DensityHeatmap, { HeatmapOptions } from '@antv/g2plot/lib/plots/heatmap';
import createPlot from '../createPlot';

interface DensityHeatmapOptions extends HeatmapOptions {}

export { DensityHeatmapOptions };

export default createPlot<DensityHeatmapOptions>(DensityHeatmap, 'DensityHeatmapChartChart');
