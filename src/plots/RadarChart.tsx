import 'react';
import Radar, { RadarOptions } from '@antv/g2plot/lib/plots/radar';
import createPlot from '../createPlot';

export { RadarOptions };
export default createPlot<RadarOptions>(Radar, 'RadarChart');
