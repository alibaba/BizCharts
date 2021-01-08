import 'react';
import { Bar, BarOptions as Options } from '@antv/g2plot/lib/plots/bar';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions, replaceApi } from './core/polyfill';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';
import { isNil } from '@antv/util';
import warn from 'warning';

interface GroupedBarOptions extends Options, BasePlotOptions {
  legend?: LengendAPIOptions;
  tooltip?: TooltipAPIOptions;
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
  warn(true, '<GroupedBarChart /> 在4.2.0后即将被废弃，请使用<BarChart /> 替代');
  const { barSize, ...options } = polyfillOptions(props);
  replaceApi(REPLACEAPILIST, options);
  if (!isNil(barSize)) {
    options.minBarWidth = barSize;
    options.maxBarWidth = barSize;
  }
  return options;
});
