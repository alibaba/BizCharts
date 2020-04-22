import React from 'react';
import createContext from 'create-react-context';

// 父级图层实例，chart 或者 view
const ChartViewContext = createContext<any>(null);
const { Consumer } = ChartViewContext;

export function withView<T>(Component) {
  return (props:T) => {
    return <Consumer>
      {
        ctx => <Component chartView={ctx} {...props} />
      }
    </Consumer>
  }
}

export default ChartViewContext;
