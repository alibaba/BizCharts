import 'react';
import Bubble, { ScatterOptions } from '@antv/g2plot/lib/plots/scatter';
import warn from 'warning';

import createPlot from '../createPlot';

interface BubbleOptions extends ScatterOptions {};

export { BubbleOptions };
export default createPlot<BubbleOptions>(Bubble, 'BubbleChart', (props) => {
  warn(true, 'Bubble 图表类型命名已变更为Scatter，请修改为<Scatter />')
  return props;
});
