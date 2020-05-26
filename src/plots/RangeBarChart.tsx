import 'react';
import RangeBar, { RangeBarConfig } from '@antv/g2plot/lib/plots/range-bar';
import createPlot from '../createPlot';

export default createPlot<RangeBarConfig>(RangeBar, 'RangeBarChart');
