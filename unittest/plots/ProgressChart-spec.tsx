import React from 'react';
import ProgressChart from '../../src/plots/ProgressChart';
import { render, cleanup } from '@testing-library/react';


describe('Plots-ProgressChart', () => {
  test('进度条', () => {
    let chart = null;
    render(<ProgressChart
      width={200}
      height={100}
      percent={0.8}
      color={ ['#5B8FF9', '#E8EDF3']}
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    expect(chart.options).toMatchSnapshot();
    cleanup();
  })
})
