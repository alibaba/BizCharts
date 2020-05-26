import 'react';
import Area, { AreaConfig } from '@antv/g2plot/lib/plots/area';

import createPlot from '../createPlot';

export default createPlot<AreaConfig>(Area, 'AreaChart');
