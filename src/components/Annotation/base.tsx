import React from 'react';
import './reactElement/component';
import _Annotation from '@antv/g2/lib/chart/controller/annotation';
import * as _ from '@antv/util';
import ChartViewContext from '../../context/view';
import { registerComponentController } from '../../core';

import { AnnotationBaseOption } from '../../interface';

registerComponentController('annotation', _Annotation);

export interface IAnnotationBaseProps extends AnnotationBaseOption {
  chartIns?: any;
  [key: string]: any;
}

// 4.0之后称为Annotation，为了名字统一
abstract class Annotation<PropsI> extends React.Component<PropsI, any> {
  static contextType: any;
  protected annotation: any;
  protected id: string;
  protected annotationType: string = 'line'; // 默认为line类型的guide
  protected index: number;

  componentDidMount() {
    const chartIns = this.getChartIns();
    this.id = _.uniqueId('annotation');
    this.annotation = chartIns.annotation();
    // this.annotation[this.annotationType](this.props);
    if (this.annotationType === 'ReactElement') {
      this.annotation.annotation({
        type: 'html',
        isReactElement: true,
        ...this.props
      });
    } else {
      this.annotation.annotation({
        type: this.annotationType,
        ...this.props
      });
    }
    this.annotation.option[this.annotation.option.length - 1].__id = this.id;
  }
  componentDidUpdate() {
    let index = null;
    this.annotation.option.forEach((item, i) => {
      if (item.__id === this.id) {
        index = i;
      }
    });
    if (this.annotationType === 'ReactElement') {
      this.annotation.option[index] = { type: 'html', isReactElement: true, ...this.props, __id: this.id };
    } else {
      this.annotation.option[index] = { type: this.annotationType, ...this.props, __id: this.id };
    }
  }
  componentWillUnmount() {
    let index = null;
    if (!this.annotation) {
      return;
    }
    this.annotation.option.forEach((item, i) => {
      if (item.__id === this.id) {
        index = i;
      }
    });
    if (index !== null) {
      this.annotation.option.splice(index, 1);
    }
    this.annotation = null;
  }
  getChartIns() {
    return this.context as any;
  }
  render() {
    return <React.Fragment />;
  }
}

Annotation.contextType = ChartViewContext;

export default Annotation;
