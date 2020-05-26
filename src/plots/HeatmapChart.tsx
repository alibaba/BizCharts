import 'react';
import Heatmap, { HeatmapConfig } from '@antv/g2plot/lib/plots/heatmap';
import createPlot from '../createPlot';

export default createPlot<HeatmapConfig>(Heatmap, 'HeatmapChart');
