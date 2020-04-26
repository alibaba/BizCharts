import React from 'react';
import Area from './Area';
import Edge from './Edge';
import Heatmap from './Heatmap';
import Interval from './Interval';
import Line from './Line';
import Point from './Point';
import Polygon from './Polygon';

import warn from '../utils/warning';

const GEOM_MAP = {
  area: Area,
  edge: Edge,
  heatmap: Heatmap,
  interval: Interval,
  line: Line,
  point: Point,
  polygon: Polygon,
}

export interface IGemo {
  [key: string]: any
}

export default function(props) {
  const { type, ...cfg } = props;
  const Geom = GEOM_MAP[type];
  return <Geom {...cfg} />;
}
