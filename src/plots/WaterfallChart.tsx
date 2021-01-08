import 'react';
import {Waterfall, WaterfallOptions } from '@antv/g2plot/lib/plots/waterfall';
import createPlot from '../createPlot';

export default createPlot<WaterfallOptions>(Waterfall, 'WaterfallChart');
