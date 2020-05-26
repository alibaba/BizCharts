import 'react'
import Progress, { ProgressConfig } from '@antv/g2plot/lib/sparkline/progress';
import createPlot from '../createPlot';

export default createPlot<ProgressConfig>(Progress, 'ProgressChart');
