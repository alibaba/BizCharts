import React from 'react';
import StackedBarChart from '../../src/plots/StackedBarChart';
import { render, cleanup } from '@testing-library/react';

const MOCK_DATA = [
  {
    label: 'Mon.',
    type: 'series1',
    value: 2800,
  },
  {
    label: 'Mon.',
    type: 'series2',
    value: 2260,
  },
  {
    label: 'Tues.',
    type: 'series1',
    value: 1800,
  },
  {
    label: 'Tues.',
    type: 'series2',
    value: 1300,
  },
  {
    label: 'Wed.',
    type: 'series1',
    value: 950,
  },
  {
    label: 'Wed.',
    type: 'series2',
    value: 900,
  },
  {
    label: 'Thur.',
    type: 'series1',
    value: 500,
  },
  {
    label: 'Thur.',
    type: 'series2',
    value: 390,
  },
  {
    label: 'Fri.',
    type: 'series1',
    value: 170,
  },
  {
    label: 'Fri.',
    type: 'series2',
    value: 100,
  },
];

describe('Plots-StackedBarChart', () => {
  test('堆叠条形图-旧版', () => {
    let chart = null;
    render(<StackedBarChart
      data={MOCK_DATA}
      xField="value"
      yField="label"
      stackField="type"
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    expect(chart.options).toMatchSnapshot();
    // cleanup();
  })
})
