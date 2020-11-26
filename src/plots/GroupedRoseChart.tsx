import 'react';
import GroupedRose, { RoseOptions } from '@antv/g2plot/lib/plots/rose';
import createPlot from '../createPlot';
import warn from 'warning';

interface GroupedRoseOptions extends RoseOptions {};

export { GroupedRoseOptions };
export default createPlot<GroupedRoseOptions>(GroupedRose, 'GroupedRoseChart', props => {
  warn(true, '<GroupedRose /> 即将在4.2.0后废弃，请使用<Rose />。文档查看：')
  return props;
});
