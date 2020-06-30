import 'react';
import Line, { LineConfig } from '@antv/g2plot/lib/plots/line';
import createPlot from '../createPlot';
import { visibleHelper } from '../utils/plotTools';

export default createPlot<LineConfig>(Line, 'LineChart', cfg => {
  return {
    ...cfg,
    point: visibleHelper(cfg.point, false),
  }
});
