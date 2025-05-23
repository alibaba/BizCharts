# bizgoblin区域图（存在空值）

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/096698c0-997a-11ea-bd36-0f0eda3e7ac1.png)

```js
// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizgoblin';

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const pixelRatio = window.devicePixelRatio * 2;

const data = [
  {
    year: '1986',
    type: 'ACME',
    value: 162,
  },
  {
    year: '1986',
    type: 'Compitor',
    value: 42,
  },
  {
    year: '1987',
    type: 'ACME',
    value: 134,
  },
  {
    year: '1987',
    type: 'Compitor',
    value: 54,
  },
  {
    year: '1988',
    type: 'ACME',
    value: 116,
  },
  {
    year: '1988',
    type: 'Compitor',
    value: 26,
  },
  {
    year: '1989',
    type: 'ACME',
    value: 122,
  },
  {
    year: '1989',
    type: 'Compitor',
    value: 32,
  },
  {
    year: '1990',
    type: 'ACME',
    value: 178,
  },
  {
    year: '1990',
    type: 'Compitor',
    value: 68,
  },
  {
    year: '1991',
    type: 'ACME',
    value: 144,
  },
  {
    year: '1991',
    type: 'Compitor',
    value: 54,
  },
  {
    year: '1992',
    type: 'ACME',
    value: 125,
  },
  {
    year: '1992',
    type: 'Compitor',
    value: 35,
  },
  {
    year: '1993',
    type: 'ACME',
    value: 176,
  },
  {
    year: '1993',
    type: 'Compitor',
    value: 66,
  },
  {
    year: '1994',
    type: 'ACME',
    value: 156,
  },
  {
    year: '1994',
    type: 'Compitor',
  },
  {
    year: '1995',
    type: 'ACME',
    value: 195,
  },
  {
    year: '1995',
    type: 'Compitor',
  },
  {
    year: '1996',
    type: 'ACME',
    value: 215,
  },
  {
    year: '1996',
    type: 'Compitor',
  },
  {
    year: '1997',
    type: 'ACME',
    value: 176,
  },
  {
    year: '1997',
    type: 'Compitor',
    value: 36,
  },
  {
    year: '1998',
    type: 'ACME',
    value: 167,
  },
  {
    year: '1998',
    type: 'Compitor',
    value: 47,
  },
  {
    year: '1999',
    type: 'ACME',
    value: 142,
  },
  {
    year: '1999',
    type: 'Compitor',
  },
  {
    year: '2000',
    type: 'ACME',
    value: 117,
  },
  {
    year: '2000',
    type: 'Compitor',
  },
  {
    year: '2001',
    type: 'ACME',
    value: 113,
  },
  {
    year: '2001',
    type: 'Compitor',
    value: 23,
  },
  {
    year: '2002',
    type: 'ACME',
    value: 132,
  },
  {
    year: '2002',
    type: 'Compitor',
  },
  {
    year: '2003',
    type: 'ACME',
    value: 146,
  },
  {
    year: '2003',
    type: 'Compitor',
    value: 46,
  },
  {
    year: '2004',
    type: 'ACME',
    value: 169,
  },
  {
    year: '2004',
    type: 'Compitor',
    value: 59,
  },
  {
    year: '2005',
    type: 'ACME',
    value: 184,
  },
  {
    year: '2005',
    type: 'Compitor',
    value: 44,
  },
];

const defs = [
  {
    dataKey: 'year',
    range: [0, 1],
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

class Demo extends React.Component {
  render() {
    return (
      <Chart width="100%" data={data} defs={defs} pixelRatio={pixelRatio} >
        <Axis dataKey="year" label={formatLabel} />
        <Legend show={false} />
        <Tooltip showCrosshairs />
        <Geom geom="area" position="year*value" color="type" shape="smooth" />
        <Geom geom="line" position="year*value" color="type" shape="smooth" />
      </Chart>
    );
  }
}

// CDN END
ReactDOM.render(<Demo />, mountNode)

```
