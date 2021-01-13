import React, { useEffect, useState } from 'react';
import Chart from '../../src/components/Chart';
// import Axis from '../../src/components/Axis';
import Interval from '../../src/geometry/Interval';
import Point from '../../src/geometry/Point';
import '../../src/core';
// import Chart from '../../src/components/Chart';
// import { Point } from '../../src';
import { setDefaultErrorFallback } from '../../src/core';
import { render, act, cleanup, fireEvent, screen } from '@testing-library/react';
import { getClientPoint } from '../tools/simulate';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Demo = (props) => {
  const [data, setData] = useState([{gender: "female", height: '23', weight: 51.6}, {gender: "female", height: '32', weight: 59}]);
  useEffect(() => {
     fetch('https://alifd.alibabausercontent.com/materials/@bizcharts/point-scatter/0.2.8/mock.json')
       .then(res => res.json())
       .then(data => {
          act(() => setData(data));
       })
   }, [])
  return <Chart appendPadding={10} data={data} width={500} height={300} {...props}>
  <Point 
    position="height*weight"
    color="gender"
    shape="circle"
  />
  {/* <Axis /> */}
</Chart>
}


describe('components-Chart', () => {
  test('changeData', async () => {
    let chart = null;
    render(<Demo onGetG2Instance={c => chart = c} />);
    await sleep(500);
    expect(chart.options.data.length).toBe(507);
  })
})
