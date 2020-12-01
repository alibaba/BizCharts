import React from 'react';
import BulletChart from '../../src/plots/BulletChart';
import { render, cleanup } from '@testing-library/react';


const MOCK_DATA = [
  {
    title: '满意度',
    ranges: [100],
    measures: [80],
    target: 85,
  },
];

describe('Plots-BulletChart', () => {
  test('measure & range & target -- size & color & bulletStyle', () => {
    let chart = null;
    render(<BulletChart
      data={MOCK_DATA}
      xField="title"
      measureField="measures"
      rangeField="ranges"
      targetField="target"
      measureColors={['red']}
      rangeColors={['red']}
      markerColors={['red']}
      measureSize={30}
      rangeSize={50}
      markerSize={40}
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    expect(chart.options.size.measure).toBe(30);
    expect(chart.options.size.range).toBe(50);
    expect(chart.options.size.target).toBe(40);

    expect(chart.options.color.measure).toEqual(['red']);
    expect(chart.options.color.range).toEqual(['red']);
    expect(chart.options.color.target).toEqual(['red']);
    cleanup();
  });
  test('default field', () => {
    let chart = null;
    // @ts-ignore
    render(<BulletChart
      data={[
        {
          title: '满意度',
          measures: [83],
          targets: [90],
        },
      ]}
      xField="title"
      rangeMax={100}
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    expect(chart.options.measureField).toBe('measures');
    expect(chart.options.rangeField).toBe('ranges');
    expect(chart.options.targetField).toBe('target');

    expect(chart.options.data[0].target).toBe(90);
    cleanup();
  });
})
