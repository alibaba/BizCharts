import 'react';
import Radar, { RadarConfig } from '@antv/g2plot/lib/plots/radar';
import createPlot from '../createPlot';

export default createPlot<RadarConfig>(Radar, 'RadarChart');
