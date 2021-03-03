import React from 'react';
import TinyAreaChart from '../../src/plots/TinyAreaChart';
import { render, cleanup } from '@testing-library/react';

const MOCK_DATA = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 6 },
  { year: '1994', value: 6 },
  { year: '1995', value: 8 },
  { year: '1996', value: 9 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

describe('Plots-TinyAreaChart', () => {
  test('迷你面积图-旧版', () => {
    let chart = null;
    render(<TinyAreaChart
      data={MOCK_DATA}
      yField="value"
      xField="label"
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    expect(chart.options).toMatchSnapshot();
    cleanup();
  })
})
