# 层叠圆角柱状图

---

# 层叠圆角柱状图

````jsx
const Shape = G2.Shape;
const Util = G2.Util;
function getFillAttrs(cfg) {
  const attrs = {
    fill: cfg.color,
    fillOpacity: cfg.opacity,
  };
  return attrs;
}
function getRectPath(points) {
  const path = [];
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (point) {
      const action = i === 0 ? 'M' : 'L';
      path.push([action, point.x, point.y]);
    }
  }
  const first = points[0];
  path.push(['L', first.x, first.y]);
  path.push(['z']);
  return path;
}
// 顶边带圆角
Shape.registShape('interval', 'top', {
  drawShape(cfg, container) {
    const points = cfg.points;
    const attrs = getFillAttrs(cfg);
    let path = getRectPath(cfg.points);
    path = this.parsePath(path); // 将 0 - 1 的值转换为画布坐标
    const radius = (path[2][1] - path[1][1]) / 2;
    const temp = [];
    temp.push(['M', path[0][1], path[0][2]]);
    temp.push(['L', path[1][1], path[1][2] + radius]);
    temp.push(['A', radius, radius, 90, 0, 1, path[1][1] + radius, path[1][2]]);
    temp.push(['L', path[2][1] - radius, path[2][2]]);
    temp.push(['A', radius, radius, 90, 0, 1, path[2][1], path[2][2] + radius]);
    temp.push(['L', path[3][1], path[3][2]]);
    temp.push(['Z']);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path: temp,
      }),
    });
  },
});
// 底边带圆角
Shape.registShape('interval', 'bottom', {
  drawShape(cfg, container) {
    const points = cfg.points;
    const attrs = getFillAttrs(cfg);
    let path = getRectPath(cfg.points);
    path = this.parsePath(path);
    const radius = (path[2][1] - path[1][1]) / 2;
    const temp = [];
    temp.push(['M', path[0][1] + radius, path[0][2]]);
    temp.push(['A', radius, radius, 90, 0, 1, path[0][1], path[0][2] - radius]);
    temp.push(['L', path[1][1], path[1][2]]);
    temp.push(['L', path[2][1], path[2][2]]);
    temp.push(['L', path[3][1], path[3][2] - radius]);
    temp.push(['A', radius, radius, 90, 0, 1, path[3][1] - radius, path[3][2]]);
    temp.push(['Z']);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path: temp,
      }),
    });
  },
});
const data = [
        { year: '2014', type: 'Sales', sales: 1000 },
        { year: '2015', type: 'Sales', sales: 1170 },
        { year: '2016', type: 'Sales', sales: 660 },
        { year: '2017', type: 'Sales', sales: 1030 },
        { year: '2014', type: 'Expenses', sales: 400 },
        { year: '2015', type: 'Expenses', sales: 460 },
        { year: '2016', type: 'Expenses', sales: 1120 },
        { year: '2017', type: 'Expenses', sales: 540 },
        { year: '2014', type: 'Profit', sales: 300 },
        { year: '2015', type: 'Profit', sales: 300 },
        { year: '2016', type: 'Profit', sales: 300 },
        { year: '2017', type: 'Profit', sales: 350 },
];
const chart = new G2.Chart({
  id: 'mountNode',
  height: 300,
  forceFit: true,
});
chart.source(data);
chart.intervalStack().position('year*sales').color('type', ['#468DF1', '#CD5744', '#EDB430'])
        .size(35)
        .shape('type', (val) => {
          if (val === 'Profit') { // 顶部圆角
            return 'top';
          } else if (val === 'Sales') { // 底部圆角
            return 'bottom';
          }
           // 其他默认
        });
chart.render();*/


import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Geom, Axis } from '@ali/bizcharts';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 }
];

const cols = {
  sold: { alias: '销售量' },
  genre: { alias: '游戏种类' }
};

ReactDOM.render((
  <Chart width={600} height={400}  data={data} scale={cols}>
    <Axis name="sold" />
    <Axis name="genre" />
    <Geom type="interval" position="genre*sold" color="genre" />
  </Chart>
), document.getElementById('mountNode'));

````