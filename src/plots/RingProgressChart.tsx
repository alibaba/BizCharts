import 'react'
import RingProgress, {  RingProgressConfig } from '@antv/g2plot/lib/sparkline/ring-progress';
import createPlot from '../createPlot';

export default createPlot<RingProgressConfig>(RingProgress, 'RingProgressChart');
