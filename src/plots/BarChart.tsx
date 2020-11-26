import 'react';
import Bar, { BarOptions } from '@antv/g2plot/lib/plots/bar';

import createPlot from '../createPlot';

export { BarOptions };
export default createPlot<BarOptions>(Bar, 'BarChart');
