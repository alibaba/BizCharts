import 'react';
import RangeColumn, { RangeColumnConfig } from '@antv/g2plot/lib/plots/range-column';
import createPlot from '../createPlot';

export default createPlot<RangeColumnConfig>(RangeColumn, 'RangeColumnChart');
