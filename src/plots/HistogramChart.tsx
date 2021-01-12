import 'react';
import { Histogram, HistogramOptions as Options } from '@antv/g2plot/lib/plots/histogram';
import createPlot, { BasePlotOptions } from '../createPlot';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';

interface HistogramOptions extends Options, BasePlotOptions {
  /** 图例 */
  legend?: LengendAPIOptions;
  /** 图表提示框 */
  tooltip?: TooltipAPIOptions;
  /** 数据标注label */
  label?: LabelAPIOptions;
}
// 直方图
export { HistogramOptions };
export default createPlot<HistogramOptions>(Histogram, 'HistogramChart');
