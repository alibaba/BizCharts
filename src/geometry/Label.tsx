import { useEffect } from 'react';
// 注册 Geometry 内置的 label

import GeometryLabel from '@antv/g2/lib/geometry/label/base';
import IntervalLabel from '@antv/g2/lib/geometry/label/interval';
import PieLabel from '@antv/g2/lib/geometry/label/pie';
import PolarLabel from '@antv/g2/lib/geometry/label/polar';
// 注册 Geometry label 内置的布局函数
import { distribute } from '@antv/g2/lib/geometry/label/layout/distribute';
import { limitInCanvas } from '@antv/g2/lib/geometry/label/layout/limit-in-canvas';
import { limitInShape } from '@antv/g2/lib/geometry/label/layout/limit-in-shape';
import { fixedOverlap, overlap } from '@antv/g2/lib/geometry/label/layout/overlap';

import { registerGeometryLabel, registerGeometryLabelLayout } from '../core';

registerGeometryLabel('base', GeometryLabel);
registerGeometryLabel('interval', IntervalLabel);
registerGeometryLabel('pie', PieLabel);
registerGeometryLabel('polar', PolarLabel);



registerGeometryLabelLayout('overlap', overlap);
registerGeometryLabelLayout('distribute', distribute);
registerGeometryLabelLayout('fixed-overlap', fixedOverlap);
registerGeometryLabelLayout('limit-in-shape', limitInShape);
registerGeometryLabelLayout('limit-in-canvas', limitInCanvas);

export default function Lable(props) {
  const { parentInstance, fields, ...cfg } = props;
  useEffect(() => {
    parentInstance.label(fields.join('*', cfg));
    return () => {
      parentInstance.label(false)
    }
  })
  return null;
}
