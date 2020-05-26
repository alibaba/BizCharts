import 'react';
import PercentStackedArea, { PercentStackedAreaConfig } from '@antv/g2plot/lib/plots/percent-stacked-area';
import createPlot from '../createPlot';

export default createPlot<PercentStackedAreaConfig>(PercentStackedArea, 'PercentStackedAreaChart');
