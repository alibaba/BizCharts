import React, { useEffect, useState } from 'react';
import { Chart } from '../../src';
import { render, act, cleanup, fireEvent, screen } from '@testing-library/react';
import Point from '../../src/geometry/Point';
import Axis from '../../src/components/Axis';
import ReactElement from '../../src/components/Annotation/reactElement';
import {Annotation} from '../../src';
import Line from '../../src/components/Annotation/Line';
import './cust-scale/scale';

const MOCK_DATA = [
  { year: 1991, value1: 3.5, value: 300 },
  { year: 1992, value1: 4, value: 40 },
  { year: 1993, value1: 3, value: 35 },
  { year: 1994, value1: 5, value: 5000 },
  { year: 1995, value1: 4, value: 49 },
  { year: 1996, value1: 6.6, value: 63 },
  { year: 1997, value1: 7, value: 7000 },
  { year: 2021, value1: 9, value: 92 },
  { year: 2034, value1: 28, value: 100 },
];

const TestChart = props => {
  const [data, setData] = useState([]);
  const scale = {
    value: {
      type: 'linear-shrinking',
      tickCount: 6,
      range: [0, 0.8, 1],
      shrink: 100,
      min: 0
    },

    year: {
      type: 'linear-shrinking',
      shrink: 1998,
      range: [0, 0.8, 1],
    },
  };
  useEffect(() => {
    act(() => setData(MOCK_DATA));
  }, []);

  return (
    <Chart data={data} padding={50} height={300} width={500} scale={scale} {...props}>
      <Point position="year*value" shape="circle" size={4} color="red" />
      <Axis />
      <Annotation.ReactElement content={() => <div>123</div>} offsetX={0} offsetY={100} />
      <Annotation.Html html="<div>23</div>" position={[0, 10]} />
      <Annotation.Line start={['0%', '50%']} end={['50%', '50%']} />
    </Chart>
  );
};

describe('基础功能-log缩略轴', () => {
  test('log缩略轴', () => {
    let chart = null;
    const { container } = render(
      <TestChart
        onGetG2Instance={c => {
          chart = c;
        }}
      />,
    );
    // const valueScale = chart.getScaleByField('value');
    // const value1Scale = chart.getScaleByField('value1');
    // cleanup();
  });
});
