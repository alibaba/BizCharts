import React from 'react';
import Base, { IBaseProps } from '../Base';
import uniqueId from '@antv/util/lib/unique-id';
import { ChartViewContext } from '../hooks/useChartView';

import compareProps from '../utils/compareProps';

// 交互事件
import './actions';

export interface IBaseGemo extends IBaseProps {}

export default abstract class BaseGeom<T> extends Base<T> {
  name = 'gemo';
  ChartBaseClass = null;
  protected readonly abstract GemoBaseClassName: string;
  getInitalConfig() {
    return undefined;
  }
  initInstance() {
    const chart = this.context;
    this.id = uniqueId(this.name);
    const options = this.getInitalConfig();
    this.g2Instance = chart[this.GemoBaseClassName](options);
  }
  configInstance(preProps) {
    super.configInstance(preProps);
    const nextProps = this.props;
    compareProps(preProps, nextProps, ['position', 'color'], (value, key) => {
      // console.log('position', value);
      this.g2Instance[key](...value);
    });
  }
}

BaseGeom.contextType = ChartViewContext;
