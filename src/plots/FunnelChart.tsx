import 'react';
import { Funnel, FunnelOptions as Options } from '@antv/g2plot/lib/plots/funnel';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions, replaceApi } from './core/polyfill';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';


interface FunnelOptions extends Options,BasePlotOptions {
  /** g2Plot@1.0的api，即将废弃，请使用isTransposed替代 */
  transpose?: boolean;
  legend?: LengendAPIOptions;
  tooltip?: TooltipAPIOptions;
  label?: LabelAPIOptions;
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
