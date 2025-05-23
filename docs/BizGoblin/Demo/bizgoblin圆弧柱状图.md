# bizgoblin圆弧柱状图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/096fc080-997a-11ea-9761-adf4e02ffa04.png)

```js
// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Geom, Coord, Tooltip, Legend } from 'bizgoblin';

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const data = [
  { time: '周一', tem: 6.9, city: 'tokyo' },
  { time: '周二', tem: 9.5, city: 'tokyo' },
  { time: '周三', tem: 14.5, city: 'tokyo' },
  { time: '周四', tem: 18.2, city: 'tokyo' },
  { time: '周五', tem: 21.5, city: 'tokyo' },
  { time: '周六', tem: 25.2, city: 'tokyo' },
  { time: '周日', tem: 26.5, city: 'tokyo' },
  { time: '周一', tem: 0.8, city: 'newYork' },
  { time: '周二', tem: 5.7, city: 'newYork' },
  { time: '周三', tem: 11.3, city: 'newYork' },
  { time: '周四', tem: 17, city: 'newYork' },
  { time: '周五', tem: 22, city: 'newYork' },
  { time: '周六', tem: 24.8, city: 'newYork' },
  { time: '周日', tem: 24.1, city: 'newYork' },
  { time: '周一', tem: 0.6, city: 'berlin' },
  { time: '周二', tem: 3.5, city: 'berlin' },
  { time: '周三', tem: 8.4, city: 'berlin' },
  { time: '周四', tem: 13.5, city: 'berlin' },
  { time: '周五', tem: 17, city: 'berlin' },
  { time: '周六', tem: 18.6, city: 'berlin' },
  { time: '周日', tem: 17.9, city: 'berlin' },
];

const defs = [{
  dataKey: 'tem',
  tickCount: 5,
}];


class Demo extends React.Component {
  render() {
    return (
      <Chart width="100%" data={data} defs={defs} pixelRatio={window.devicePixelRatio * 2} >
        <Axis dataKey="time" label={{ fontSize: 12 }} grid={null} line={false} />
        <Axis dataKey="tem" show={false} />
        <Tooltip />
        <Legend />
        <Coord type="polar" transposed endAngle={2 * Math.PI} />
        <Geom geom="interval" position="time*tem" color="city" adjust="dodge" />
      </Chart>
    );
  }
}

// CDN END
ReactDOM.render(<Demo />, mountNode)

```
