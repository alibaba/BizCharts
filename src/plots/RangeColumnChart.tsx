import 'react';
import RangeColumn, { ColumnOptions } from '@antv/g2plot/lib/plots/column';
import createPlot from '../createPlot';
import warn from 'warning';

interface RangeColumnOptions extends ColumnOptions {};

export {RangeColumnOptions};

export default createPlot<RangeColumnOptions>(RangeColumn, 'RangeColumnChart', props => {
  warn(true, '<RangeColumnChart /> 即将在4.2.0后废弃，请使用<ColumnChart />替代，文档查看：');
  return props;
});
