# 基础面积图(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/ada284d0-a82c-11ed-adea-01ad76f1a13d.png)

```js
import React from 'react';
import {
  Chart,
  Area,
  Line,
  Tooltip,
  Axis,
  Coordinate
} from 'bizcharts';

function Labelline () {
  const data = [
    { year: '1991', value: 15468 },
    { year: '1992', value: 16100 },
    { year: '1993', value: 15900 },
    { year: '1994', value: 17409 },
    { year: '1995', value: 17000 },
    { year: '1996', value: 31056 },
    { year: '1997', value: 31982 },
    { year: '1998', value: 32040 },
    { year: '1999', value: 33233 },
  ];
  
  const scale = {
    value: {
      min: 10000,
      nice: true,
    },
    year: {
      range: [0, 1],
    },
  };

  return (
    <Chart scale={scale} height={400} data={data} autoFit>
      <Tooltip shared />
      <Area position="year*value" shape="hv" />
      <Line position="year*value" shape="hv" />
    </Chart>
  );
}

ReactDOM.render(<Labelline />, mountNode);

```
