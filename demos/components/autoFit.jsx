/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Chart, Interval, Tooltip } from '../../src';

const data = [
  {
    year: '1991',
    value: 3,
  },
  {
    year: '1992',
    value: 4,
  },
  {
    year: '1993',
    value: 3.5,
  },
  {
    year: '1994',
    value: 5,
  },
  {
    year: '1995',
    value: 4.9,
  },
  {
    year: '1996',
    value: 6,
  },
  {
    year: '1997',
    value: 7,
  },
  {
    year: '1998',
    value: 9,
  },
  {
    year: '1999',
    value: 13,
  },
];
function Basic() {
  return (
    <div style={{ width: '100%', height: 350 }}>
      <Chart data={data} autoFit>
        <Interval position="year*value" />
        <Tooltip />
      </Chart>
    </div>
  );
}

export default Basic;

export function ChangeSize() {
  const [height, setHeight] = useState(300);
  useEffect(() => {
    setInterval(() => {
      const random = Math.round(Math.random() * 100);
      setHeight(300 + random);
    }, 3000);
  }, []);
  return (
    <div style={{ width: '100%', height: 350 }}>
      <Chart data={data} height={height} autoFit>
        <Interval position="year*value" />
        <Tooltip />
      </Chart>
    </div>
  );
}
