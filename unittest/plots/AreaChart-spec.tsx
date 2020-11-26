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
  "scales": 1850
},
{
  "Date": "2010-03",
  "scales": 1720
}]

const demoContainer = document.createElement('div')
const demoContainer2 = document.createElement('div')

const Chart = () => {
  const [data, setData] = useState([]);
  const option = {
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
  }
  useEffect(() => {
    act(() => setData(MOCK_DATA));
  }, [])
  return <AreaChart data={data} {...option} />
}
demoContainer2.className = 'demoContainer';
document.body.appendChild(demoContainer);

describe('AreaChart', () => {
  test('renders App component', () => {
    const { asFragment, debug } = render(<Chart />, {
      container: demoContainer,
    });
    debug();
    const firstRender = asFragment();
    expect(firstRender).toMatchDiffSnapshot(asFragment());
  });
});
