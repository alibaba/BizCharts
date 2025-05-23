# bizgoblin层叠面积图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/096930d0-997a-11ea-9761-adf4e02ffa04.png)

```js
// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizgoblin';

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const pixelRatio = window.devicePixelRatio * 2;

const data = [
  { month: 12, tem: 7, city: 'tokyo' },
  { month: 1, tem: 6.9, city: 'tokyo' },
  { month: 2, tem: 9.5, city: 'tokyo' },
  { month: 3, tem: 14.5, city: 'tokyo' },
  { month: 4, tem: 18.2, city: 'tokyo' },
  { month: 5, tem: 21.5, city: 'tokyo' },
  { month: 6, tem: 25.2, city: 'tokyo' },
  { month: 7, tem: 26.5, city: 'tokyo' },
  { month: 8, tem: 23.3, city: 'tokyo' },
  { month: 9, tem: 18.3, city: 'tokyo' },
  { month: 10, tem: 13.9, city: 'tokyo' },
  { month: 11, tem: 9.6, city: 'tokyo' },
  { month: 12, tem: 0, city: 'newYork' },
  { month: 1, tem: 0.8, city: 'newYork' },
  { month: 2, tem: 5.7, city: 'newYork' },
  { month: 3, tem: 11.3, city: 'newYork' },
  { month: 4, tem: 17, city: 'newYork' },
  { month: 5, tem: 22, city: 'newYork' },
  { month: 6, tem: 24.8, city: 'newYork' },
  { month: 7, tem: 24.1, city: 'newYork' },
  { month: 8, tem: 20.1, city: 'newYork' },
  { month: 9, tem: 14.1, city: 'newYork' },
  { month: 10, tem: 8.6, city: 'newYork' },
  { month: 11, tem: 2.5, city: 'newYork' },
  { month: 12, tem: 2, city: 'berlin' },
  { month: 1, tem: 0.6, city: 'berlin' },
  { month: 2, tem: 3.5, city: 'berlin' },
  { month: 3, tem: 8.4, city: 'berlin' },
  { month: 4, tem: 13.5, city: 'berlin' },
  { month: 5, tem: 17, city: 'berlin' },
  { month: 6, tem: 18.6, city: 'berlin' },
  { month: 7, tem: 17.9, city: 'berlin' },
  { month: 8, tem: 14.3, city: 'berlin' },
  { month: 9, tem: 9, city: 'berlin' },
  { month: 10, tem: 3.9, city: 'berlin' },
  { month: 11, tem: 1, city: 'berlin' },
];

const defs = [{
  dataKey: 'month',
  tickCount: 12,
}, {
  dataKey: 'tem',
  tickCount: 5,
}];

function onChangeTooltip(obj, chart) {
  const legend = chart.get('legendController').legends.top[0];
  const tooltipItems = obj.items;
  const legendItems = legend.items;
  const map = {};
  legendItems.forEach((item) => {
    map[item.name] = JSON.parse(JSON.stringify(item));
  });
  tooltipItems.forEach((item) => {
    const name = item.name;
    const value = item.value;
    if (map[name]) {
      map[name].value = value;
    }
  });
  legend.setItems(Object.keys(map).map(key => map[key]));
}

function onHideTooltip(obj, chart) {
  const legend = chart.get('legendController').legends.top[0];
  legend.setItems(chart.getLegendItems().city);
}

class Demo extends React.Component {
  render() {
    return (
      <Chart width="100%" data={data} defs={defs} pixelRatio={pixelRatio} >
        <Axis dataKey="month" label={{ fontSize: 12 }} />
        <Axis dataKey="tem" label={{ fontSize: 12 }} />
        <Legend />
        <Tooltip showCrosshairs custom onChange={onChangeTooltip} onHide={onHideTooltip} />
        <Geom geom="area" position="month*tem" shape="smooth" color="city" style={{ opacity: 0.6 }} adjust="stack" />
        <Geom geom="line" position="month*tem" shape="smooth" color="city" adjust="stack" />
      </Chart>
    );
  }
}

// CDN END
ReactDOM.render(<Demo />, mountNode)

```
