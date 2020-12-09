import 'react';
import { Pie, PieOptions as options } from '@antv/g2plot/lib/plots/pie';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions } from './core/polyfill';

interface PieOptions extends options, BasePlotOptions {};

const polyfill = (opt: PieOptions): PieOptions =>
    polyfillOptions(opt);

export { PieOptions };
export default createPlot<PieOptions>(Pie, 'PieChart', polyfill);
