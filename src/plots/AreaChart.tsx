import 'react';
import { Area, AreaOptions as Options } from '@antv/g2plot/lib/plots/area';
import createPlot, { BasePlotOptions } from '../createPlot';

interface AreaOptions extends Options, BasePlotOptions {};

export { AreaOptions };
export default createPlot<AreaOptions>(Area, 'AreaChart');
