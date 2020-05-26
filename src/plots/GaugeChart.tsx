import 'react';
import Gauge, { GaugeConfig } from '@antv/g2plot/lib/plots/gauge';
import createPlot from '../createPlot';

export default createPlot<GaugeConfig>(Gauge, 'GaugeChart');
