import 'react';
import StepLine, { StepLineConfig } from '@antv/g2plot/lib/plots/step-line';
import createPlot from '../createPlot';


export default createPlot<StepLineConfig>(StepLine, 'StepLineChart');
