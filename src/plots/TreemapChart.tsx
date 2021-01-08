import 'react';
import { Treemap, TreemapOptions } from '@antv/g2plot/lib/plots/treemap';
import createPlot from '../createPlot';

export default createPlot<TreemapOptions>(Treemap, 'TreemapChart');
