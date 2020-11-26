import 'react';
import Pie, { PieOptions } from '@antv/g2plot/lib/plots/pie';
import createPlot from '../createPlot';

export { PieOptions };
export default createPlot<PieOptions>(Pie, 'PieChart');
