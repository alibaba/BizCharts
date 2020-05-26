import 'react';
import StackedRose, { StackedRoseConfig } from '@antv/g2plot/lib/plots/stacked-rose';
import createPlot from '../createPlot';

export default createPlot<StackedRoseConfig>(StackedRose, 'StackedRoseChart');
