import React from 'react';
import Area from './Area';
import Edge from './Edge';
import Heatmap from './Heatmap';
import Interval from './Interval';
import Line from './Line';
import Point from './Point';
import Polygon from './Polygon';

import warn from '../utils/warning';
import { IBaseGemo } from './Base';

const GEOM_MAP = {
  area: Area,
  edge: Edge,
  heatmap: Heatmap,
  interval: Interval,
  line: Line,
  point: Point,
  polygon: Polygon,
}

export interface IGemo extends IBaseGemo {
  /** 几何标记类型 */
  type: 'area'|'edge'|'heatmap'|'interval'|'line'|'point'|'polygon';
  [key: string]: any;
}

export default function(props: IGemo) {
  const { type, ...cfg } = props;
  const Geom = GEOM_MAP[type];
  return <Geom {...cfg} />;
}
