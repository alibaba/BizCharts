import 'react';
import Rose, { RoseOptions } from '@antv/g2plot/lib/plots/rose';
import createPlot from '../createPlot';

export default createPlot<RoseOptions>(Rose, 'RoseChart');
