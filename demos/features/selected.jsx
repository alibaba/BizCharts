import React from 'react';
import { Chart, Interval, Interaction } from '../../src';

const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 45 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
];


function Demo() {
  return <Chart autoFit data={data} height={400} >
    <Interval position="year*sales" setElements={(elements) => {
      elements[1].setState('selected', true);
    }} active-region />
    <Interaction type="element-hilight" />
  </Chart>
}

export default Demo;
