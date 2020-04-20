import React from 'react';
import createContext from 'create-react-context';

// 父级图层实例，chart 或者 view
const ChartViewContext = createContext<any>(null);
const Consumer = ChartViewContext.Consumer;

export const withView = Component => {
  return props => {
    return <Consumer>
      {
        ctx => <Component chartView={ctx} {...props} />
      }
    </Consumer>
  }
}

export default ChartViewContext;
