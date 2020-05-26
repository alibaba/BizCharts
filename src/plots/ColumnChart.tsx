import 'react';
import Column, { ColumnConfig } from '@antv/g2plot/lib/plots/column';

import createPlot from '../createPlot';

export default createPlot<ColumnConfig>(Column, 'ColumnChart');
