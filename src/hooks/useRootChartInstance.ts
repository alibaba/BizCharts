import React, { useContext } from 'react';

// 最顶层chart实例

export const RootChartContext = React.createContext(null);

export default function useChart() {
  return useContext(RootChartContext);
}
