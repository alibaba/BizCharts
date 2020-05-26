import 'react';

import PercentStackedColumn, { PercentStackedColumnConfig } from '@antv/g2plot/lib/plots/percent-stacked-column';
import createPlot from '../createPlot';

export default createPlot<PercentStackedColumnConfig>(PercentStackedColumn, 'PercentStackedColumnChart');
