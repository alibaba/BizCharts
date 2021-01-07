import React from 'react';
import GroupedBarChart from '../../src/plots/GroupedBarChart';
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

describe('Plots-GroupedBarChart', () => {
  test('基础条形图-旧版', () => {
    let chart = null;
    render(<GroupedBarChart
      data={MOCK_DATA}
      xField="value"
      yField="label"
      barSize={20}
      groupField="type"
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    expect(chart.options.minBarWidth).toBe(20);
    expect(chart.options.maxBarWidth).toBe(20);
    cleanup();
  })
  test('基础-分组柱状图', () => {
    let chart = null;
    render(<GroupedBarChart
      data={MOCK_DATA}
      xField="value"
      yField="label"
      groupField="type"
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });
})
