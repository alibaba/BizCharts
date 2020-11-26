import 'react'
import TinyColumn, { TinyColumnOptions } from '@antv/g2plot/lib/plots/tiny-column';
import createPlot from '../createPlot';

export default createPlot<TinyColumnOptions>(TinyColumn, 'TinyColumnChart');
