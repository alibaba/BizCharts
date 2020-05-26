import 'react';
import Pie, { PieConfig } from '@antv/g2plot/lib/plots/pie';
import createPlot from '../createPlot';

export default createPlot<PieConfig>(Pie, 'PieChartChart');
