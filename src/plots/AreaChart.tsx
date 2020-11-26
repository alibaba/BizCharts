import 'react';
import { Area, AreaOptions } from '@antv/g2plot/lib/plots/area';

import createPlot from '../createPlot';

export { AreaOptions };
export default createPlot<AreaOptions>(Area, 'AreaChart');
