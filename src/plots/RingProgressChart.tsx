import 'react'
import RingProgress, {  RingProgressConfig } from '@antv/g2plot/lib/sparkline/ring-progress';
import createPlot from '../createPlot';

export default createPlot<RingProgressConfig>(RingProgress, 'RingProgressChart', (opt) => {
  // value 转为data，用于placeholder统一判断
  return { data: opt.percent, ...opt };
});
