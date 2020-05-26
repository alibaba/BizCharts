import 'react';
import Bar, { BarConfig } from '@antv/g2plot/lib/plots/bar';

import createPlot from '../createPlot';

export default createPlot<BarConfig>(Bar, 'BarChart');
