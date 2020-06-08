import React from 'react';
import { withGroupContext } from '../context/group';
import Helper from './Base/Helper';
import Base, { IBaseProps } from './Base';

export interface ILineProps extends IBaseProps, React.Props<any> {
  // 支持绘图属性
  attrs: {
    x1?: number,
    y1?: number,
    x2?: number,
    y2?: number,
    [key: string]: any;
  };
  [key: string]: any;
}

class Line extends Base<ILineProps> {
  constructor(props) {
    super(props);
    this.helper = new Helper('line');
  }
}

export default withGroupContext<ILineProps>(Line);
