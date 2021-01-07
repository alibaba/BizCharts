import 'react';
import { Funnel, FunnelOptions as Options } from '@antv/g2plot/lib/plots/funnel';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions, replaceApi } from './core/polyfill';

interface FunnelOptions extends Options,BasePlotOptions {
  /** g2Plot@1.0的api，即将废弃，请使用isTransposed替代 */
  transpose?: boolean;
}

export { FunnelOptions };
export default createPlot<FunnelOptions>(Funnel, 'FunnelChart', (props) => {
  const options = polyfillOptions(props);
  replaceApi([{
    sourceKey: 'transpose',
    targetKey: 'isTransposed',
    notice: '请使用isTransposed替代',
  }], options);
  return options;
});
