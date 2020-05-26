import 'react'
import TinyColumn, { TinyColumnConfig } from '@antv/g2plot/lib/sparkline/tiny-column';
import createPlot from '../createPlot';

export default createPlot<TinyColumnConfig>(TinyColumn, 'TinyColumnChart');
