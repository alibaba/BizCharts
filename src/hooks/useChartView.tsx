import React from 'react';

// 父级图层实例，chart 或者 view

export const ChartViewContext = React.createContext(null);

const Consumer: React.Consumer<any> = ChartViewContext.Consumer;

export const withChartView = Component => {
  return props => {
    return <Consumer>
      {
        ctx => <Component chartView={ctx} {...props} />
      }
    </Consumer>
  }
}

export default function useChart() {
  return React.useContext(ChartViewContext);
}
