# bizgoblin基础面积图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/0966e6e0-997a-11ea-9761-adf4e02ffa04.png)

```js
// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizgoblin';

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const data = [
  {
    time: 'Jan.',
    tem: 1000,
  }, {
    time: 'Feb.',
    tem: 2200,
  }, {
    time: 'Mar.',
    tem: 2000,
  }, {
    time: 'Apr.',
    tem: 2600,
  }, {
    time: 'May.',
    tem: 2000,
  }, {
    time: 'Jun.',
    tem: 2600,
  }, {
    time: 'Jul.',
    tem: 2800,
  }, {
    time: 'Aug.',
    tem: 2000,
  },
];

const defs = [
  {
    dataKey: 'time',
    range: [0, 1],
  }, {
    dataKey: 'tem',
    tickCount: 5,
    min: 0,
  },
];

function formatLabel(text, index, total) {
  const textCfg = {};
  if (index === 0) {
    textCfg.textAlign = 'left';
  } else if (index === total - 1) {
    textCfg.textAlign = 'right';
  }
  return textCfg;
}

class Demo extends React.Component {
  render() {
    return (
      <Chart width="100%" data={data} defs={defs} pixelRatio={window.devicePixelRatio * 2} >
        <Axis dataKey="time" label={formatLabel} />
        <Axis dataKey="tem" />
        <Tooltip showCrosshairs />
        <Geom geom="area" position="time*tem" />
        <Geom geom="line" position="time*tem" />
      </Chart>
    );
  }
}

// CDN END
ReactDOM.render(<Demo />, mountNode)

```
