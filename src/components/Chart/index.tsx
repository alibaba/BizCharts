import React from 'react';
import _deepMix from '@antv/util/esm/deep-mix';
import View, { IView } from '../View';
import ErrorBoundary from '@/boundary/ErrorBoundary';
import withContainer from '@/boundary/withContainer';
import { Chart as _Chart } from '@/core';
import RootChartContext from '@/context/root';
import ChartViewContext from '@/context/view';
import warn from '@/utils/warning';
import uniqueId from '@antv/util/esm/unique-id';

export interface IChart extends IView {
  container?: HTMLElement;
  height?: number | string;
}

class Chart extends View<IChart> {
  ChartBaseClass: any = _Chart;
  initInstance() {
    this.id = uniqueId(this.name);
    const options = this.getInitalConfig();
    this.g2Instance = new this.ChartBaseClass(options);
    if (options.pure) {
      this.g2Instance.axis(false);
      this.g2Instance.tooltip(false);
    } else {
      this.g2Instance.tooltip({ showMarkers: false });
    }
  }
  getInitalConfig() {
    // const { container } = this.props;
    // TODO: 排除事件&生命周期勾子属性；
    const config = { ...this.props };
    if (config.forceFit !== undefined) {
      warn(false, 'forceFit 将会在4.1后不再支持，请使用`autoFit`替代');
      config.autoFit = config.forceFit;
    }

    return config;
  }

  componentDidMount() {
    super.componentDidMount();
    this.g2Instance && this.g2Instance.render();
  }

  componentDidUpdate(perProps) {
    this.configInstance(perProps, this.props);
    // TODO: forceUpdate
    this.g2Instance.render(true);
  }

  render() {
    this.getInstance();
    return (
      <ErrorBoundary>
        <RootChartContext.Provider value={{ chart: this.g2Instance }}>
          {super.render()}
        </RootChartContext.Provider>
      </ErrorBoundary>
    );
  }
}

export default withContainer<IChart>(Chart);
