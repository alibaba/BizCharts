# 分片饼图

---

# 分片饼图

````jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Coord, Geom, Tooltip, Legend, Label, Shape } from '@ali/bizcharts';
import DataSet from '@antv/data-set';


const data = [
  { sex: '男', sold: 0.65 },
  { sex: '女', sold: 0.35 },
];

const ds = new DataSet();
const dv1 = ds.createView('tt');
dv1.source(data);
dv1.transform({
  type:'percent',
  field:'sold',
  dimension:'sex',
  as:'percent',
});

const data2 = [
  { sex: '性别', men: 0.65, women: 0.35 }
];

const dv2 = ds.createView('ss');
dv2.source(data2);
dv2.transform({
  type:'fold',
  fields:['men', 'women'],
  value:'销售量',
  key:"性别占比",
  retains:['sex'],
});

//let frame = new Frame(data2);
//frame = Frame.combinColumns(frame, ['men', 'women'], '销售量', '性别占比', 'sex');

Shape.registerShape('interval', 'burstPie', {
  getPoints: function(cfg) {
    const width = cfg.size;
    const x = cfg.x;
    const min = cfg.y[0];
    const max = cfg.y[1];
    let res = [];

    for(let i = 0; i < max; i += 0.1) {
      if (min > i) {
        continue;
      } else if (min < i && min > i - 0.1) {
        res.push(
          {x: x - width / 2, y: min},
          {x: x - width / 2, y: i - 0.01},
          {x: x + width / 2, y: i - 0.01},
          {x: x + width / 2, y: min},
        );
      }
      const start = i;
      const end = parseFloat((i + 0.1) > max ? max : i + 0.09);
      res.push(
        {x: x - width / 2, y: start},
        {x: x - width / 2, y: end},
        {x: x + width / 2, y: end},
        {x: x + width / 2, y: start},
      );
    }
    return res;
  },
  draw(cfg, container) {
    // 将归一化后的数据转换为画布上的坐标
    const points = cfg.origin.points;
    // var points = this.parsePoints(cfg.origin.points);
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

    return container.addShape('path', {
      attrs: {
        fill: cfg.color || '#00D9DF',
        path: path
      }
    });
  }
});

const COLORS = ['#00D9DF', '#EBA538'];
console.log(dv2);
// 普通饼图
ReactDOM.render((
  <div>
    <Chart width={400} height={300} data={dv2}>
      <Coord type="theta" radius={0.8} innerRadius={0.5} />
      <Geom type="intervalStack"  shape="burstPie" position="销售量" color={['性别占比', COLORS]} />
    </Chart>
    <Chart height={300} width={400} data={dv1}>
      <Coord type="theta" radius={0.8} innerRadius={0.5} />
    <Geom
      type="intervalStack"
      shape="burstPie"
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
  </div>
), document.getElementById('mountNode'));
````