import React, { useEffect, useState } from 'react';
import AreaChart from '../../src/plots/AreaChart';
import { render, act } from '@testing-library/react';
import { toMatchDiffSnapshot } from 'snapshot-diff';

// @ts-ignore
global.expect.extend({ toMatchDiffSnapshot });

const MOCK_DATA = [{
  "Date": "2010-01",
  "scales": 1998
},
{
  "Date": "2010-02",
  "scales": 1250
},
{
  "Date": "2010-03",
  "scales": 1720
}]

const demoContainer = document.createElement('div')
const demoContainer2 = document.createElement('div')

const Chart = (props) => {
  const [data, setData] = useState([]);
  const option = {
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    ...props,
  };
  useEffect(() => {
    act(() => setData(MOCK_DATA));
  }, [])
  return <AreaChart data={data} {...option} />
}
demoContainer2.className = 'demoContainer';
document.body.appendChild(demoContainer);

describe('AreaChart', () => {
  test('数据更新[] --> [{},{},{}]', () => {
    let chart = null;
    render(<Chart onGetG2Instance={c => {
      chart = c;
    }} />, {
      container: demoContainer,
    });
    console.log(chart);
    expect(chart.options.data.length).toBe(3);
  });
});
