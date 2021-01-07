import 'react';
import { Column, ColumnOptions as Options } from '@antv/g2plot/lib/plots/column';
import { polyfillOptions, replaceApi } from './core/polyfill';
import createPlot, { BasePlotOptions } from '../createPlot';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';
interface ColumnOptions extends Options, BasePlotOptions {
  /** 请使用seriesField替代 */
  colorField?: string;
  legend?: LengendAPIOptions;
  tooltip?: TooltipAPIOptions;
  label?: LabelAPIOptions;
}

export { ColumnOptions };
const REPLACEAPILIST = [{
  sourceKey: 'colorField',
  targetKey: 'seriesField',
  notice: '请使用seriesField替代',
}];

export default createPlot<ColumnOptions>(Column, 'ColumnChart', (props) => {
  const options = polyfillOptions(props);
  replaceApi(REPLACEAPILIST, options);
  return options;
});
