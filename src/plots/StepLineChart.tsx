import 'react';
import { Line } from '@antv/g2plot/lib/plots/line';
import createPlot from '../createPlot';
import { LineOptions, polyfill } from './LineChart';
import warn from 'warning';

interface StepLineOptions extends LineOptions {
  step?: 'hv' | 'vh' | 'vhv' | 'hvh';
};

export { StepLineOptions };
export default createPlot<StepLineOptions>(Line, 'StepLineChart', props => {
  warn(true, '<StepLineChart />即将在4.2.0后废弃，请使用<LineChart />替代。文档查看：');
  props.stepType = props.stepType || props.step || 'hv';
  return polyfill(props);
});

