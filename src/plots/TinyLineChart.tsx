import 'react'
import { TinyLine, TinyLineOptions } from '@antv/g2plot/lib/plots/tiny-line';
import createPlot from '../createPlot';

export default createPlot<TinyLineOptions>(TinyLine, 'TinyLineChart');
