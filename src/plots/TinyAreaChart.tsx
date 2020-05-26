import 'react'
import TinyArea, { TinyAreaConfig } from '@antv/g2plot/lib/sparkline/tiny-area';
import createPlot from '../createPlot';

export default createPlot<TinyAreaConfig>(TinyArea, 'TinyAreaChart');
