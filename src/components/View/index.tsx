import React from 'react';
import _isArray from '@antv/util/esm/is-array';
import _isFunction from '@antv/util/esm/is-function';
import _View from '@antv/g2/esm/chart/view';

import { ChartViewContext } from '../../hooks/useChartView';
import { RootChartContext } from '../../hooks/useRootChartInstance';
import Base, { IBaseProps } from '../../Base';
import compareProps from '../../utils/compareProps';
import uniqueId from '@antv/util/lib/unique-id';
export interface IView extends IBaseProps {
  data?: any[];
}

class View<T extends IView = IView> extends Base<T> {
  ChartBaseClass = _View;
  name = 'view';
  static defaultProps = {
    visible: true,
  }
  getInitalConfig() {
    return {};
  }
  initInstance() {
    this.id = uniqueId(this.name);
    console.log(3, this.context)
    // const options = this.getInitalConfig();
    this.g2Instance = this.context.chart.createView();
  }
  configInstance(preProps, curProps) {
    super.configInstance(preProps, curProps);
    const nextProps = this.props;
    if (_isArray(this.props.data)) {
      // console.log('data', this.props.data)
      this.g2Instance.data(this.props.data); 
    }
    compareProps(preProps, nextProps, [], (value, key) => {
      this.g2Instance[key](value);
    });
  }
  render () {
    return <ChartViewContext.Provider value={this.getInstance()}>
      <>{this.props.children}</>
    </ChartViewContext.Provider>;
  }
}

View.contextType = RootChartContext;

export default View;
