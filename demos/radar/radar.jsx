import React, { useState, useEffect } from 'react';
import {
  Chart,
  Point,
  Line,
  Area,
  Tooltip,
  Coordinate
} from '../../src';
import DataSet from '@antv/data-set';

const data = [
  { item: 'Design', a: 70, b: 30 },
  { item: 'Development', a: 60, b: 70 },
  { item: 'Marketing', a: 50, b: 60 },
  { item: 'Users', a: 40, b: 50 },
  { item: 'Test', a: 60, b: 70 },
  { item: 'Language', a: 70, b: 50 },
  { item: 'Technology', a: 50, b: 40 },
  { item: 'Support', a: 30, b: 40 },
  { item: 'Sales', a: 60, b: 40 },
  { item: 'UX', a: 50, b: 60 },
];

 function Demo() {
   
  const { DataView } = DataSet;
  const dv = new DataView().source(data);
  dv.transform({
    type: 'fold',
    fields: ['a', 'b'], // 展开字段集
    key: 'user', // key字段
    value: 'score', // value字段
  });

  return <Chart
    height={400}
    data={dv.rows}
    autoFit
    scale={{
      score:{
        min: 0,
        max: 80,
      }
    }}
    interactions={['legend-highlight']}
   >
    <Coordinate type="polar" radius={0.8} />
    <Tooltip shared />
    <Point
      position="item*score"
      color="user"
      shape="circle"
    />
    <Line
      position="item*score"
      color="user"
      size="2"
    />
    <Area
      position="item*score"
      color="user"
    />
   </Chart>
 }
 
 export default Demo;