# bizgoblin百分比层叠柱状图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/09662390-997a-11ea-9761-adf4e02ffa04.png)

```js
// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizgoblin';

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const data = [{
  country: 'Europe',
  year: '1750',
  value: 163,
  percent: 0.24511278195488723,
}, {
  country: 'Asia',
  year: '1750',
  value: 502,
  percent: 0.7548872180451128,
}, {
  country: 'Europe',
  year: '1800',
  value: 203,
  percent: 0.24224343675417662,
}, {
  country: 'Asia',
  year: '1800',
  value: 635,
  percent: 0.7577565632458234,
}, {
  country: 'Europe',
  year: '1850',
  value: 276,
  percent: 0.2543778801843318,
}, {
  country: 'Asia',
  year: '1850',
  value: 809,
  percent: 0.7456221198156682,
}, {
  country: 'Europe',
  year: '1900',
  value: 408,
  percent: 0.3011070110701107,
}, {
  country: 'Asia',
  year: '1900',
  value: 947,
  percent: 0.6988929889298893,
}, {
  country: 'Europe',
  year: '1950',
  value: 547,
  percent: 0.2806567470497691,
}, {
  country: 'Asia',
  year: '1950',
  value: 1402,
  percent: 0.7193432529502309,
}, {
  country: 'Europe',
  year: '1999',
  value: 729,
  percent: 0.16708686683474674,
}, {
  country: 'Asia',
  year: '1999',
  value: 3634,
  percent: 0.8329131331652533,
}, {
  country: 'Europe',
  year: '2050',
  value: 628,
  percent: 0.10651289009497965,
}, {
  country: 'Asia',
  year: '2050',
  value: 5268,
  percent: 0.8934871099050203,
}, {
  country: 'Europe',
  year: '2100',
  value: 828,
  percent: 0.10227272727272728,
}, {
  country: 'Asia',
  year: '2100',
  value: 7268,
  percent: 0.8977272727272727,
}];

const defs = [{
  dataKey: 'percent',
  min: 0,
  formatter(value) {
    return `${(value * 100).toFixed(0)}%`;
  },
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
        <Axis dataKey="year" />
        <Legend />
        <Tooltip custom onChange={onChangeTooltip} onHide={onHideTooltip} />
        <Geom geom="interval" position="year*percent" color="country" adjust="stack" />
      </Chart>
    );
  }
}

// CDN END
ReactDOM.render(<Demo />, mountNode)

```
