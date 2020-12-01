import 'react';
import { Bar, BarOptions as options } from '@antv/g2plot/lib/plots/bar';
import { polyfillOptions } from './core/polyfill';
import createPlot, { BasePlotOptions } from '../createPlot';

interface BarOptions extends options, BasePlotOptions {}


export { BarOptions };
export default createPlot<BarOptions>(Bar, 'BarChart', polyfillOptions);
