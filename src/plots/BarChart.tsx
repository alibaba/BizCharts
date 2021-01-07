import 'react';
import warn from 'warning';
import get from '@antv/util/lib/get';
import set from '@antv/util/lib/set';
import { Bar, BarOptions as options } from '@antv/g2plot/lib/plots/bar';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions } from './core/polyfill';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';
import { isNil } from '@antv/util';

interface BarOptions extends options, BasePlotOptions {
  /** 请使用seriesField替代 */
  colorField?: any;
  legend?: LengendAPIOptions;
  tooltip?: TooltipAPIOptions;
  label?: LabelAPIOptions;
  /** 条形的宽度，如设置该属性值，则宽度固定不自动调整 */
  barSize?: number;
}

const polyfill = (opt: BarOptions): BarOptions => {
  const { barSize, ...options } = polyfillOptions(opt);
  if (get(options, 'colorField')) {
    warn(true, '请使用seriesField替代');
    set(options, 'seriesField', get(options, 'colorField'));
  }
  if (isNil(barSize)) {
    options.minBarWidth = barSize;
    options.maxBarWidth = barSize;
  }
  return options;
}

export { BarOptions };
export default createPlot<BarOptions>(Bar, 'BarChart', polyfill);
