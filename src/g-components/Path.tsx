import React from 'react';
import { withGroupContext } from '../context/group';
import Helper from './Base/Helper';
import Base, { IBaseProps } from './Base';

export interface IImageProps extends IBaseProps, React.Props<any> {
  // 支持绘图属性
  attrs: {
    /**
     * @example
     * // 数组形式: [ [ 'M', 100, 100 ], [ 'L', 200, 200 ] ]
     * // 字符串形式: M 100,100 L 200,200
     * @type {(string | any[])}
     */
    path?: string | any[],
    [key: string]: any;
  };
  [key: string]: any;
}

class Image extends Base<IImageProps> {
  constructor(props) {
    super(props);
    this.helper = new Helper('path');
  }
}

export default withGroupContext<IImageProps>(Image);
