import 'react';
import { Bar } from '@antv/g2plot/lib/plots/bar';
import createPlot from '../createPlot';
import { BarOptions, polyfill } from './BarChart';
import warn from 'warning';
import { deepMix } from '@antv/util';

interface RangeBarOptions extends BarOptions{}
export { RangeBarOptions };
export default createPlot<RangeBarOptions>(Bar, 'RangeBarChart', props => {
  warn(false, '<RangeBarChart /> 即将在5.0后废弃，请使用<BarChart />替代。');
  deepMix(props, {
    isRange: true,
  });
  return polyfill(props);
});
