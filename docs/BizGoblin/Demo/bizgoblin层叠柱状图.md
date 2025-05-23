# bizgoblin层叠柱状图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/096efd30-997a-11ea-bd36-0f0eda3e7ac1.png)

```js
// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizgoblin';

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const data = [{
  name: 'London',
  月份: 'Jan.',
  月均降雨量: 18.9,
}, {
  name: 'London',
  月份: 'Feb.',
  月均降雨量: 28.8,
}, {
  name: 'London',
  月份: 'Mar.',
  月均降雨量: 39.3,
}, {
  name: 'London',
  月份: 'Apr.',
  月均降雨量: 81.4,
}, {
  name: 'London',
  月份: 'May.',
  月均降雨量: 47,
}, {
  name: 'London',
  月份: 'Jun.',
  月均降雨量: 20.3,
}, {
  name: 'London',
  月份: 'Jul.',
  月均降雨量: 24,
}, {
  name: 'London',
  月份: 'Aug.',
  月均降雨量: 35.6,
}, {
  name: 'Berlin',
  月份: 'Jan.',
  月均降雨量: 12.4,
}, {
  name: 'Berlin',
  月份: 'Feb.',
  月均降雨量: 23.2,
}, {
  name: 'Berlin',
  月份: 'Mar.',
  月均降雨量: 34.5,
}, {
  name: 'Berlin',
  月份: 'Apr.',
  月均降雨量: 99.7,
}, {
  name: 'Berlin',
  月份: 'May.',
  月均降雨量: 52.6,
}, {
  name: 'Berlin',
  月份: 'Jun.',
  月均降雨量: 35.5,
}, {
  name: 'Berlin',
  月份: 'Jul.',
  月均降雨量: 37.4,
}, {
  name: 'Berlin',
  月份: 'Aug.',
  月均降雨量: 42.4,
}];

const defs = [{
  dataKey: 'year',
}, {
  dataKey: 'sales',
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
  legend.setItems(chart.getLegendItems().country);
}

class Demo extends React.Component {
  render() {
    return (
      <Chart width="100%" data={data} defs={defs} pixelRatio={window.devicePixelRatio * 2} >
        <Axis dataKey="月份" />
        <Legend />
        <Tooltip custom onChange={onChangeTooltip} onHide={onHideTooltip} />
        <Geom geom="interval" position="月份*月均降雨量" color="name" adjust="stack" />
      </Chart>
    );
  }
}

// CDN END
ReactDOM.render(<Demo />, mountNode)

```
