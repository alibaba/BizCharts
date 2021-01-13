import 'react'
import { TinyColumn, TinyColumnOptions as options } from '@antv/g2plot/lib/plots/tiny-column';
import set from '@antv/util/lib/set';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions } from './core/polyfill';
import { isNil } from '@antv/util';
interface TinyColumnOptions extends options, BasePlotOptions {
    /** colorField在4.2.0即将废弃 */
    colorField?: string,

    data: any[],

    /** xField在4.2.0即将废弃 */
    xField?: string,

    /** yField在4.2.0即将废弃 */
    yField?: string,

    /** guideLine 在4.2.0即将废弃 */
    guideLine?: Array<object> // TODO
}

const polyfill = (opt: TinyColumnOptions): TinyColumnOptions => {
    const options = polyfillOptions(opt);

    if (!isNil(options.yField)) { // yField不是null/undefined
        let list = options.data
            .map(item => item[options.yField])
            .filter(val => !isNil(val))
        list && list.length && set(options, 'data', list)
    }

    set(options, 'tooltip', false)

    return options;
}

export { TinyColumnOptions };

export default createPlot<TinyColumnOptions>(TinyColumn, 'TinyColumnChart', polyfill);
