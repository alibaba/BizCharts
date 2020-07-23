import 'react'
import Progress, { ProgressConfig } from '@antv/g2plot/lib/sparkline/progress';
import createPlot from '../createPlot';

export default createPlot<ProgressConfig>(Progress, 'ProgressChart', (opt) => {
  // value 转为data，用于placeholder统一判断
  return { data: opt.percent, ...opt };
});
