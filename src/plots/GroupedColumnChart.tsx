import 'react';
import { Column, ColumnOptions } from '@antv/g2plot/lib/plots/column';
import createPlot from '../createPlot';
import warn from 'warning';

interface GroupedColumnOptions extends ColumnOptions {}
export { GroupedColumnOptions };
export default createPlot<GroupedColumnOptions>(Column, 'GroupedColumnChart', (props) => {
  warn(true, '<GroupedColumn /> 在4.2.0后即将被废弃，请使用<Column /> 替代，文档请看：')
  return props;
});
