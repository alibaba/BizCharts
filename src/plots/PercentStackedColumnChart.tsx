import 'react';

import { Column } from '@antv/g2plot/lib/plots/column';
import createPlot from '../createPlot';
import warn from 'warning';
import { deepMix } from '@antv/util';
import { ColumnOptions, polyfill } from './ColumnChart';

interface PercentStackedColumnOptions extends ColumnOptions {}
export default createPlot<PercentStackedColumnOptions>(Column, 'PercentStackedColumnChart', props => {
  warn(false, '<PercentStackedColumnChart /> 即将在5.0后废弃，请使用<ColumnChart />替代。');
  deepMix(props, {
    isPercent: true,
    isStack: true,
  });
  return polyfill(props);
});
