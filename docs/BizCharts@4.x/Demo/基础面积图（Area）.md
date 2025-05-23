# 基础面积图（Area）

![预览](https://z.alicdn.com/alickn/chu-ko-no/2020-4-29/bizcharts/1e5066f9-0846-4ba6-8651-ad7b21c1b2ee/1e5066f9-0846-4ba6-8651-ad7b21c1b2ee.png)

```js
import React from 'react';
import {
  Chart,
  Area,
} from 'bizcharts';

function Labelline () {
  const data = [
    { year: '1991', value: 15468 },
    { year: '1992', value: 16100 },
    { year: '1993', value: 15900 },
    { year: '1994', value: 17409 },
    { year: '1995', value: 17000 },
    { year: '1996', value: 21056 },
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
    <Chart scale={scale} height={200} data={data} autoFit>
      <Area position="year*value" />
    </Chart>
  );
}

ReactDOM.render(<Labelline />, mountNode);

```
