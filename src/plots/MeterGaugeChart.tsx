import 'react';
import MeterGauge, { MeterGaugeConfig } from '@antv/g2plot/lib/plots/meter-gauge';
import createPlot from '../createPlot';

export default createPlot<MeterGaugeConfig>(MeterGauge, 'MeterGaugeChart');

