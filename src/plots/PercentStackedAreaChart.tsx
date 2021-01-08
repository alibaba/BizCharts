import 'react';
import { Area, AreaOptions } from '@antv/g2plot/lib/plots/area';
import createPlot from '../createPlot';
import warn from 'warning';

interface PercentStackedAreaOptions extends AreaOptions {}

export { PercentStackedAreaOptions };
export default createPlot<PercentStackedAreaOptions>(Area, 'PercentStackedAreaChart', props => {
  warn(true, '<PercentStackedAreaChart /> 即将在4.2.0后废弃，请使用<AreaChart /> 替代。文档查看：')
  return props;
});
