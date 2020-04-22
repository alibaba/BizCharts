import React from 'react';

import withContainer from './boundary/withContainer';
import ErrorBoundary from './boundary/ErrorBoundary';
import RootChartContext from './context/root';
import ChartViewContext from './context/view';


class BasePlot extends React.Component<any> {
  g2Instance: any;
  componentDidMount() {
    if (this.props.children) {
      this.getChartView().render();
    }
  }
  componentDidUpdate() {
    if (this.props.children) {
      this.getChartView().render();
    }
  }
  componentWillUnmount() {
    if(this.g2Instance) {
      this.g2Instance.destroy();
    }
  }

  protected checkInstanceReady() {
    if (!this.g2Instance) {
      this.initInstance();
      this.g2Instance.render()
    } else {
      this.g2Instance.updateConfig({...this.props});
      this.g2Instance.render();
    }
  }

  getChartView() {
    return this.g2Instance.layers[0].view;
  }

  initInstance() {
    const { container, PlotClass, ...options } = this.props;
    this.g2Instance = new PlotClass(container, options);
  }

  render() {
    this.checkInstanceReady();
    const chartView = this.getChartView();
    return <RootChartContext.Provider value={{ chart: this.g2Instance }}>
      <ChartViewContext.Provider value={chartView} >
        <>
        {this.props.children}
        </>
      </ChartViewContext.Provider>
    </RootChartContext.Provider>;
  }
}

const BxPlot = withContainer(BasePlot) as any;

function createPlot<IPlotConfig>(Plot, name: string): React.FunctionComponent<IPlotConfig> {
  const Com = (props: IPlotConfig) => {
    if (this.props.data === undefined) {
      this.destroy();
      return <ErrorBoundary>
        {this.props.placeholder ||  <div style={{ position: 'relative', top: '48%', textAlign: 'center' }}>暂无数据</div>}
      </ErrorBoundary>
    }
    return <ErrorBoundary>
      <BxPlot {...props} PlotClass={Plot} />
    </ErrorBoundary>
  }
  Com.displayName = name || Plot.name;
  return Com;
}

export default createPlot;
