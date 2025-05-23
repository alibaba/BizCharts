# bizgoblin带负值面积图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/0971bc50-997a-11ea-a591-9be663db1ad5.png)

```js
// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Tooltip, Geom } from 'bizgoblin';

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const pixelRatio = window.devicePixelRatio * 2;

const data = [
  {
    month: 'Jan.',
    value: 6.06,
  }, {
    month: 'Feb.',
    value: 82.2,
  }, {
    month: 'Mar.',
    value: -22.11,
  }, {
    month: 'Apr.',
    value: 21.53,
  }, {
    month: 'May.',
    value: -21.74,
  }, {
    month: 'Jun.',
    value: 73.61,
  }, {
    month: 'Jul.',
    value: 53.75,
  }, {
    month: 'Aug.',
    value: 60.32,
  },
];

const defs = [
  {
    dataKey: 'month',
    range: [0, 1],
  }, {
    dataKey: 'value',
    nice: false,
    min: -100,
    max: 100,
    tickCount: 5,
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

function formatGrid(text) {
  if (text === '0') {
    return {
      lineDash: null,
      lineWidth: 1,
    };
  }
}

class Demo extends React.Component {
  render() {
    return (
      <Chart width="100%" data={data} defs={defs} pixelRatio={pixelRatio} >
        <Axis dataKey="month" line={null} label={formatLabel} />
        <Axis dataKey="value" grid={formatGrid} />
        <Tooltip showCrosshairs />
        <Geom geom="area" position="month*value" />
        <Geom geom="line" position="month*value" />
      </Chart>
    );
  }
}

// CDN END
ReactDOM.render(<Demo />, mountNode)

```
