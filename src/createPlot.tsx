import React from 'react';

import _uniqId from '@antv/util/lib/unique-id';
import _isEqual from '@antv/util/lib/is-equal';
import _clone from '@antv/util/lib/clone';
import _isFunction from '@antv/util/lib/is-function';
import withContainer from './boundary/withContainer';
import ErrorBoundary from './boundary/ErrorBoundary';
import RootChartContext from './context/root';
import ChartViewContext from './context/view';
import { visibleHelper } from './utils/plotTools';

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
      setTimeout(() => {
        this.g2Instance.destroy();
        this.g2Instance = null;
      }, 0)
    }
  }

  getChartView() {
    return this.g2Instance.layers[0].view;
  }

  protected checkInstanceReady() {
    if (!this.g2Instance) {
      this.initInstance();
      this.g2Instance.render()
    } else {
      if (this.shouldChartUpdate()) {
        this.g2Instance.updateConfig({...this.props});
        this.g2Instance.render()
      }
    }
  }

  initInstance() {
    const { container, PlotClass, onGetG2Instance, children, ...options } = this.props;
    this.g2Instance = new PlotClass(container, options);
    this.g2Instance.options = _clone(options);
    if(_isFunction(onGetG2Instance)) {
      onGetG2Instance(this.g2Instance);
    }
  }

  shouldChartUpdate() {
    if (this.g2Instance) {
      const { container, PlotClass, onGetG2Instance, children, ...options } = this.props;
      const preOptions = this.g2Instance.options;
      if (_isEqual(preOptions, options)) {
        return false;
      }
      return true;
    }
    return true;
  }

  render() {
    this.checkInstanceReady();
    const chartView = this.getChartView();
    return <RootChartContext.Provider value={{ chart: this.g2Instance }}>
      {/* 每次更新都直接刷新子组件 */}
      <ChartViewContext.Provider value={chartView} >
        <div key={_uniqId('plot-chart')}>
          {this.props.children}
        </div>
      </ChartViewContext.Provider>
    </RootChartContext.Provider>;
  }
}

const BxPlot = withContainer(BasePlot) as any;

function createPlot<IPlotConfig>(Plot, name: string) {
  const Com = React.forwardRef((props: IPlotConfig, ref) => {
    // @ts-ignore
    const { title, description, ...cfg } = props;
    return <ErrorBoundary>
      <BxPlot ref={ref} title={visibleHelper(title)} description={visibleHelper(description)} {...cfg} PlotClass={Plot} />
    </ErrorBoundary>
  })
  Com.displayName = name || Plot.name;
  return Com;
}

export default createPlot;
