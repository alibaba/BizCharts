import 'react';
import get from '@antv/util/lib/get';
import set from '@antv/util/lib/set';
import { Rose, RoseOptions as options } from '@antv/g2plot/lib/plots/rose';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions } from './core/polyfill';
import { replaceApi, replaceLegend } from './core/replaceApi';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';

const REPLACEAPILIST = [{
    sourceKey: 'colorField',
    targetKey: 'seriesField',
    notice: '请使用seriesField替代',
}, {
    sourceKey: 'categoryField',
    targetKey: 'xField',
    notice: '请使用xField替代',

}, {
    sourceKey: 'radiusField',
    targetKey: 'yField',
    notice: '请使用yFeild替代',
}];

interface RoseOptions extends options, BasePlotOptions {
    /** 请使用seriesField替代 */
    colorField?: string;
    /** 请使用xField替代 */
    categoryField?: string;
    /** 请使用yFeild替代 */
    radiusField?: string;
    legend?: LengendAPIOptions,
    tooltip?: TooltipAPIOptions,
    label?: LabelAPIOptions,
}

const polyfill = (opt: RoseOptions): RoseOptions => {
    const options = polyfillOptions(opt);
    replaceApi(REPLACEAPILIST, options);

    replaceLegend(options);

    if (get(options, 'tooltip.visible') === false) {
        set(options, 'tooltip', false);
    }

    if (get(options, 'label.visible') === false) {
        set(options, 'label', false);
    }
    return options;
}

export { RoseOptions };
export default createPlot<RoseOptions>(Rose, 'RoseChart', polyfill);
