import React from 'react';
import View, { IView } from './View';
import ErrorBoundary from '../boundary/ErrorBoundary';
import withContainer from '../boundary/withContainer';
import { Chart as _Chart } from '../core';



export interface IChart extends IView {
  container?: HTMLElement,
};

class Chart extends View<IChart> {
  ChartBaseClass: any = _Chart;
  name = 'bizcharts-chart';

  getInitalConfig() {
    // const { container } = this.props;
    // TODO: 排除事件&生命周期勾子属性；
    return { ...this.props }
  }
  render() {
    return <ErrorBoundary>
      {super.render()}
    </ErrorBoundary>
  }
}

export default withContainer<IChart>(Chart);
