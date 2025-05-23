# 堆叠面积图(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/be2bb9c0-bc22-11ed-adb7-c3b290dea37c.png)

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
    {  a: '1', asd: 'Asia', year: '1750', value: 502 },
    {  a: '1', asd: 'Asia', year: '1800', value: 635 },
    {  a: '1', asd: 'Asia', year: '1850', value: 809 },
    {  a: '1', asd: 'Asia', year: '1900', value: 5268 },
    {  a: '1', asd: 'Asia', year: '1950', value: 4400 },
    {  a: '1', asd: 'Asia', year: '1999', value: 3634 },
    {  a: '1', asd: 'Asia', year: '2050', value: 947 },
  ];
  
  const scale = {
    value: {
      // nice: true,
    },
    year: {
      type: 'linear',
      // tickInterval: 50,
    },
  };

  return (
    <Chart scale={scale} height={400} data={data} autoFit>
      <Line color={'asd'} position="year*value" />
    </Chart>
  );
}

ReactDOM.render(<Labelline />, mountNode);

```
