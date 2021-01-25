import 'react'
import { Progress, ProgressOptions as Options } from '@antv/g2plot/lib/plots/progress';
import createPlot, { BasePlotOptions } from '../createPlot';

interface ProgressOptions extends BasePlotOptions, Options {}

export { ProgressOptions }

export default createPlot<ProgressOptions>(Progress, 'ProgressChart', (opt) => {
  // value 转为data，用于placeholder统一判断
  return { data: opt.percent, color: '#5B8FF9', ...opt };
});

