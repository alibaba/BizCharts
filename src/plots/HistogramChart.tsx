import 'react';
import Histogram, { HistogramConfig } from '@antv/g2plot/lib/plots/histogram';
import createPlot from '../createPlot';

export default createPlot<HistogramConfig>(Histogram, 'HistogramChart');
