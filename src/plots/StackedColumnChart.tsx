import 'react';
import StackedColumn, { ColumnOptions } from '@antv/g2plot/lib/plots/column';
import createPlot from '../createPlot';
import warn from 'warning';

interface StackedColumnOptions extends ColumnOptions {};

export { StackedColumnOptions };

export default createPlot<StackedColumnOptions>(StackedColumn, 'StackedColumnChart', props => {
  warn(true, '<StackedColumnChart />即将在4.2.0中废弃，请使用<ColumnChart />替代, 文档查看：');
  return props;
});
