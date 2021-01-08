import 'react';
import { Heatmap, HeatmapOptions as Options } from '@antv/g2plot/lib/plots/heatmap';
import createPlot, { BasePlotOptions } from '../createPlot';
import { polyfillOptions, replaceApi } from './core/polyfill';
import { LengendAPIOptions, TooltipAPIOptions, LabelAPIOptions } from './core/interface';
import { isNil, isObject } from '@antv/util';
import { warn } from 'warning';

interface HeatmapOptions extends Options,BasePlotOptions {
  legend?: LengendAPIOptions;
  tooltip?: TooltipAPIOptions;
  label?: LabelAPIOptions;
  /** 该属性是g2plot@1.0的属性，即将废弃，请使用 `heatmapStyle` 替代 */
  shapeType?: any;
}

export { HeatmapOptions };
export default createPlot<HeatmapOptions>(Heatmap, 'HeatmapChart', (props) => {
  const { colorField, shapeSize, shapeType, ...options } = polyfillOptions(props);
  if (shapeType) {
    options.heatmapStyle = shapeType;
    warn(true, 'shapeType是g2plot@1.0的属性，即将废弃，请使用 `heatmapStyle` 替代')
  }
  return options;
});
