import React from 'react';
import View, { IView } from '../View';
import ErrorBoundary from '../../boundary/ErrorBoundary';
import withContainer from '../../boundary/withContainer';
import { Chart as _Chart } from '../../core';
import { RootChartContext } from '../../hooks/useRootChartInstance';
import { ChartViewContext } from '../../hooks/useChartView';

export interface IChart extends IView {
  container?: HTMLElement,
};

class Chart extends View<IChart> {
  ChartBaseClass: any = _Chart;

  getInitalConfig() {
    // const { container } = this.props;
    // TODO: 排除事件&生命周期勾子属性；
    return { ...this.props }
  }

  componentDidMount() {
    super.componentDidMount();
    // console.log('render')
    this.g2Instance.render();
  }

  componentDidUpdate(perProps) {
    this.configInstance(perProps);
    // TODO: forceUpdate
    this.g2Instance.render(true);
  }

  render() {
    // console.log('chart: render', this.g2Instance)
    return <ErrorBoundary>
      <RootChartContext.Provider value={this.g2Instance}>
        <ChartViewContext.Provider value={this.g2Instance}>
          {super.render()}
        </ChartViewContext.Provider>
      </RootChartContext.Provider>
    </ErrorBoundary>
  }
}

export default withContainer<IChart>(Chart);
