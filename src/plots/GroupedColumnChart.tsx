import 'react';
import GroupedColumn, { GroupedColumnConfig } from '@antv/g2plot/lib/plots/grouped-column';
import createPlot from '../createPlot';

export default createPlot<GroupedColumnConfig>(GroupedColumn, 'GroupedColumnChart');
