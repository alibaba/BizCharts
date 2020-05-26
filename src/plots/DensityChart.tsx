import 'react';
import Density, { DensityConfig } from '@antv/g2plot/lib/plots/density';
import createPlot from '../createPlot';

export default createPlot<DensityConfig>(Density, 'DensityChart');
