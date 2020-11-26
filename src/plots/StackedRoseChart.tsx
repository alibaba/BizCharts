import 'react';
import StackedRose, { RoseOptions } from '@antv/g2plot/lib/plots/rose';
import createPlot from '../createPlot';
import warn from 'warning';

interface StackedRoseOptions extends RoseOptions {};

export { StackedRoseOptions };

export default createPlot<StackedRoseOptions>(StackedRose, 'StackedRoseChart', props => {
  warn(true, '<StackedRoseChart /> 即将在4.2.0后废弃，请使用<RoseChart />替代，文档查看：')
  return props;
});
