# bizgoblin基础条形图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/09653930-997a-11ea-a591-9be663db1ad5.png)

```js
// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Geom, Coord, Global, Tooltip } from 'bizgoblin';

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const data = [
  {
    country: '巴西',
    population: 18203,
  }, {
    country: '印尼',
    population: 23489,
  }, {
    country: '美国',
    population: 29034,
  }, {
    country: '印度',
    population: 104970,
  }, {
    country: '中国',
    population: 131744,
  },
];

const defs = [{
  dataKey: 'population',
  tickCount: 5,
}];

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
        <Axis dataKey="country" grid={null} />
        <Axis dataKey="population" label={formatLabel} line={null} grid={Global._defaultAxis.grid} />
        <Coord transposed />
        <Tooltip />
        <Geom geom="interval" position="country*population" />
      </Chart>
    );
  }
}

// CDN END
ReactDOM.render(<Demo />, mountNode)

```
