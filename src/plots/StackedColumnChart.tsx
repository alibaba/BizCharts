import 'react';
import StackedColumn, { StackedColumnConfig } from '@antv/g2plot/lib/plots/stacked-column';
import createPlot from '../createPlot';

export default createPlot<StackedColumnConfig>(StackedColumn, 'StackedColumnChart');
