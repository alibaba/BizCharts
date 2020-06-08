import React from 'react';
import { withGroupContext } from '../context/group';
import Helper from './Base/Helper';
import Base, { IBaseProps } from './Base';

export interface IEllipseProps extends IBaseProps, React.Props<any> {
  // 支持绘图属性
  attrs: {
    x?: number,
    y?: number,
    rx?: number,
    ry?: number,
    [key: string]: any;
  };
  [key: string]: any;
}

class Ellipse extends Base<IEllipseProps> {
  constructor(props) {
    super(props);
    this.helper = new Helper('ellipse');
  }
}

export default withGroupContext<IEllipseProps>(Ellipse);
