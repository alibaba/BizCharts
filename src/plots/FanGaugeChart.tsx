import 'react';
import FanGauge, { FanGaugeConfig } from '@antv/g2plot/lib/plots/fan-gauge';
import createPlot from '../createPlot';

export default createPlot<FanGaugeConfig>(FanGauge, 'FanGaugeChart');
