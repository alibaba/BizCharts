import 'react'
import { TinyColumn, TinyColumnOptions as Options } from '@antv/g2plot/lib/plots/tiny-column';
import set from '@antv/util/lib/set';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions } from './core/polyfill';
import { isNil } from '@antv/util';

type Opt = Omit<Options, 'data'>;

interface TinyColumnOptions extends Opt, BasePlotOptions {
    /** colorField 旧版g2Plot api，即将废弃请查看最新文档 */
    colorField?: string,

    data: number[] | Record<string, any>[],

    /** xField 旧版g2Plot api，即将废弃请查看最新文档 */
    xField?: string,

    /** yField 旧版g2Plot api，即将废弃请查看最新文档 */
    yField?: string,

    /** guideLine 旧版g2Plot api，即将废弃请查看最新文档 */
    guideLine?: Array<object>
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
