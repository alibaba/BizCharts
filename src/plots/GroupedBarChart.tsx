import 'react';
import GroupedBar, { BarOptions } from '@antv/g2plot/lib/plots/bar';
import createPlot from '../createPlot';

interface GroupedBarOptions extends BarOptions {}

export { GroupedBarOptions };
export default createPlot<GroupedBarOptions>(GroupedBar, 'GroupedBarChart');
