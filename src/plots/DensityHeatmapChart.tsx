import 'react';
import { Heatmap, HeatmapOptions } from '@antv/g2plot/lib/plots/heatmap';
import { polyfillOptions, replaceApi } from './core/polyfill';
import createPlot, { BasePlotOptions } from '../createPlot';
import { set } from '@antv/util';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';

interface DensityHeatmapOptions extends HeatmapOptions, BasePlotOptions {
  /** g2Plot@1.0的api，即将废弃，请使用 `sizeRatio` 替代 */
  radius?: Record<string,any> | number;
  /** 图例 */
  legend?: LengendAPIOptions;
  /** 图表提示框 */
  tooltip?: TooltipAPIOptions;
  /** 数据标注label */
  label?: LabelAPIOptions;
}

export { DensityHeatmapOptions };

export default createPlot<DensityHeatmapOptions>(Heatmap, 'DensityHeatmapChartChart', (props) => {
  const options = polyfillOptions(props);
  replaceApi([{
    sourceKey: 'radius',
    targetKey: 'sizeRatio',
    notice: 'radius 请使用sizeRatio替代',
  }], options);
  set(options, 'type', 'density');
  return options;
});
