import 'react';
import StackedBar, { BarOptions } from '@antv/g2plot/lib/plots/bar';
import createPlot from '../createPlot';
import warn from 'warning';

interface StackedBarOptions extends BarOptions {}

export { StackedBarOptions };
export default createPlot<StackedBarOptions>(StackedBar, 'StackedBarChart', props => {
  warn(true, '<StackedBarChart /> 即将在4.2.0后废弃，请使用<BarChart />替代，文档查看：');
  return props;
});
