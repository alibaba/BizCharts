import 'react';
import { Treemap, TreemapOptions as Options } from '@antv/g2plot/lib/plots/treemap';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions } from './core/polyfill';
import { get, set, isNil } from '@antv/util';
import { TooltipAPIOptions, LabelAPIOptions } from './core/interface';

import warn from 'warning';

interface TreemapOptions extends Options, BasePlotOptions {
    /** maxLevel 旧版g2Plot api，即将废弃请查看最新文档 */
    maxLevel?: number,

    tooltip?: TooltipAPIOptions,
    label?: LabelAPIOptions,
}

const formatDataByMaxlevel = (data, maxLevel, curLevel = 1) => {
    if (curLevel > maxLevel) {
        delete data.children;
    } else {
        const { children } = data;
        if (children && children.length) {
            children.forEach((it) => {
                formatDataByMaxlevel(it, maxLevel, curLevel + 1);
            });
        }
    }
};

const polyfill = (opt: TreemapOptions): TreemapOptions => {
    const options = polyfillOptions(opt);

    const maxLevel = get(options, 'maxLevel', 2);
    if (!isNil(maxLevel)) {
        if (maxLevel < 1) {
            warn(false, 'maxLevel 必须大于等于1');
        } else {
            const data = get(options, 'data', {});
            formatDataByMaxlevel(data, maxLevel)
            set(options, 'data', data);
            set(options, 'maxLevel', maxLevel);
        }
    }

    return options;
}

export { TreemapOptions };

export default createPlot<TreemapOptions>(Treemap, 'TreemapChart', polyfill);
