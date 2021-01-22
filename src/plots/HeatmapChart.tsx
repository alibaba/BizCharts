import 'react';
import { Heatmap, HeatmapOptions as Options } from '@antv/g2plot/lib/plots/heatmap';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions } from './core/polyfill';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';
import { warn } from 'warning';

interface HeatmapOptions extends Options,BasePlotOptions {
  /** 图例 */
  legend?: LengendAPIOptions;
  /** 图表提示框 */
  tooltip?: TooltipAPIOptions;
  /** 数据标注label */
  label?: LabelAPIOptions;
  /** 该属性是g2plot@1.0的属性，即将废弃，请使用 `heatmapStyle` 替代 */
  shapeType?: any;
}

export { HeatmapOptions };
export default createPlot<HeatmapOptions>(Heatmap, 'HeatmapChart', (props) => {
  const { shapeType, ...options } = polyfillOptions(props);
  if (shapeType) {
    options.heatmapStyle = shapeType;
    warn(false, 'shapeType是g2plot@1.0的属性，即将废弃，请使用 `heatmapStyle` 替代')
  }
  // shape 没有指定，但配置了sizeField
  if (!options.shape && options.sizeField) {
    options.shape = "square";
  }

  return options;
});
