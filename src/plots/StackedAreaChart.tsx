import 'react';
import { Area, AreaOptions } from '@antv/g2plot/lib/plots/area';
import createPlot from '../createPlot';
import warn from 'warning';

interface StackedAreaOptions extends AreaOptions {}

export { StackedAreaOptions };
export default createPlot<StackedAreaOptions>(Area, 'StackedAreaChart', props => {
  warn(true, '<StackedAreaChart /> 即将在4.2.0后废弃，请使用AreaChart替代，文档查看：');
  return props;
});
