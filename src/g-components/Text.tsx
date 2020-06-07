import React from 'react';
import { withGroupContext } from '../context/group';
import Helper from './Base/Helper';
import Base, { IBaseProps } from './Base';

export interface ITextProps extends IBaseProps, React.Props<any> {
  // 支持绘图属性
  attrs: {
    x?: number,
    y?: number,
    text?: number,
    [key: string]: any;
  };
  [key: string]: any;
}

class Text extends Base<ITextProps> {
  constructor(props) {
    super(props);
    this.helper = new Helper('text');
  }
}

export default withGroupContext<ITextProps>(Text);
