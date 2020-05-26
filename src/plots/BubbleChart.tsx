import 'react';
import Bubble, { BubbleConfig } from '@antv/g2plot/lib/plots/bubble';

import createPlot from '../createPlot';

export default createPlot<BubbleConfig>(Bubble, 'BubbleChart');
