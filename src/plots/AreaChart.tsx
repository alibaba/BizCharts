import 'react';
import { Area, AreaOptions as Options } from '@antv/g2plot/lib/plots/area';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions, polyfillVisible, replaceApi } from './core/polyfill';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';

interface AreaOptions extends Options, BasePlotOptions {
  legend?: LengendAPIOptions;
  tooltip?: TooltipAPIOptions;
  label?: LabelAPIOptions;
  /** 旧版api，即将废弃 请使用seriesField替代 */
  stackField?: string;
 };

export const polyfill = (opt: AreaOptions): AreaOptions => {
  const options = polyfillOptions(opt);
  // line
  polyfillVisible(options, 'line');
  // point
  polyfillVisible(options, 'point');

  replaceApi([{
    sourceKey: 'stackField',
    targetKey: 'seriesField',
    notice: 'stackField是旧版api，即将废弃 请使用seriesField替代',
  }], options);

  return options;
}

export { AreaOptions };
export default createPlot<AreaOptions>(Area, 'AreaChart', polyfill);
