import 'react';
import Treemap, { TreemapConfig } from '@antv/g2plot/lib/plots/treemap';
import createPlot from '../createPlot';

export default createPlot<TreemapConfig>(Treemap, 'TreemapChart');
