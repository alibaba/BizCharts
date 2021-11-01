import 'react';
import { DualAxes, DualAxes as Options } from '@antv/g2plot/lib/plots/dual-axes';
import createPlot, { BasePlotOptions } from '../createPlot';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';

interface DualAxesOptions extends Options, BasePlotOptions {
  /** 图例 */
  legend?: LengendAPIOptions;
  /** 图表提示框 */
  tooltip?: TooltipAPIOptions;
  /** 数据标注label */
  label?: LabelAPIOptions;
}
// 直方图
export { DualAxesOptions };
export default createPlot<DualAxesOptions>(DualAxes, 'DualAxesChart');
