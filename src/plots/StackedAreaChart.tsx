import 'react';
import { Area } from '@antv/g2plot/lib/plots/area';
import createPlot from '../createPlot';
import { polyfill, AreaOptions } from './AreaChart';
import warn from 'warning';

interface StackedAreaOptions extends AreaOptions {}

export { StackedAreaOptions };
export default createPlot<StackedAreaOptions>(Area, 'StackedAreaChart', props => {
  warn(true, '<StackedAreaChart /> 即将在4.2.0后废弃，请使用<AreaChart /> 替代。');
  return polyfill(props);
});
