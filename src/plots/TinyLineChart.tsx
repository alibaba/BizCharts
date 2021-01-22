import 'react'
import { TinyLine, TinyLineOptions as Options } from '@antv/g2plot/lib/plots/tiny-line';
import get from '@antv/util/lib/get';
import set from '@antv/util/lib/set';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions } from './core/polyfill';
import { isNil } from '@antv/util';

type Opt = Omit<Options, 'data'>;

interface TinyLineOptions extends Opt, BasePlotOptions {
    /** size 旧版g2Plot api，即将废弃请查看最新文档 */
    size?: number,

    data: number[] | Record<string, any>[],

    /** xField 旧版g2Plot api，即将废弃请查看最新文档 */
    xField?: string,

    /** yField 旧版g2Plot api，即将废弃请查看最新文档 */
    yField?: string,

    guideLine?: Array<object>
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
