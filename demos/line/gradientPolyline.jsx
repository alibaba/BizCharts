import React from 'react';
import { Chart, Line } from '../../src';

// 数据源
const data = [
  { month: "2015-01-01", acc: 84.0 },
  { month: "2015-02-01", acc: 14.9 },
  { month: "2015-03-01", acc: 17.0 },
  { month: "2015-04-01", acc: 20.2 },
  { month: "2015-05-01", acc: 55.6 },
  { month: "2015-06-01", acc: 56.7 },
  { month: "2015-07-01", acc: 30.6 },
  { month: "2015-08-01", acc: 63.2 },
  { month: "2015-09-01", acc: 24.6 },
  { month: "2015-10-01", acc: 14.0 },
  { month: "2015-11-01", acc: 9.4 },
  { month: "2015-12-01", acc: 7.3 }
];

function Demo() {
  return <Chart scale={{value: {min: 0}}} padding={[10,20,50,40]} autoFit height={500} data={data} >
    <Line
      shape="smooth"
      position="month*acc"
      color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
    />
  </Chart>
}



export default Demo;

 
