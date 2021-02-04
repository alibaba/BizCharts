import 'react';
import { Bar, BarOptions as Options } from '@antv/g2plot/lib/plots/bar';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions, replaceApi } from './core/polyfill';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';
import { isNil } from '@antv/util';

interface BarOptions extends Options, BasePlotOptions {
  /** 请使用seriesField替代 */
  colorField?: any;
  /** 图例 */
  legend?: LengendAPIOptions;
  /** 图表提示框 */
  tooltip?: TooltipAPIOptions;
  /** 数据标注label */
  label?: LabelAPIOptions;
  /** 条形的宽度，如设置该属性值，则宽度固定不自动调整 */
  barSize?: number;
  /** 旧版api，即将废弃 请使用seriesField替代 */
  stackField?: string;
}

export const polyfill = (opt: BarOptions): BarOptions => {
  const { barSize, ...options } = polyfillOptions(opt);

  replaceApi([{
    sourceKey: 'stackField',
    targetKey: 'seriesField',
    notice: 'stackField是旧版API，即将废弃 请使用seriesField替代',
  }, {
    sourceKey: 'colorField',
    targetKey: 'seriesField',
    notice: 'colorField是旧版API，即将废弃 请使用seriesField替代',
  }], options);

  if (!isNil(barSize)) {
    options.minBarWidth = barSize;
    options.maxBarWidth = barSize;
  }
  return options;
}

export { BarOptions };
export default createPlot<BarOptions>(Bar, 'BarChart', polyfill);
