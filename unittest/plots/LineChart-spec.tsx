import React from 'react';
import LineChart from '../../src/plots/LineChart';
import { render, cleanup } from '@testing-library/react';

const MOCK_DATA = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

describe('Plots-LineChart', () => {
  test('兼容旧版LineChart', () => {
    let chart = null;
    render(<LineChart 
      data={MOCK_DATA}
      xField="year"
      yField="value"
      onGetG2Instance={
        (c) => chart = c
      }
      interactions={[
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 0.5,
          },
        },
      ]}
    />);
    expect(chart.options.slider).toEqual({
      start: 0,
      end: 0.5,
    });
    cleanup();
  })
  test('兼容旧版LineChart-point', () => {
    let chart = null;
    render(<LineChart 
      data={MOCK_DATA}
      xField="year"
      yField="value"
      point
      onGetG2Instance={
        (c) => chart = c
      }
    />);
    expect(chart.options.point).toEqual({});
    expect(chart.options).toMatchSnapshot();
    cleanup();
  })
})
