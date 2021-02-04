import 'react';
import { Scatter, ScatterOptions as Options } from '@antv/g2plot/lib/plots/scatter';
import warn from 'warning';
import get from '@antv/util/lib/get';
import set from '@antv/util/lib/set';
import isNil from '@antv/util/lib/is-nil';
import { polyfillOptions } from './core/polyfill';
import createPlot, { BasePlotOptions } from '../createPlot';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';

interface BubbleOptions extends Options, BasePlotOptions {
  /** 该属性已废弃，请使用size替代 */
  pointSize?: any;
  /** 
   * 该属性已废弃，请使用regressionLine替代,
   * 文档查看：https://g2plot.antv.vision/zh/examples/scatter/basic/#regressionLine
   */
  trendLine?: any;
  legend?: LengendAPIOptions;
  tooltip?: TooltipAPIOptions;
  label?: LabelAPIOptions;
};

export { BubbleOptions };
// 气泡图, 与散点图合并
export default createPlot<BubbleOptions>(Scatter, 'BubbleChart', (props) => {
  const options = polyfillOptions(props);
  if (!isNil(get(options, 'pointSize'))) {
    set(options, 'size', get(options, 'pointSize'));
  }
  warn(false, 'BubbleChart 图表类型命名已变更为Scatter，请修改为<ScatterChart />')
  return options;
});
