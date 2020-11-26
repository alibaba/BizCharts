import 'react';
import Line, { LineOptions } from '@antv/g2plot/lib/plots/line';
import createPlot from '../createPlot';
import { visibleHelper } from '../utils/plotTools';

export { LineOptions };

export default createPlot<LineOptions>(Line, 'LineChart', cfg => {
  return {
    ...cfg,
    point: visibleHelper(cfg.point, false),
  }
});
