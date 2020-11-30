import 'react';
import { Area, AreaOptions as Options } from '@antv/g2plot/lib/plots/area';
import createPlot, { BasePlotOptions } from '../createPlot';
import get from '@antv/util/lib/get';
import set from '@antv/util/lib/set';
import { polyfillOptions } from './core/polyfill';


interface AreaOptions extends Options, BasePlotOptions { };

export const polyfill = (opt: AreaOptions): AreaOptions => {
  const options = polyfillOptions(opt);
  if (get(options, 'line.visible') === false) {
    set(options, 'line', false);
  }
  if (get(options, 'point.visible') === false) {
    set(options, 'point', false);
  }
  
  return options;
}

export { AreaOptions };
export default createPlot<AreaOptions>(Area, 'AreaChart', polyfill);
