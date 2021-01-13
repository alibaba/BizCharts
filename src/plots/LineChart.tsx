import 'react';
import { Line, LineOptions as Options } from '@antv/g2plot/lib/plots/line';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions, polyfillVisible } from './core/polyfill';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';

type Opt = Omit<Options, 'point'>

interface LineOptions extends Opt, BasePlotOptions {
  legend?: LengendAPIOptions;
  tooltip?: TooltipAPIOptions;
  label?: LabelAPIOptions;
  point?: Options['point'] | boolean;
 };

export const polyfill = (opt: LineOptions): LineOptions => {
  const options = polyfillOptions(opt);
  // point
  polyfillVisible(options, 'point');
  // bizcharts 端支持 <LineChart point /> 写法
  if (options.point === true) {
    options.point = {};
  }
  return options;
}

export { LineOptions };
export default createPlot<LineOptions>(Line, 'LineChart', polyfill);
