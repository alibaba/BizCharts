import 'react';
import { Area, AreaOptions as Options } from '@antv/g2plot/lib/plots/area';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions, polyfillVisible } from './core/polyfill';


interface AreaOptions extends Options, BasePlotOptions { };

const polyfill = (opt: AreaOptions): AreaOptions => {
  const options = polyfillOptions(opt);
  // line
  polyfillVisible(options, 'line');
  // point
  polyfillVisible(options, 'point');
  return options;
}

export { AreaOptions };
export default createPlot<AreaOptions>(Area, 'AreaChart', polyfill);
