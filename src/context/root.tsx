import React from 'react';

// 最顶层chart实例 theme, 局部配置

const RootChartContext = React.createContext(null);
RootChartContext.displayName = 'RootChartContext';

export function withChartInstance<T>(Component) {
  const Com = React.forwardRef<any, T>((props: T, ref) => {
    return (
      <RootChartContext.Consumer>
        {ctx => <Component ref={ref} {...ctx} {...props} />}
      </RootChartContext.Consumer>
    );
  })
  Com.displayName = Component.name;
  return Com;
};

export default RootChartContext;
