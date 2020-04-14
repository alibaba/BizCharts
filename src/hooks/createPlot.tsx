import React from 'react';
import _clone from '@antv/util';

import withContainer from '../boundary/withContainer';
import ErrorBoundary from '../boundary/ErrorBoundary';
import { RootChartContext } from './useRootChartInstance';
import { ChartViewContext } from './useChartView';


class BasePlot extends React.Component<any> {
  g2Instance: any;
  componentDidMount() {
    if (this.props.children) {
      this.getChartView().render();
    }
  }
  componentDidUpdate(preProps) {
    if (this.props.children) {
      this.getChartView().render();
    }
  }
  componentWillUnmount() {
    if(this.g2Instance) {
      this.g2Instance.destroy();
    }
  }
  initInstance() {
    const { container, PlotClass, ...options } = this.props;
    this.g2Instance = new PlotClass(container, options);
  }
  protected getInstance() {
    if (!this.g2Instance) {
      this.initInstance();
      this.g2Instance.render()
    } else {
      this.g2Instance.updateConfig({...this.props});
      this.g2Instance.repaint();
    }
    return this.g2Instance;
  }
  getChartView() {
    return this.g2Instance.layers[0].view;
  }

  render() {
    const g2Instance = this.getInstance();
    return <RootChartContext.Provider value={{ chart: g2Instance }}>
      <ChartViewContext.Provider value={this.getChartView()} >
        <>
        {React.Children.map(this.props.children, (item) => {
          // @ts-ignore
          return React.cloneElement(item, { key: Math.random()})
        })}
        </>
      </ChartViewContext.Provider>
    </RootChartContext.Provider>;
  }
}

const BxPlot = withContainer(BasePlot) as any;

function createPlot<IPlotConfig>(Plot): React.FunctionComponent<IPlotConfig> {

  return (props: IPlotConfig) => {
    return <ErrorBoundary>
      <BxPlot {...props} PlotClass={Plot} />
    </ErrorBoundary>
  }
}

export default createPlot;
