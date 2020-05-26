import 'react';
import Donut, { DonutConfig } from '@antv/g2plot/lib/plots/donut';
import createPlot from '../createPlot';

export default createPlot<DonutConfig>(Donut, 'DonutChart');
