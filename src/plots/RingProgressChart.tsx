import 'react'
import { RingProgress, RingProgressOptions as Options } from '@antv/g2plot/lib/plots/ring-progress';
import createPlot, { BasePlotOptions } from '../createPlot';

interface RingProgressOptions extends BasePlotOptions, Options {}

export { RingProgressOptions }
export default createPlot<RingProgressOptions>(RingProgress, 'RingProgressChart', (opt) => {
  // value 转为data，用于placeholder统一判断
  return { data: opt.percent, color: '#5B8FF9', ...opt };
});

