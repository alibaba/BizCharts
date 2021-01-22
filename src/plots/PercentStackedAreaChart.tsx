import 'react';
import { Area } from '@antv/g2plot/lib/plots/area';
import createPlot from '../createPlot';
import { polyfill, AreaOptions } from './AreaChart';
import warn from 'warning';
import { deepMix } from '@antv/util';

interface PercentStackedAreaOptions extends AreaOptions {}

export { PercentStackedAreaOptions };
export default createPlot<PercentStackedAreaOptions>(Area, 'PercentStackedAreaChart', props => {
  warn(false, '<PercentStackedAreaChart /> 即将在5.0后废弃，请使用<AreaChart /> 替代。');
  deepMix(props, {
    isPercent: true
  });
  return polyfill(props);
});
