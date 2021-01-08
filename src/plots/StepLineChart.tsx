import 'react';
import { Line, LineOptions } from '@antv/g2plot/lib/plots/line';
import createPlot from '../createPlot';
import warn from 'warning';

interface StepLineOptions extends LineOptions {};

export { StepLineOptions };
export default createPlot<StepLineOptions>(Line, 'StepLineChart', props => {
  warn(true, '<StepLineChart />即将在4.2.0后废弃，请使用<LineChart />替代。文档查看：');
  return props;
});

