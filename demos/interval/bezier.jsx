import React from 'react';
import { Chart, Geom, Axis, registerShape, Interaction } from '../../src';

import * as PathUtil from '@antv/g2/lib/geometry/shape/util/path';

registerShape('interval', 'bezier-interval', {
  getPoints: function(cfg) {
    const width = cfg.size;
    const x = cfg.x; // 最小值的点出现高度为0的情况

    const end = cfg.y === 0 ? 0.1 : cfg.y; // 实现层叠效果，并且多加四个控制点(1,2,4,5)来调整贝塞尔曲线的弧度

    return [
      {
        x: x - width - 0.015,
        y: cfg.y0,
      },
      {
        x: x - width + 0.005,
        y: end / 3,
      },
      {
        x: x - width + 0.025,
        y: (end * 6) / 7,
      },
      {
        x: x + 0,
        y: end,
      },
      {
        x: x + width - 0.025,
        y: (end * 6) / 7,
      },
      {
        x: x + width - 0.005,
        y: end / 3,
      },
      {
        x: x + width + 0.015,
        y: cfg.y0,
      },
    ];
  },
  draw(cfg, container) {
    const points = cfg.points;
    const constaints = [
      // 范围
      [0, 0],
      [1, 1],
    ];
    let splinePath = PathUtil.getSplinePath(points, false, constaints);
    splinePath = this.parsePath(splinePath, false);
    return container.addShape('path', {
      attrs: {
        fill: cfg.color || '#00D9DF',
        path: splinePath,
      },
    });
  },
});

const data = [
  {
    genre: '<1星',
    sold: 5,
  },
  {
    genre: '2星',
    sold: 7,
  },
  {
    genre: '3星',
    sold: 10,
  },
  {
    genre: '4星',
    sold: 8,
  },
  {
    genre: '5星',
    sold: 6,
  },
  {
    genre: '1钻',
    sold: 4,
  },
  {
    genre: '2钻',
    sold: 3,
  },
  {
    genre: '3钻',
    sold: 6.5,
  },
  {
    genre: '4钻',
    sold: 5,
  },
  {
    genre: '5钻',
    sold: 3,
  },
  {
    genre: '>1皇冠',
    sold: 4,
  },
]; // 柱状图变形

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8441',
  '#EE3B61',
  '#FF6590',
  '#9575DE',
  '#8EA4F1',
  '#C6E8D2',
  '#FFDB91',
  '#FF9054',
];
function BezierInterval() {
  return (
    <Chart height={300} source={data} forceFit padding={[50, 100, 50, 60]} data={data}>
      <Axis name="genre" tickLine={null} line={null} title={null} />
      <Axis name="sold" visible={false} />
      <Geom
        type="interval"
        position="genre*sold"
        shape="bezier-interval"
        color={['genre', COLORS]}
      ></Geom>
      <Interaction type="element-active" />
    </Chart>
  );
}
export default BezierInterval;
