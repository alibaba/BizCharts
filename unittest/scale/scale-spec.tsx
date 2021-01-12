import React, { useEffect, useState } from 'react';
import Chart from '../../src/components/Chart';
import { render, act, cleanup, fireEvent, screen } from '@testing-library/react';
import Line from '../../src/geometry/Line';
import Axis from '../../src/components/Axis';

const MOCK_DATA = [
  { year: '1991', value1: 3.5, value: 3 },
  { year: '1992', value1: 4, value: 4 },
  { year: '1993', value1: 3, value: 3.5 },
  { year: '1994', value1: 5, value: 5 },
  { year: '1995', value1: 4, value: 4.9 },
  { year: '1996', value1: 6.6, value: 6 },
  { year: '1997', value1: 7, value: 7 },
  { year: '1998', value1: 9, value: 9 },
  { year: '1999', value1: 28, value: 13 },
];

const TestChart = props => {
  const [data, setData] = useState([]);
  const scale = {
    value: {
      type: 'linear-strict',
      tickCount: 6,
    },
    value1: {
      type: 'linear-strict',
      tickCount: 6,
    },
    year: {
      range: [0, 1],
    },
  };
  useEffect(() => {
    act(() => setData(MOCK_DATA));
  }, []);

  return (
    <Chart data={data} height={300} width={500} scale={scale} {...props}>
      <Line position="year*value" size={2} color="red" />
      <Line position="year*value1" size={2} />
      <Axis />
    </Chart>
  );
};

describe('基础功能-双轴刻度对齐', () => {
  test('刻度数目是否符合预期', () => {
    let chart = null;
    const { container } = render(
      <TestChart
        onGetG2Instance={c => {
          chart = c;
        }}
      />,
    );
    const valueScale = chart.getScaleByField('value');
    const value1Scale = chart.getScaleByField('value1');

    expect(valueScale.ticks.length === value1Scale.ticks.length).toBe(true);
    expect(valueScale.min === valueScale.ticks[0]).toBe(true);
    expect(valueScale.max === valueScale.ticks[valueScale.ticks.length - 1]).toBe(true);
    expect(value1Scale.min === value1Scale.ticks[0]).toBe(true);
    expect(value1Scale.max === value1Scale.ticks[valueScale.ticks.length - 1]).toBe(true);
    // cleanup();
  });
});
