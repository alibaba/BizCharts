import React from 'react';

// 最顶层chart实例

export const RootChartContext = React.createContext(null);
export const withRootChartInstance = Component => {
  return props => {
    return <RootChartContext.Consumer>
      {
        ctx => <Component chart={ctx} {...props} />
      }
    </RootChartContext.Consumer>
  }
}

export default function useChart() {
  return React.useContext(RootChartContext);
}
