#  数据滑动条插件使用-自定义样式

---

#  数据滑动条插件使用-自定义样式

````jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Geom, Axis, Tooltip } from '@ali/bizcharts';
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
      lineWidth: 17
    }}
    textAttr={{ fill: 'rgba(0, 0, 0, 0)' }}
    handleIcon="//img.alicdn.com/tps/TB1ZjuXOVXXXXcuXXXXXXXXXXXX-72-72.png"
  >
    <Chart height={400} data={data} cols={cols} forceFit>
      <Axis name="month" />
      <Axis name="acc" />
      <Tooltip />
      <Geom type="line" position="month*acc" size={2} shape="smooth" />
    </Chart>
  </Slider>
), document.getElementById('mountNode'));
````