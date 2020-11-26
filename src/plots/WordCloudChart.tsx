import 'react';
import WordCloud, { WordCloudOptions } from '@antv/g2plot/lib/plots/word-cloud';
import createPlot from '../createPlot';

export default createPlot<WordCloudOptions>(WordCloud, 'WordCloudChart');
