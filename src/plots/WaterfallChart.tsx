import 'react';
import {Waterfall, WaterfallOptions as Options } from '@antv/g2plot/lib/plots/waterfall';
import createPlot, { BasePlotOptions } from '../createPlot';

interface WaterfallOptions extends Options, BasePlotOptions {

}

export default createPlot<WaterfallOptions>(Waterfall, 'WaterfallChart');
