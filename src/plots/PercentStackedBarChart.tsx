import 'react';
import PercentStackedBar, { PercentStackedBarConfig } from '@antv/g2plot/lib/plots/percent-stacked-bar';
import createPlot from '../createPlot';

export default createPlot<PercentStackedBarConfig>(PercentStackedBar, 'PercentStackedBarChart');
