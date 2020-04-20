import React from 'react';
import _clone from '@antv/util';

import withContainer from '@/boundary/withContainer';
import ErrorBoundary from '@/boundary/ErrorBoundary';
import RootChartContext from '@/context/root';
import ChartViewContext from '@/context/view';


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
    const chartView = this.getChartView();
    return <RootChartContext.Provider value={{ chart: g2Instance }}>
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
    return <ErrorBoundary>
      <BxPlot {...props} PlotClass={Plot} />
    </ErrorBoundary>
  }
  Com.displayName = name || Plot.name;
  return Com;
}

export default createPlot;
