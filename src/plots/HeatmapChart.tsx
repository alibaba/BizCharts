import 'react';
import Heatmap, { HeatmapOptions } from '@antv/g2plot/lib/plots/heatmap';
import createPlot from '../createPlot';

export { HeatmapOptions };
export default createPlot<HeatmapOptions>(Heatmap, 'HeatmapChart');
