import React from 'react';

// 父级图层实例，chart 或者 view

export const ChartViewContext = React.createContext(null);

const Consumer: React.Consumer<any> = ChartViewContext.Consumer;

export const withView = Component => {
  return props => {
    return <Consumer>
      {
        ctx => <Component chartView={ctx} {...props} />
      }
    </Consumer>
  }
}

export default function useView() {
  return React.useContext(ChartViewContext);
}
