import React from 'react';
// 注册 Geometry 内置的 label

import GeometryLabel from '@antv/g2/lib/geometry/label/base';
import IntervalLabel from '@antv/g2/lib/geometry/label/interval';
import PieLabel from '@antv/g2/lib/geometry/label/pie';
import PolarLabel from '@antv/g2/lib/geometry/label/polar';
// 注册 Geometry label 内置的布局函数
import { distribute } from '@antv/g2/lib/geometry/label/layout/pie/distribute';
import { limitInCanvas } from '@antv/g2/lib/geometry/label/layout/limit-in-canvas';
import { limitInShape } from '@antv/g2/lib/geometry/label/layout/limit-in-shape';
import { fixedOverlap, overlap } from '@antv/g2/lib/geometry/label/layout/overlap';

import { registerGeometryLabel, registerGeometryLabelLayout } from '../core';
import warn from 'warning';

registerGeometryLabel('base', GeometryLabel);
registerGeometryLabel('interval', IntervalLabel);
registerGeometryLabel('pie', PieLabel);
registerGeometryLabel('polar', PolarLabel);

registerGeometryLabelLayout('overlap', overlap);
registerGeometryLabelLayout('distribute', distribute);
registerGeometryLabelLayout('fixed-overlap', fixedOverlap);
registerGeometryLabelLayout('limit-in-shape', limitInShape);
registerGeometryLabelLayout('limit-in-canvas', limitInCanvas);

export default function Label(props) {
  const { parentInstance, content, ...cfg } = props;
  warn(false, 'Label组件即将被取消，请使用图形组件的label属性进行配置');
  parentInstance.label(false)
  parentInstance.label(content, cfg);
  return <></>;
}
