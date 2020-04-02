import React, { useContext } from 'react';

// 父级图层实例，chart 或者 view

export const ChartViewContext = React.createContext(null);

export default function useChart() {
  return useContext(ChartViewContext);
}
