import 'react';
import Donut, { PieOptions } from '@antv/g2plot/lib/plots/pie';
import createPlot from '../createPlot';

interface DonutOptions extends PieOptions {}

export { DonutOptions };
export default createPlot<DonutOptions>(Donut, 'DonutChart');
