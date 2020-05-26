import 'react';
import StackedBar, { StackedBarConfig } from '@antv/g2plot/lib/plots/stacked-bar';
import createPlot from '../createPlot';

export default createPlot<StackedBarConfig>(StackedBar, 'StackedBarChart');
