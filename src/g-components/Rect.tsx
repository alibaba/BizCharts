import React from 'react';
import { withGroupContext } from '../context/group';
import Helper from './Base/Helper';
import Base, { IBaseProps } from './Base';

export interface IRectProps extends IBaseProps, React.Props<any> {
  // 支持绘图属性
  attrs: {
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    radius?: number,
    [key: string]: any;
  };
  [key: string]: any;
}

class Rect extends Base<IRectProps> {
  constructor(props) {
    super(props);
    this.helper = new Helper('rect');
  }
}

export default withGroupContext<IRectProps>(Rect);
