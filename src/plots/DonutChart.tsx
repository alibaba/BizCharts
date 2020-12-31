import 'react';
import get from '@antv/util/lib/get';
import set from '@antv/util/lib/set';
import { Pie, PieOptions as options } from '@antv/g2plot/lib/plots/pie';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions } from './core/polyfill';
import { replaceLegend } from './core/replaceApi';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';

interface DonutOptions extends options, BasePlotOptions {
    tooltip?: TooltipAPIOptions,
    label?: LabelAPIOptions,
    legend?: LengendAPIOptions,
};

const polyfill = (opt: DonutOptions): DonutOptions => {
    const options = polyfillOptions(opt);

    replaceLegend(options);

    if (get(options, 'tooltip.visible') === false) {
        set(options, 'tooltip', false);
    }

    if (get(options, 'label.visible') === false) {
        set(options, 'label', false);
    }

    return { innerRadius: 0.8, ...options };
}

export { DonutOptions };
export default createPlot<DonutOptions>(Pie, 'DonutChart', polyfill);
