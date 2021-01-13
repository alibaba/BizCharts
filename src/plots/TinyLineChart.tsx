import 'react'
import { TinyLine, TinyLineOptions as options } from '@antv/g2plot/lib/plots/tiny-line';
import get from '@antv/util/lib/get';
import set from '@antv/util/lib/set';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions, replaceApi } from './core/polyfill';
import { isNil } from '@antv/util';
interface TinyLineOptions extends options, BasePlotOptions {
    /** size在4.2.0即将废弃 */
    size?: number,

    data: any[],

    /** xField在4.2.0即将废弃 */
    xField?: string,

    /** yField在4.2.0即将废弃 */
    yField?: string,

    /** guideLine 在4.2.0即将废弃 */
    guideLine?: Array<object> // TODO
}

const polyfill = (opt: TinyLineOptions): TinyLineOptions => {
    const options = polyfillOptions(opt);

    if (!isNil(options.yField)) { // yField不是null/undefined
        let list = options.data
            .map(item => item[options.yField])
            .filter(val => !isNil(val))
        list && list.length && set(options, 'data', list)
    }

    const size = get(options, 'size');
    if (!isNil(size)) {
        const lineStyle = get(options, 'lineStyle', {});
        set(options, 'lineStyle', { ...lineStyle, lineWidth: size });
    }

    set(options, 'tooltip', false)

    return options;
}

export { TinyLineOptions };

export default createPlot<TinyLineOptions>(TinyLine, 'TinyLineChart', polyfill);
