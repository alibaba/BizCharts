import 'react';
import Waterfall, { WaterfallConfig } from '@antv/g2plot/lib/plots/waterfall';
import createPlot from '../createPlot';

export default createPlot<WaterfallConfig>(Waterfall, 'WaterfallChart');
