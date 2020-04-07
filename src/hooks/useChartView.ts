import React from 'react';

// 父级图层实例，chart 或者 view

export const ChartViewContext = React.createContext(null);

export default function useChart() {
  return React.useContext(ChartViewContext);
}
