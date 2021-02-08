import 'react';
import { Column, ColumnOptions as Options } from '@antv/g2plot/lib/plots/column';
import { polyfillOptions, replaceApi } from './core/polyfill';
import createPlot, { BasePlotOptions } from '../createPlot';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';
import { isNil } from '@antv/util';

interface ColumnOptions extends Options, BasePlotOptions {
  /** 请使用seriesField替代 */
  colorField?: string;
  /** 图例 */
  legend?: LengendAPIOptions;
  /** 图表提示框 */
  tooltip?: TooltipAPIOptions;
  /** 数据标注label */
  label?: LabelAPIOptions;
  /** 旧版api，即将废弃 请使用seriesField替代 */
  stackField?: string;
}

export { ColumnOptions };
const REPLACEAPILIST = [{
  sourceKey: 'colorField',
  targetKey: 'seriesField',
  notice: 'colorField 是 g2@1.0的属性，即将废弃，请使用seriesField替代',
}, {
  sourceKey: 'stackField',
  targetKey: 'seriesField',
  notice: 'colorField是旧版API，即将废弃 请使用seriesField替代',
}];

export const polyfill = (props) => {
  const { columnSize, ...options } = polyfillOptions(props);
  replaceApi(REPLACEAPILIST, options);
  if (!isNil(columnSize)) {
    options.minColumnWidth = columnSize;
    options.maxColumnWidth = columnSize;
  }
  return options;
};

export default createPlot<ColumnOptions>(Column, 'ColumnChart', polyfill);
