import 'react';
import GroupedRose, { GroupedRoseConfig } from '@antv/g2plot/lib/plots/grouped-rose';
import createPlot from '../createPlot';

export default createPlot<GroupedRoseConfig>(GroupedRose, 'GroupedRoseChart');
