import * as G2 from './g2-all';
import * as Util from '@antv/util';
import * as Annotation from './components/Annotation';


export { Annotation, G2, Util };
export { default as Chart } from './components/Chart';
export { default as View } from './components/View';

export { default as Tooltip } from './components/Tooltip';
export { default as Legend } from './components/Legend';
export { default as Coordinate } from './components/Coordinate';
export { default as Axis } from './components/Axis';
export { default as Facet } from './components/Facet';
export { default as Slider } from './components/Slider';

export { default as Area } from './geometry/Area';
export { default as Edge } from './geometry/Edge';
export { default as Heatmap } from './geometry/Heatmap';
export { default as Interval } from './geometry/Interval';
export { default as Line } from './geometry/Line';
export { default as Point } from './geometry/Point';
export { default as Polygon } from './geometry/Polygon';
export { default as Schema } from './geometry/Schema';
export { default as BaseGeom } from './geometry/Base';
export { default as Label } from './geometry/Label';
export { default as Path } from './geometry/Path';

export { default as Geom } from './geometry';

// 兼容
export { default as Coord } from './components/Coordinate/coord';
export { default as Effects } from './components/Effects';
export { default as Interaction } from './components/Interaction';
export { default as createPlot } from './createPlot';
export { default as useView } from './hooks/useChartView';
export { default as useRootChart } from './hooks/useChartInstance';
export { default as useTheme } from './hooks/useTheme';

export { withView } from './context/view';
export { withChartInstance } from './context/root';

// 注册主题
export { getTheme, registerTheme } from '@antv/g2/lib/theme';

export * from './core';

export { default as Guide } from './adapter/Guide';

export const version = process.env.__VERSION__;
