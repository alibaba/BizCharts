# 数据滑动条插件使用

---

# 数据滑动条插件使用

````jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Geom, Axis, Tooltip, Guide } from '@ali/bizcharts';
import Slider from '@ali/bizcharts-slider';

const data = [
  { month: '2015-01-01', acc: 84.0 },
  { month: '2015-02-01', acc: 14.9 },
  { month: '2015-03-01', acc: 17.0 },
  { month: '2015-04-01', acc: 20.2 },
  { month: '2015-05-01', acc: 55.6 },
  { month: '2015-06-01', acc: 56.7 },
  { month: '2015-07-01', acc: 30.6 },
  { month: '2015-08-01', acc: 63.2 },
  { month: '2015-09-01', acc: 24.6 },
  { month: '2015-10-01', acc: 14.0 },
  { month: '2015-11-01', acc: 9.4 },
  { month: '2015-12-01', acc: 6.3 }
];
const cols = {
  acc: { alias: '积累量' },
  month: { alias: '月', type: 'time', mask: 'mm月', tickCount: 11 }
};

const colors = {
  legend: '#3089DC',
  line: 'l (0) 0:rgba(99,152,233,0.28) 0.5:rgba(99,152,233,1) 1:rgba(99,152,233,0.28)',
  area: 'l (270) 0:rgba(255, 255, 255, 0) 1:rgba(133,172,255,0.31)'
};
let max = data[0].acc;
let min = data[0].acc;
data.forEach((item) => {
  max = Math.max(item.acc, max);
  min = Math.min(item.acc, min);
});
const interval = 7;
const space = max / interval;

ReactDOM.render((
  <Slider
    height={20}
    xDim="month"
    start={data[0].month}
    end={data[data.length - 1].month}
    middleAttr={{
      fill: 'l (90) 0.45:rgba(0,0,0,0) 0.45:#2597ff 0.55:#2597ff 0.55:rgba(0,0,0,0)',
      lineWidth: 15
    }}
    backgroundAttr={{
      stroke: '#fff',
      fill: 'rgba(0,0,0,0.3)',
      lineWidth: 15
    }}
    textAttr={{ fill: 'rgba(0, 0, 0, 0)' }}
    handleIcon="//img.alicdn.com/tps/TB1ZjuXOVXXXXcuXXXXXXXXXXXX-72-72.png"
  >
    <Chart height={400} data={data} cols={cols} forceFit>
      <Axis name="month" line={null} tickLine={null} title={null} labels={{ label: { textAlign: 'center', fill: '#999', fontSize: '12', rotate: 0 } }} />
      <Axis name="acc" line={null} tickLine={null} title={null} labels={null} grid={{ line: { lineWidth: 0 } }} />
      <Tooltip crosshairs crossLine={{ stroke: 'rgba(255, 255, 255, 0.6)', lineWidth: 30 }} />
      <Geom type="line" position="month*acc" size={2} shape="smooth" color={colors.legend} style={{
        stroke: colors.line,
        lineWidth: 4,
        shadowColor: 'rgba(76, 129, 253, 0.6)',
        shadowBlur: 60,
        shadowOffsetY: 6
      }}
      />
      <Geom type="area" position="month*acc" shape="smooth" color={colors.area} tooltip="" />
      {
        new Array(interval).fill(0).map((item, i) =>
          <Guide key={i} rect={[['min', i * space], ['max', (i * space) + space], { fill: 'rgba(236, 236, 236, 0.3)', fillOpacity: (i + 1) % 2 }]} />
        )
      }
    </Chart>
  </Slider>
), document.getElementById('mountNode'));
````