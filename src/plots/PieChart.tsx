import 'react';
import { Pie, PieOptions as Options } from '@antv/g2plot/lib/plots/pie';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions } from './core/polyfill';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';

interface PieOptions extends Options, BasePlotOptions {
    tooltip?: TooltipAPIOptions,
    label?: LabelAPIOptions,
    legend?: LengendAPIOptions,
};

export { PieOptions };
export default createPlot<PieOptions>(Pie, 'PieChart', polyfillOptions);
