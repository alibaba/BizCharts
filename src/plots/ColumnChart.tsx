import 'react';
import { Column, ColumnOptions as Options } from '@antv/g2plot/lib/plots/column';
import { polyfillOptions, replaceApi } from './core/polyfill';
import createPlot, { BasePlotOptions } from '../createPlot';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';
interface ColumnOptions extends Options, BasePlotOptions {
  /** 请使用seriesField替代 */
  colorField?: string;
  /** 图例 */
  legend?: LengendAPIOptions;
  /** 图表提示框 */
  tooltip?: TooltipAPIOptions;
  /** 数据标注label */
  label?: LabelAPIOptions;
}

export { ColumnOptions };
const REPLACEAPILIST = [{
  sourceKey: 'colorField',
  targetKey: 'seriesField',
  notice: 'colorField 是 g2@1.0的属性，即将废弃，请使用seriesField替代',
}];

export default createPlot<ColumnOptions>(Column, 'ColumnChart', (props) => {
  const options = polyfillOptions(props);
  replaceApi(REPLACEAPILIST, options);
  return options;
});
