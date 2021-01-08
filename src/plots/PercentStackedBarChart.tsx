import 'react';
import { Bar, BarOptions } from '@antv/g2plot/lib/plots/bar';
import createPlot from '../createPlot';
import warn from 'warning';

interface PercentStackedBarOptions extends BarOptions {};

export { PercentStackedBarOptions };
export default createPlot<PercentStackedBarOptions>(Bar, 'PercentStackedBarChart', props => {
  warn(true, '<PercentStackedBarChart /> 即将在4.2.0后废弃，请使用<BarChart />替代，文档查看：');
  return props;
});
