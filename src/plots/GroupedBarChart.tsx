import 'react';
import GroupedBar, { GroupedBarConfig } from '@antv/g2plot/lib/plots/grouped-bar';
import createPlot from '../createPlot';

export default createPlot<GroupedBarConfig>(GroupedBar, 'GroupedBarChart');
