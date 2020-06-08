import React from 'react';
import { withGroupContext } from '../context/group';
import Helper from './Base/Helper';
import Base, { IBaseProps } from './Base';

export interface IMarkerProps extends IBaseProps, React.Props<any> {
  // 支持绘图属性
  attrs: {
    x?: number,
    y?: number,
    r?: number,
    symbol?: number,
    [key: string]: any;
  };
  [key: string]: any;
}

class Marker extends Base<IMarkerProps> {
  constructor(props) {
    super(props);
    this.helper = new Helper('marker');
  }
}

export default withGroupContext<IMarkerProps>(Marker);
