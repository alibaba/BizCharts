import 'react';
import Column, { ColumnOptions } from '@antv/g2plot/lib/plots/column';

import createPlot from '../createPlot';

export { ColumnOptions };
export default createPlot<ColumnOptions>(Column, 'ColumnChart');
