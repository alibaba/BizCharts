import React, { useState } from 'react';
import {
  Chart,
  Area,
  Line,
  Tooltip,
  Axis,
  Slider
} from '../../src';

function Labelline () {
  const [ count, setCount ] = useState(0);
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
    <div>
      <div onClick={() => setCount(count+1)}>click me2 {count}</div>
      <Chart scale={scale} height={400} data={data} autoFit>
      <Tooltip shared onShow={(...args) => {
        console.log('onShow', ...args)
      }} onChange={(...args) => {
        console.log('onChange', ...args)
      }} onHide={(...args) => {
        console.log('onHide', ...args)
      }} />
      <Axis name="year" grid={{
        line: {
          style: {
            stroke: 'red'
          }
        }
      }} title />
      <Axis name="value" grid={{
        line: {
          style: {
            stroke: 'red'
          }
        }
      }} title />
      <Slider start={0} end={0.8} />
      <Area position="year*value" />
      <Line position="year*value" />
    </Chart>
    </div>
  );
}

export default Labelline;
