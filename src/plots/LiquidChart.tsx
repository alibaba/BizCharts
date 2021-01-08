import 'react';
import {Liquid, LiquidOptions } from '@antv/g2plot/lib/plots/liquid';
import createPlot from '../createPlot';

export { LiquidOptions };
export default createPlot<LiquidOptions>(Liquid, 'LiquidChart', (opt) => {
  // value 转为data，用于placeholder统一判断
  return { data: opt.value, ...opt };
});
