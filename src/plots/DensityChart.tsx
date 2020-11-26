import 'react';
import Density, { HeatmapOptions } from '@antv/g2plot/lib/plots/heatmap';
import createPlot from '../createPlot';

interface DensityOptions extends HeatmapOptions {};

export { DensityOptions };

export default createPlot<DensityOptions>(Density, 'DensityChart', (props) => {
  return props;
});
