import 'react';
import Histogram, { HistogramOptions } from '@antv/g2plot/lib/plots/histogram';
import createPlot from '../createPlot';

export { HistogramOptions };
export default createPlot<HistogramOptions>(Histogram, 'HistogramChart');
