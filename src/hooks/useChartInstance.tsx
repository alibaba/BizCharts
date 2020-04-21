import React from 'react';
import RootChartContext from '../context/root';


export default function useChartInstance() {
  return React.useContext(RootChartContext).chart;
}
export function useChartTheme() {
  // todo: 局部配置的theme 合并 chart自己的theme
  return React.useContext(RootChartContext).theme;
}

