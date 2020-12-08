import React, { useState } from 'react';
import PieChart from '../../src/plots/PieChart';
import { render, cleanup } from '@testing-library/react';


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
}];
const padding = [90, 90, 90, 90];
const Demo = (props) => {
  const [state, setState] = useState(1);

  return (<div>
    <a onClick={() => setState(state + 1)}>
      click:{state}
    </a>
    <PieChart
      padding={padding}
      data={MOCK_DATA}
      angleField="scales"
      colorField="Date"
      forceFit
      width={600}
      height={500}
      title="饼图"
      {...props}
    />
  </div >)
}

describe('Plots-PieChart', () => {
  test('autoFit&forceFit', () => {
    render(<Demo />)
  });

});
