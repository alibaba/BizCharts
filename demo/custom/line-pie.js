# 分片饼图

---

# 分片饼图

````jsx

import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Coord, Geom, Tooltip, Legend,  Shape, Frame } from '@ali/bizcharts@ 3.0.0-rc3 ';
import DataSet from '@antv/data-set';


const data = [
  { sex: '男', sold: 0.45 },
  { sex: '女', sold: 0.55 },
  { sex: '其他', sold: 0.1 }
];

const ds = new DataSet();
const dv = ds.createView('tt');
dv.source(data);
dv.transform({
  type:'percent',
  field:'sold',
  dimension:'sex',
  as:'percent',
});

const COLORS = ['#00D9DF', '#EBA538', '#999'];
// 第一段标签线的长度
const LABELLINE_1 = 0.5;
// 第二段标签线的长度
const LABELLINE_2 = 50;

// 自定义labelline
Shape.registerShape('interval', 'labelLine', {
  getShapePoints: function(cfg) {
    const width = cfg.size;
    const x = cfg.x;
    const min = cfg.y[0];
    const max = cfg.y[1];

    return [
      {x: x - width / 2, y: min},
      {x: x - width / 2, y: max},
      {x: x + width / 2, y: max},
      {x: x + width / 2, y: min},
      {x: -1, y: 0.25},
      {x: x + width / 2 + 0.1, y: (min + max)/2},
			{x: x + width / 2 + LABELLINE_1, y: (min + max)/2 + 1}
    ];
  },
  drawShape(cfg, container) {
    // 将归一化后的数据转换为画布上的坐标
    const points = cfg.origin.points;
    let path = [];
    path.push(['M', points[0].x, points[0].y]);
    path.push(['L', points[1].x, points[1].y]);
    path.push(['L', points[2].x, points[2].y]);
    path.push(['L', points[3].x, points[3].y]);
    path.push(['L', points[0].x, points[0].y]);
    path.push(['z']);
    path = this.parsePath(path, true);
    
    var rect = container.addShape('path', {
      attrs: {
        fill: cfg.color || '#00D9DF',
        path: path
      }
    });
    
    // 标签线开始绘制的点
    const midPoint = this.parsePoint(points[5]);
    const cornerP = this.parsePoint(points[6]);
    // 饼图中心点
    const center = this.parsePoint(points[4]);

    // 下面开始绘制标签线，用path的方式进行绘制
    container.addShape('line', {
      attrs: {
        x1: midPoint.x,
        y1: midPoint.y,
        x2: cornerP.x,
        y2: cornerP.y,
        stroke: cfg.color || 'red'
      }
    });
    container.addShape('line', {
      attrs: {
        x1: cornerP.x,
        y1: cornerP.y,
        x2: midPoint.x >= center.x ? cornerP.x + LABELLINE_2 : cornerP.x - LABELLINE_2,
        y2: cornerP.y,
        stroke: cfg.color || 'red'
      }
    });
        // 标签线顶部的小圆点
    container.addShape('circle', {
      attrs: {
        x: midPoint.x,
        y: midPoint.y,
        fill: cfg.color || 'red',
        radius: 4
      }
    });

    // 显示文案在这里设置
    const originObj = cfg.origin._origin;
		const str = originObj.sex + ': ' + originObj.sold;
    console.log(str);
    container.addShape('text', {
      attrs: {
        x: midPoint.x >= center.x ? cornerP.x + LABELLINE_2 : cornerP.x - LABELLINE_2,
        y: cornerP.y,
        text: str, // 修改文本对应的字段
        fill: '#999', // 修改文本的颜色
        textAlign: 'center'          
      }    
    });
    return rect;
  }
});

ReactDOM.render((
  <Chart height={400} width={500} data={dv}>
    <Coord type="theta" radius={0.8} innerRadius={0.5} />
    <Geom
      type="intervalStack"
      shape="labelLine"
      position={'percent'}
      color={['sex', COLORS]}
      />
  </Chart>
), document.getElementById('mountNode'));

````