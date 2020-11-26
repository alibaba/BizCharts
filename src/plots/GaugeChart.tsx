import 'react';
import Gauge, { GaugeOptions } from '@antv/g2plot/lib/plots/gauge';
import createPlot from '../createPlot';

export { GaugeOptions };
export default createPlot<GaugeOptions>(Gauge, 'GaugeChart', (opt) => {
  // value 转为data，用于placeholder统一判断
  return { data: opt.value, ...opt };
});
