import 'react';
import StackedArea, { StackedAreaConfig } from '@antv/g2plot/lib/plots/stacked-area';
import createPlot from '../createPlot';

export default createPlot<StackedAreaConfig>(StackedArea, 'StackedAreaChart');
