import 'react';
import { Column } from '@antv/g2plot/lib/plots/column';
import { ColumnOptions, polyfill } from './ColumnChart';
import createPlot from '../createPlot';
import warn from 'warning';
import { deepMix } from '@antv/util';

interface RangeColumnOptions extends ColumnOptions {};

export {RangeColumnOptions};

export default createPlot<RangeColumnOptions>(Column, 'RangeColumnChart', props => {
  warn(false, '<RangeColumnChart /> 即将在5.0后废弃，请使用<ColumnChart />替代。');
  deepMix(props, {
    isRange: true,
  })
  return polyfill(props);
});
