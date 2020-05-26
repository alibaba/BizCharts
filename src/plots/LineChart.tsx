import 'react';
import Line, { LineConfig } from '@antv/g2plot/lib/plots/line';
import createPlot from '../createPlot';

export default createPlot<LineConfig>(Line, 'LineChart');
