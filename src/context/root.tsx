import React from 'react';

// 最顶层chart实例 theme, 局部配置

const RootChartContext = React.createContext(null);
RootChartContext.displayName = 'RootChartContext';

export const withChartInstance = Component => {
  const Com = props => {
    return (
      <RootChartContext.Consumer>
        {ctx => <Component {...ctx} {...props} />}
      </RootChartContext.Consumer>
    );
  };
  Com.displayName = Component.name;
  return Com;
};

export default RootChartContext;
