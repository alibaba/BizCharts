import 'react'
import { TinyArea, TinyAreaOptions } from '@antv/g2plot/lib/plots/tiny-area';
import createPlot from '../createPlot';

export default createPlot<TinyAreaOptions>(TinyArea, 'TinyAreaChart');
