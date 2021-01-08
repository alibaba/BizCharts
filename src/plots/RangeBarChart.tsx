import 'react';
import { Bar, BarOptions } from '@antv/g2plot/lib/plots/bar';
import createPlot from '../createPlot';
import warn from 'warning';

interface RangeBarOptions extends BarOptions{}
export { RangeBarOptions };
export default createPlot<RangeBarOptions>(Bar, 'RangeBarChart', props => {
  warn(true, '<RangeBarChart /> 即将在4.2.0后废弃，请使用<BarChart />替代，文档查看：');
  return props;
});
