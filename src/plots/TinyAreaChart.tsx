import 'react'
import { TinyArea, TinyAreaOptions as Options } from '@antv/g2plot/lib/plots/tiny-area';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions } from './core/polyfill';

type Opt = Omit<Options, 'data'>;

export interface TinyAreaOptions extends Opt, BasePlotOptions {
  data: number[] | Record<string, any>[],
  /** yField旧版g2Plot api，即将废弃请查看最新文档 */
  yField?: string,
  /** xField旧版g2Plot api，即将废弃请查看最新文档 */
  xField?: string,
}

export default createPlot<TinyAreaOptions>(TinyArea, 'TinyAreaChart', (props) => {
  const { xField, yField, data, ...options} = polyfillOptions(props);
  if (xField && yField && data) {
    options.data = data.map(it => it[yField]);
  }
  return {...options};
});
