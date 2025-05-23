# 有负值的基础面积图（BizCharts@4）

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/e5ce5990-afa2-11ea-8765-9d54391a91b0.png)

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
import DataSet from '@antv/data-set';

function Labelline () {
  const data = [
    { year: '1996', north: 322, south: 162 },
    { year: '1997', north: 324, south: 90 },
    { year: '1998', north: 329, south: 50 },
    { year: '1999', north: 342, south: 77 },
    { year: '2000', north: 348, south: 35 },
    { year: '2001', north: 334, south: -45 },
    { year: '2002', north: 325, south: -88 },
    { year: '2003', north: 316, south: -120 },
    { year: '2004', north: 318, south: -156 },
    { year: '2005', north: 330, south: -123 },
    { year: '2006', north: 355, south: -88 },
    { year: '2007', north: 366, south: -66 },
    { year: '2008', north: 337, south: -45 },
    { year: '2009', north: 352, south: -29 },
    { year: '2010', north: 377, south: -45 },
    { year: '2011', north: 383, south: -88 },
    { year: '2012', north: 344, south: -132 },
    { year: '2013', north: 366, south: -146 },
    { year: '2014', north: 389, south: -169 },
    { year: '2015', north: 334, south: -184 },
  ];
  
  // 数据需要加工成 {year: '1996', type: 'north', value: 50} 的模式
  const dv = new DataSet.DataView().source(data);
  dv.transform({
    type: 'fold',
    fields: ['north', 'south'], // 展开字段集
    key: 'type', // key字段
    value: 'value', // value字段
  });
  
  const scale = {
    value: {
      nice: true,
    },
    year: {
      range: [0, 1],
    },
  };

  return (
    <Chart padding="auto" scale={scale} height={400} data={dv.rows} autoFit>
      <Tooltip shared />
      <Area position="year*value" color="type" />
      <Line position="year*value" color="type" />
    </Chart>
  );
}

ReactDOM.render(<Labelline />, mountNode);

```
