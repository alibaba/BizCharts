import React from 'react'
import createPlot from '../createPlot';

import { default as _Progress, ProgressConfig } from '@antv/g2plot/lib/sparkline/progress';
import { default as _RingProgress, RingProgressConfig } from '@antv/g2plot/lib/sparkline/ring-progress';
import { default as _TinyColumn, TinyColumnConfig } from '@antv/g2plot/lib/sparkline/tiny-column';
import { default as _TinyArea, TinyAreaConfig } from '@antv/g2plot/lib/sparkline/tiny-area';
import { default as _TinyLine, TinyLineConfig } from '@antv/g2plot/lib/sparkline/tiny-line';

export const ColProgressumn = createPlot<ProgressConfig>(_Progress, 'ColProgressumn');
export const RingProgress = createPlot<RingProgressConfig>(_RingProgress, 'RingProgress');
export const TinyColumn = createPlot<TinyColumnConfig>(_TinyColumn, 'TinyColumn');
export const TinyArea = createPlot<TinyAreaConfig>(_TinyArea, 'TinyArea');
export const TinyLine = createPlot<TinyLineConfig>(_TinyLine, 'TinyLine');
