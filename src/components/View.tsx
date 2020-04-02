import React from 'react';
import _pick from '@antv/util/esm/pick';
import _each from '@antv/util/esm/each';
import _isArray from '@antv/util/esm/is-array';
import { ChartViewContext } from '../hooks/useChartView';

import Base, { IBaseProps } from '../Base';
import _View from '@antv/g2/esm/chart/view';

import compareProps from '../utils/compareProps';

export interface IView extends IBaseProps {
  data?: any[];
}

export default class View<T extends IView = IView> extends Base<T> {
  ChartBaseClass = _View;
  name = 'view';
  static defaultProps = {
    visible: true,
  }
  getInitalConfig() {
    return {};
  }
  configInstance(preProps) {
    super.configInstance(preProps);
    const nextProps = this.props;
    if (_isArray(this.props.data)) {
      console.log('data', this.props.data)
      this.g2Instance.data(this.props.data); 
    }
    compareProps(preProps, nextProps, [], (value, key) => {
      this.g2Instance[key](value);
    });
  }
  render () {
    super.render();
    return <ChartViewContext.Provider value={this.g2Instance}>
      <>{this.props.children}</>
    </ChartViewContext.Provider>;
  }
}
