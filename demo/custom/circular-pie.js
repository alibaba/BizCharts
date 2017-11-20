# 圆角环状图

---

# 圆角环状图

````jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Coord, Geom, Tooltip, Legend, Stat, Shape, Label } from '@ali/bizcharts';
import DataSet from '@antv/data-set';

const data = [
  { sex: '男', sold: 0.45 },
  { sex: '女', sold: 0.55 },
];
const data2 = [
  { sex: '性别', men: 0.65, women: 0.35 }
];
//let frame = new Frame(data2);
//frame = Frame.combinColumns(frame, ['men', 'women'], '销售量', '性别占比', 'sex');

const ds1 = new DataSet();
const dv1 = ds1.createView('tt');
dv1.source(data);
dv1.transform({
  type:'percent',
  field:'sold',
  dimension:'sex',
  as:'percent',
});

const ds2 = new DataSet();
const dv2 = ds1.createView('ss');
dv2.source(data2);
dv2.transform({
  type:'fold',
  fields:['men', 'women'],
  value:'销售量',
  key:"性别占比",
  retains:['sex'],
});

Shape.registerShape('interval', 'radiusPie', {
  getPoints: function(cfg) {
    const width = cfg.size;
    const x = cfg.x;
    const min = cfg.y[0];
    const max = cfg.y[1];

    return [
      {x: x - width / 2, y: min},
      {x: x - width / 2, y: max},
      {x: x + width / 2, y: max},
      {x: x + width / 2, y: min}      
    ];
  },
  draw(cfg, container) {
    // 将归一化后的数据转换为画布上的坐标
    const points = cfg.origin.points;
    let path = [];
    for(let i = 0; i< cfg.origin.points.length; i += 4) {
      path.push(['M', points[i].x, points[i].y]);
      path.push(['L', points[i + 1].x, points[i + 1].y]);
      path.push(['L', points[i + 2].x, points[i + 2].y]);
      path.push(['L', points[i + 3].x, points[i + 3].y]);
      path.push(['L', points[i].x, points[i].y]);
      path.push(['z']);
    }
    path = this.parsePath(path, true);

    var rect = container.addShape('path', {
      attrs: {
        fill: cfg.color || '#00D9DF',
        path: path
      }
    });
    
    const minH = Math.min(path[1][7], path[2][2]);
		const minW = Math.min(path[1][6], path[2][1]);
    const diffH = Math.abs(path[1][7] - path[2][2]);
    const diffW = Math.abs(path[1][6] - path[2][1]);
    
    container.addShape('circle', {
      attrs: {
        x: minW + diffW / 2,
        y: minH + diffH / 2,
        fill: cfg.color,
        radius: diffH / 2
      }
    });
    
    const minHH = Math.min(path[3][7], path[4][2]);
		const minWW = Math.min(path[3][6], path[4][1]);
    const diffHH = Math.abs(path[3][7] - path[4][2]);
    const diffWW = Math.abs(path[3][6] - path[4][1]);    
    container.addShape('circle', {
      attrs: {
        x: minWW + diffWW / 2,
        y: minHH + diffHH / 2,
        fill: cfg.color,
        radius: diffH / 2
      }      
    });
    
    return rect;
  }
});

const COLORS = ['#00D9DF', '#EBA538'];

ReactDOM.render((
  <Chart height={400} width={500} data={dv1} animate={false}>
    <Coord type="theta" radius={0.8} innerRadius={0.5} />
    <Geom
      type="intervalStack"
      shape="radiusPie"
      position={'percent'}
      color={['sex', COLORS]}
      >
      <Label 
        label='sold'
        custom= {true}
        htmlTemplate={
          (text, item) => {
            const isFemale = item.point.sex === '女';
          	const src = isFemale ?  '//img.alicdn.com/tps/TB1cYZxPpXXXXX7XpXXXXXXXXXX-85-206.png' : '//img.alicdn.com/tps/TB1up3oPpXXXXbYXFXXXXXXXXXX-94-204.png';
            const color = isFemale ? COLORS[1] : COLORS[0];
          	const IMG = `<img style="width:40px" src="${src}" /><br/>`;
          return `<div style="text-align:center;color:${color}">${IMG}${(text * 100).toFixed(0)}%</div>`;
        }}
        />
    </Geom>
  </Chart>
), document.getElementById('mountNode'));
````