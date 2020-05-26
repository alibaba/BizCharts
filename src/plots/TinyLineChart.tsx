import 'react'
import TinyLine, { TinyLineConfig } from '@antv/g2plot/lib/sparkline/tiny-line';
import createPlot from '../createPlot';

export default createPlot<TinyLineConfig>(TinyLine, 'TinyLineChart');
