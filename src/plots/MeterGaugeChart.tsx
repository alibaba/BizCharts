import 'react';
import { Gauge, GaugeOptions } from '@antv/g2plot/lib/plots/gauge';
import createPlot from '../createPlot';

interface MeterGaugeOptions extends  GaugeOptions {}

export { MeterGaugeOptions };
export default createPlot<MeterGaugeOptions>(Gauge, 'MeterGaugeChart');

