import 'react';

import { Pie, PieOptions as Options } from '@antv/g2plot/lib/plots/pie';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions, polyfillVisible } from './core/polyfill';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';


interface DonutOptions extends Options, BasePlotOptions {
  /** 图例 */
  legend?: LengendAPIOptions;
  /** 图表提示框 */
  tooltip?: TooltipAPIOptions;
  /** 数据标注label */
  label?: LabelAPIOptions;
};

const polyfill = (opt: DonutOptions): DonutOptions => {
    const options = polyfillOptions(opt);

    polyfillVisible(options, 'statistic');
    polyfillVisible(options, 'statistic.title');
    polyfillVisible(options, 'statistic.content')

    // g2Plot@1 默认是 0.8 innerRadius
    return { innerRadius: 0.8, ...options };
}

export { DonutOptions };
export default createPlot<DonutOptions>(Pie, 'DonutChart', polyfill);
