import 'react';
import Rose, { RoseConfig } from '@antv/g2plot/lib/plots/rose';
import createPlot from '../createPlot';

export default createPlot<RoseConfig>(Rose, 'RoseChart');
