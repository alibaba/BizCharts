import 'react';
import { Line, LineOptions as Options } from '@antv/g2plot/lib/plots/line';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions, polyfillVisible } from './core/polyfill';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';

interface LineOptions extends Options, BasePlotOptions {
  legend?: LengendAPIOptions;
  tooltip?: TooltipAPIOptions;
  label?: LabelAPIOptions;
 };

const polyfill = (opt: LineOptions): LineOptions => {
  const options = polyfillOptions(opt);
  // point
  polyfillVisible(options, 'point');
  return options;
}

export { LineOptions };
export default createPlot<LineOptions>(Line, 'LineChart', polyfill);
