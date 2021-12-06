import React, { useState } from 'react';
import BarChart from '../../src/plots/BarChart';
import { render, cleanup } from '@testing-library/react';

const MOCK_DATA = [
  { type: '家具家电', sales: 38 },
  { type: '粮油副食', sales: 52 },
  { type: '生鲜水果', sales: 61 },
  { type: '美容洗护', sales: 145 },
  { type: '母婴用品', sales: 48 },
  { type: '进口食品', sales: 38 },
  { type: '食品饮料', sales: 38 },
  { type: '家庭清洁', sales: 38 },
];

const opt = {
  data: MOCK_DATA,
  yField: "type",
  xField: "sales",
  seriesField: "type",
};

const Demo = () => {
  const [option, setState] = useState(opt);
  return <>
    <div onClick={() => {
      setState({...opt});
      console.log('change')
    }}>click me change option seriesField</div>
    <div onClick={() => {
      setState({...opt, seriesField: undefined });
      console.log('change')
    }}>click me change option seriesField</div>
    <div onClick={() => {
      setState({...opt, data: [] });
      console.log('change')
    }}>click me change option seriesField</div>

    <BarChart
      {...option}
    />
  </>
};

describe('Plots-basic', () => {
  test('update options', () => {
    let chart = null;
    render(<Demo />)
    // cleanup();
  });
})
