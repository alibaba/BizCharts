import React from 'react';
import { withGroupContext } from '../context/group';
import Helper from './Base/Helper';
import Base, { IBaseProps } from './Base';

export interface IImageProps extends IBaseProps, React.Props<any> {
  // 支持绘图属性
  attrs: {
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    [key: string]: any;
  };
  [key: string]: any;
}

class Image extends Base<IImageProps> {
  constructor(props) {
    super(props);
    this.helper = new Helper('image');
  }
}

export default withGroupContext<IImageProps>(Image);
