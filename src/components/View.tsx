import React from 'react';
import _pick from '@antv/util/esm/pick';
import _each from '@antv/util/esm/each';
import Base, { IBaseProps } from '../Base';
import _View from '@antv/g2/esm/chart/view';

import compareProps from '../utils/compareProps';

export interface IView extends IBaseProps {

}

export default class View<T = IView> extends Base<T> {
  ChartBaseClass = _View;
  name = 'bizcharts-view';
  static defaultProps = {
    visible: true,
  }
  getInitalConfig() {
    return {};
  }
  configInstance(preProps) {
    super.configInstance(preProps);
    const nextProps = this.props;
    compareProps(preProps, nextProps, ['data'], (value, key) => {
      this.getInstance[key](value);
    });
  }
}
