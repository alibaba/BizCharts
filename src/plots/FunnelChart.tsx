import 'react';
import Funnel, { FunnelConfig } from '@antv/g2plot/lib/plots/funnel';
import createPlot from '../createPlot';

export default createPlot<FunnelConfig>(Funnel, 'FunnelChart');
