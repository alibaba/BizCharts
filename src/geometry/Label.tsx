import { useEffect } from 'react';
// 注册 Geometry 内置的 label
import { registerGeometryLabel } from '../core';
import GeometryLabel from '@antv/g2/esm/geometry/label/base';
import IntervalLabel from '@antv/g2/esm/geometry/label/interval';
import PieLabel from '@antv/g2/esm/geometry/label/pie';
import PolarLabel from '@antv/g2/esm/geometry/label/polar';

registerGeometryLabel('base', GeometryLabel);
registerGeometryLabel('interval', IntervalLabel);
registerGeometryLabel('pie', PieLabel);
registerGeometryLabel('polar', PolarLabel);

// 注册 Geometry label 内置的布局函数
import { registerGeometryLabelLayout } from '../core';
import { distribute } from '@antv/g2/esm/geometry/label/layout/distribute';
import { limitInCanvas } from '@antv/g2/esm/geometry/label/layout/limit-in-canvas';
import { limitInShape } from '@antv/g2/esm/geometry/label/layout/limit-in-shape';
import { fixedOverlap, overlap } from '@antv/g2/esm/geometry/label/layout/overlap';

registerGeometryLabelLayout('overlap', overlap);
registerGeometryLabelLayout('distribute', distribute);
registerGeometryLabelLayout('fixed-overlap', fixedOverlap);
registerGeometryLabelLayout('limit-in-shape', limitInShape);
registerGeometryLabelLayout('limit-in-canvas', limitInCanvas);

export default function Lable(props) {
  const { geometry, fields, ...cfg } = props;
  geometry.label(false);
  geometry.label(fields.join('*', cfg));
  useEffect(() => {
    return () => {
      geometry.label(false)
    }
  })
  return null;
}
