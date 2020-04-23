import React from 'react';

// 父级图层实例，chart 或者 view
const ChartViewContext = React.createContext<any>(null);
ChartViewContext.displayName = 'ChartViewContext';
const { Consumer } = ChartViewContext;

export function withView<T>(Component) {
  return (props: T) => {
    return <Consumer>{ctx => <Component chartView={ctx} {...props} />}</Consumer>;
  };
}

export default ChartViewContext;
