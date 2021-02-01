import 'react';
import { Liquid, LiquidOptions as Options } from '@antv/g2plot/lib/plots/liquid';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions, polyfillVisible } from './core/polyfill';
import { get, isNil, deepMix, isFunction } from '@antv/util';

type Opt = Omit<Options, 'percent'>;

interface LiquidOptions extends Opt, BasePlotOptions {
  /** 最小值，默认为0 */
  min?: number;
  /** 最小值，默认为1 */
  max?: number;
  /** value, 如果不是百分比的数据，使用旧版value的方式, 配合max最大值使用 */
  value?: number;
  /** 数据，百分比 */
  percent?: number;
}

export { LiquidOptions };
export default createPlot<LiquidOptions>(Liquid, 'LiquidChart', (opt) => {
  const { range, min = 0, max = 1, value, ...options } = polyfillOptions(opt);

  if (!isNil(value)) {
    // 旧版数据使用方式
    options.percent = value / (max - min);
    const formatter = get(options, 'statistic.content.formatter');
    if (options.statistic !== null && options.statistic !== false) {
      deepMix(options, {
        statistic: {
          content: {
            formatter: () => {
              if (isFunction(formatter)) {
                formatter(value)
              }
              return value;
            }
          }
        }
      });
    }
  }

  polyfillVisible(options, 'statistic');
  polyfillVisible(options, 'statistic.title');
  polyfillVisible(options, 'statistic.content');

  // value 转为data，用于placeholder统一判断
  const data = options.percent;
  return { data, ...options };
});
