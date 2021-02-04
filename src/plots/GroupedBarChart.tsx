import 'react';
import { Bar, BarOptions as Options } from '@antv/g2plot/lib/plots/bar';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions, replaceApi } from './core/polyfill';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';
import { isNil } from '@antv/util';
import warn from 'warning';
import { deepMix } from '@antv/util';

interface GroupedBarOptions extends Options, BasePlotOptions {
  /** 图例 */
  legend?: LengendAPIOptions;
  /** 图表提示框 */
  tooltip?: TooltipAPIOptions;
  /** 数据标注label */
  label?: LabelAPIOptions;
  /** 条形的宽度，如设置该属性值，则宽度固定不自动调整 */
  barSize?: number;
}
const REPLACEAPILIST = [{
  sourceKey: 'colorField',
  targetKey: 'seriesField',
  notice: 'colorField 是 g2@1.0的属性，即将废弃，请使用seriesField替代',
}];

export { GroupedBarOptions };
export default createPlot<GroupedBarOptions>(Bar, 'GroupedBarChart', (props) => {
  warn(false, '<GroupedBarChart /> 在5.0后即将被废弃，请使用<BarChart /> 替代');
  const { barSize, ...options } = polyfillOptions(props);
  replaceApi(REPLACEAPILIST, options);
  if (!isNil(barSize)) {
    options.minBarWidth = barSize;
    options.maxBarWidth = barSize;
  }
  deepMix(props, {
    isGroup: true,
  });
  return options;
});
