import 'react';
import Calendar, { HeatmapOptions } from '@antv/g2plot/lib/plots/heatmap';
import createPlot from '../createPlot';
import warn from 'warning';

interface CalendarOptions extends HeatmapOptions {}
export default createPlot<CalendarOptions>(Calendar, 'CalendarChart', (props) => {
  warn(true, '日历图即将被废弃，请使用<Heatmap />替代，具体用法请查看文档：')
  return props;
});
