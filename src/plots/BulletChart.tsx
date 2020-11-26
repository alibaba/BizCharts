import 'react';
import Bullet, { BulletOptions } from '@antv/g2plot/lib/plots/bullet';
import createPlot from '../createPlot';

export { BulletOptions };
export default createPlot<BulletOptions>(Bullet, 'BulletChart');
