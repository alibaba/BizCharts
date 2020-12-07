import 'react';
import { Pie, PieOptions as options } from '@antv/g2plot/lib/plots/pie';
import createPlot, { BasePlotOptions } from '../createPlot';

interface PieOptions extends options, BasePlotOptions {};

export { PieOptions };
export default createPlot<PieOptions>(Pie, 'PieChart');
