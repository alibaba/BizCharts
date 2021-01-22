import * as antUtils from '@antv/util';
import * as Annotation from './components/Annotation';
import * as G2 from './g2-all';
import * as GComponents from './g-components';

import * as bxUtil from './utils';

export const Util = {
  ...antUtils,
  ...bxUtil,
  ...G2.Util,
}

// 基础组件
export { Annotation, G2, GComponents };
export { default as Chart } from './components/Chart';
export { default as View } from './components/View';
export { default as Tooltip } from './components/Tooltip';
export { default as Legend } from './components/Legend';
export { default as Coordinate } from './components/Coordinate';
export { default as Axis } from './components/Axis';
export { default as Facet } from './components/Facet';
export { default as Slider } from './components/Slider';

// geometry
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
export { default as LineAdvance } from './geometry/LineAdvance';

// 通用 geometry
export { default as Geom } from './geometry';

// 兼容
export { default as Coord } from './components/Coordinate/coord';
export { default as Guide } from './adapter/Guide';

// 工具
export { default as Effects } from './components/Effects';
export { default as Interaction } from './components/Interaction';
export { default as createPlot } from './createPlot';
export { default as createTooltipConnector } from './connector/createTooltipConnector';

// hooks
export { default as useView } from './hooks/useChartView';
// fixme: 更名，在5.0后正式更名为 useChartInstance
export { default as useRootChart } from './hooks/useChartInstance';
// 正确写法
export { default as useChartInstance } from './hooks/useChartInstance';
export { default as useTheme } from './hooks/useTheme';
export { withView } from './context/view';
export { withChartInstance } from './context/root';


// 注册主题
export * from './core';

// 基于 g2-plots 基础图表
export * from './plots';

// g-components

