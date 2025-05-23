# 雷达图(Line组件)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/7a645280-fd0d-11ec-b1fe-a12eaefd567e.png)

```js
import React, { useState, useEffect } from 'react';
import {
  Chart,
  Point,
  Line,
  Tooltip,
  Coordinate
} from 'bizcharts';
import DataSet from '@antv/data-set';

const data = [
  { item: 'Design', value: 70 },
  { item: 'Development', value: 60 },
  { item: 'Marketing', value: 50 },
  { item: 'Users', value: 40 },
  { item: 'Test', value: 60 },
  { item: 'Language', value: 70 },
  { item: 'Technology', value: 50 },
  { item: 'Support', value: 30 },
  { item: 'Sales', value: 60 },
  { item: 'UX', value: 50 },
];

 function Demo() {
  return <Chart
    height={320}
    data={data}
    autoFit
		onAxisLabelClick={console.log}
    scale={{
      value:{
        min: 0,
        max: 90,
      }
    }}
   >
    <Coordinate type="polar" radius={0.8} />
    <Line
      position="item*value"
      size={2}
    />
   </Chart>
 }
 
 ReactDOM.render(<Demo />, mountNode);
```
