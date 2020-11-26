import 'react';
import Funnel, { FunnelOptions } from '@antv/g2plot/lib/plots/funnel';
import createPlot from '../createPlot';

export { FunnelOptions };
export default createPlot<FunnelOptions>(Funnel, 'FunnelChart');
