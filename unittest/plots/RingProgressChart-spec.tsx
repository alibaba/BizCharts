import React from 'react';
import RingProgressChart from '../../src/plots/RingProgressChart';
import { render, cleanup } from '@testing-library/react';


describe('Plots-RingProgressChart', () => {
  test('进度条', () => {
    let chart = null;
    render(<RingProgressChart
      width={100}
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
