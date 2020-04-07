import React from 'react';
import { RootChartContext } from '../../hooks/useRootChartInstance';
import * as _ from '@antv/util';

export interface IAnnotationBaseProps {
  chartIns?: any;
  [key: string]: any;
}

// 4.0之后称为Annotation，为了名字统一
abstract class Annotation<PropsI extends IAnnotationBaseProps> extends React.Component<PropsI, any> {
  protected annotation: any;
  protected id: string;
  protected type: string = 'line'; // 默认为line类型的guide
  protected index: number;
  getChartIns() {
    return this.context;
  }
  componentDidMount() {
    const chartIns = this.getChartIns();
    this.id = _.uniqueId('annotation');
    this.annotation = chartIns.annotation();
    const t = this.annotation[this.type](this.props);
    this.annotation.options[this.annotation.options.length - 1].__id = this.id;
  }
  componentDidUpdate() {
    let index = null;
    this.annotation.options.find((item, i) => {
      if (item.__id === this.id) {
        index = i;
      }
    });
    this.annotation.options[index] = { type: this.type, ...this.props, __id: this.id };
    // fixme: 需要判断view的情况
    this.getChartIns().repaint();
  }
  componentWillUnmount() {
    let index = null;
    if (!this.annotation) {
      return;
    }
    this.annotation.options.find((item, i) => {
      if (item.__id === this.id) {
        index = i;
      }
    });
    if (index !== null) {
      this.annotation.options.splice(index, 1);
    }
    this.annotation = null;
  }
  render() {
    return null;
  }
}

Annotation.contextType = RootChartContext;

export default Annotation;
