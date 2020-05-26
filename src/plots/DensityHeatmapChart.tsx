import 'react';
import DensityHeatmap, { DensityHeatmapConfig } from '@antv/g2plot/lib/plots/density-heatmap';
import createPlot from '../createPlot';

export default createPlot<DensityHeatmapConfig>(DensityHeatmap, 'DensityHeatmapChartChart');
