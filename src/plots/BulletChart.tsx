import 'react';
import Bullet, { BulletConfig } from '@antv/g2plot/lib/plots/bullet';
import createPlot from '../createPlot';

export default createPlot<BulletConfig>(Bullet, 'BulletChart');
