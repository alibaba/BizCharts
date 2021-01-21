import React, { useEffect, useState } from 'react';
import DensityHeatmapChart from '../../src/plots/DensityHeatmapChart';
import { render, cleanup, act } from '@testing-library/react';

function Demo(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://alifd.alibabausercontent.com/materials/@bizcharts/heatmap-image/0.3.0/mock.json')
      .then(res => res.json())
      .then(data => {
        act(() => setData(data));
      })
  }, [])
  
  return (
    <DensityHeatmapChart
      data={data}
      title={{
        visible: true,
        text: '密度热力图',
      }}
      autoFit
      {...props}
    />
  );
}

describe('Plots-DensityHeatmapChart', () => {
  test('旧版密度热力图', () => {
    let chart = null;
    render(<Demo
      padding="auto"
      xField='g'
      yField='l'
      colorField='tmp'
      color={['#295599', '#3e94c0', '#78c6d0', '#b4d9e4', '#fffef0', '#f9cdac', '#ec7d92', '#bc448c']}
      radius={15}
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    expect(chart.options).toMatchSnapshot();
    cleanup();
  })
  test('基础密度热力图', () => {
    let chart = null;
    render(<Demo
      padding="auto"
      xField='g'
      yField='l'
      colorField='tmp'
      color="#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2"
      radius={15}
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });
})
