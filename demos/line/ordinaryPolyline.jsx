import React from 'react';
import { Chart, Line, Point } from '../../src';

let year = 1990;


// 数据源
const data = new Array(1200).fill('').map(() => {
  return {
    year: year++,
    value: Math.round(Math.random())
  }
});


function Demo() {
  return <Chart
    padding={[10,20,50,40]}
    autoFit
    height={500}
    data={data}
    notCompareData
    scale={{ value: { min: 0 } }}
  >
    <Line position="year*value"  />
    <Point position="year*value" />
  </Chart>
}

export default Demo;

 
