import 'react';
import Scatter, { ScatterConfig } from '@antv/g2plot/lib/plots/scatter';
import createPlot from '../createPlot';

export default createPlot<ScatterConfig>(Scatter, 'ScatterChart');
