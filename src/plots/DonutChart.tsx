import 'react';

import { Pie, PieOptions as options } from '@antv/g2plot/lib/plots/pie';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions } from './core/polyfill';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';

interface DonutOptions extends options, BasePlotOptions {
    tooltip?: TooltipAPIOptions,
    label?: LabelAPIOptions,
    legend?: LengendAPIOptions,
};

const polyfill = (opt: DonutOptions): DonutOptions => {
    const options = polyfillOptions(opt);

    // g2Plot@1 默认是 0.8 innerRadius
    return { innerRadius: 0.8, ...options };
}

export { DonutOptions };
export default createPlot<DonutOptions>(Pie, 'DonutChart', polyfill);
