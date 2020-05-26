import 'react';
import createPlot from '../createPlot';
import GroupedColumn, { GroupedColumnConfig } from '@antv/g2plot/lib/plots/grouped-column';

export default createPlot<GroupedColumnConfig>(GroupedColumn, 'GroupedColumnChart');
