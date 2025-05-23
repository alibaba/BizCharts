# bizgoblin区间柱状图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/096debc0-997a-11ea-8225-e30c1937e15c.png)

```js
// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizgoblin';

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const data = [
  {
    x: '分类一',
    y: [76, 100],
  }, {
    x: '分类二',
    y: [56, 108],
  }, {
    x: '分类三',
    y: [38, 129],
  }, {
    x: '分类四',
    y: [58, 155],
  }, {
    x: '分类五',
    y: [45, 120],
  }, {
    x: '分类六',
    y: [23, 99],
  }, {
    x: '分类七',
    y: [18, 56],
  }, {
    x: '分类八',
    y: [18, 34],
  },
];

const defs = [{
  dataKey: 'y',
  tickCount: 5,
}];

function onShowTooltip(ev) {
  const items = ev.items;
  items[0].name = '范围';
  const value = items[0].value;
  items[0].value = `${value[0]} 至 ${value[1]}`;
}

class Demo extends React.Component {
  render() {
    return (
      <Chart width="100%" data={data} defs={defs} pixelRatio={window.devicePixelRatio * 2} >
        <Axis dataKey="y" />
        <Tooltip showItemMarker={false} onShow={onShowTooltip} />
        <Geom geom="interval" position="x*y" />
      </Chart>
    );
  }
}

// CDN END
ReactDOM.render(<Demo />, mountNode)

```
