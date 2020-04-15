import React from 'react';

// 最顶层chart实例

export const RootChartContext = React.createContext(null);
export const withChartInstance = Component => {
  const Com = props => {
    return <RootChartContext.Consumer>
      {
        ctx => <Component {...ctx} {...props} />
      }
    </RootChartContext.Consumer>
  }
  Com.displayName = Component.name;
  return Com;
}

export default function useChartInstance() {
  return React.useContext(RootChartContext);
}
