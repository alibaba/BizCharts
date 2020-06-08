import React from 'react';
import { withGroupContext } from '../context/group';
import Helper from './Base/Helper';
import Base, { IBaseProps } from './Base';

export interface ICircleProps extends IBaseProps, React.Props<any> {
  // 支持绘图属性
  attrs: {
    x?: number,
    y?: number,
    r?: number,
    [key: string]: any;
  };
  [key: string]: any;
}

class Circle extends Base<ICircleProps> {
  constructor(props) {
    super(props);
    this.helper = new Helper('circle');
  }
}

export default withGroupContext<ICircleProps>(Circle);
