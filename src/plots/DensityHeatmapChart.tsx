import 'react';
import { Heatmap, HeatmapOptions } from '@antv/g2plot/lib/plots/heatmap';
import { polyfillOptions, replaceApi } from './core/polyfill';
import createPlot, { BasePlotOptions } from '../createPlot';
import { set } from '@antv/util';

interface DensityHeatmapOptions extends HeatmapOptions, BasePlotOptions {
  /** g2Plot@1.0的api，即将废弃，请使用 `sizeRatio` 替代 */
  radius?: Record<string,any> | number;
}

export { DensityHeatmapOptions };

export default createPlot<DensityHeatmapOptions>(Heatmap, 'DensityHeatmapChartChart', (props) => {
  const options = polyfillOptions(props);
  replaceApi([{
    sourceKey: 'radius',
    targetKey: 'sizeRatio',
    notice: '请使用sizeRatio替代',
  }], options);
  set(options, 'type', 'density');
  return options;
});
