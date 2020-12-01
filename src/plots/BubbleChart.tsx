import 'react';
import { Scatter, ScatterOptions as options } from '@antv/g2plot/lib/plots/scatter';
import warn from 'warning';
import { polyfillOptions } from './core/polyfill';
import createPlot, { BasePlotOptions } from '../createPlot';

interface BubbleOptions extends options, BasePlotOptions {};

export { BubbleOptions };
// 气泡图, 与散点图合并
export default createPlot<BubbleOptions>(Scatter, 'BubbleChart', (props) => {
  const options = polyfillOptions(props);
  warn(true, 'BubbleChart 图表类型命名已变更为Scatter，请修改为<ScatterChart />')
  return options;
});
