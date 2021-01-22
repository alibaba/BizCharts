import React from 'react';
import Area from './Area';
import Edge from './Edge';
import Heatmap from './Heatmap';
import Interval from './Interval';
import Line from './Line';
import Point from './Point';
import Polygon from './Polygon';
import LineAdvance from './LineAdvance';
import warn from 'warning';

import { IBaseGemoProps } from './Base';

const GEOM_MAP = {
  area: Area,
  edge: Edge,
  heatmap: Heatmap,
  interval: Interval,
  line: Line,
  point: Point,
  polygon: Polygon,
  // bx 做了预设的图形
  'line-advance': LineAdvance,
}

export interface IGemo extends IBaseGemoProps {
  /** 几何标记类型 */
  type: 'area'|'edge'|'heatmap'|'interval'|'line'|'point'|'polygon'|'line-advance';
  [key: string]: any;
}

export default function(props: IGemo) {
  const { type, ...cfg } = props;
  const Geom = GEOM_MAP[type];
  if (Geom) return <Geom {...cfg} />;
  warn(false, 'Only support the below type: area|edge|heatmap|interval|line|point|polygon|line-advance');
  return null;
}
