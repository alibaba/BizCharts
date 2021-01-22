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
  warn(false, '<StepLineChart />即将在5.0后废弃，请使用<LineChart />替代。');
  props.stepType = props.stepType || props.step || 'hv';
  return polyfill(props);
});

