import 'react';
import Liquid, { LiquidConfig } from '@antv/g2plot/lib/plots/liquid';
import createPlot from '../createPlot';

export default createPlot<LiquidConfig>(Liquid, 'LiquidChart');
