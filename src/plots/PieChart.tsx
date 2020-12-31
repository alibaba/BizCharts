import 'react';
import get from '@antv/util/lib/get';
import set from '@antv/util/lib/set';
import { Pie, PieOptions as options } from '@antv/g2plot/lib/plots/pie';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions } from './core/polyfill';
import { replaceLegend } from './core/replaceApi';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';


interface PieOptions extends options, BasePlotOptions {
    tooltip?: TooltipAPIOptions,
    label?: LabelAPIOptions,
    legend?: LengendAPIOptions,
};

const polyfill = (opt: PieOptions): PieOptions => {
    const options = polyfillOptions(opt);

    replaceLegend(options);

    if (get(options, 'tooltip.visible') === false) {
        set(options, 'tooltip', false);
    }

    if (get(options, 'label.visible') === false) {
        set(options, 'label', false);
    }

    return options;
}
export { PieOptions };
export default createPlot<PieOptions>(Pie, 'PieChart', polyfill);
