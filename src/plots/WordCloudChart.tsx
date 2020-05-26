import 'react';
import WordCloud, { WordCloudConfig } from '@antv/g2plot/lib/plots/word-cloud';
import createPlot from '../createPlot';

export default createPlot<WordCloudConfig>(WordCloud, 'WordCloudChart');
