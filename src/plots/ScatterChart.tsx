import 'react';
import Scatter, { ScatterOptions } from '@antv/g2plot/lib/plots/scatter';
import createPlot from '../createPlot';

export default createPlot<ScatterOptions>(Scatter, 'ScatterChart');
