import React from 'react';
import { withGroupContext } from '../context/group';
import Helper from './Base/Helper';
import Base, { IBaseProps } from './Base';

export interface IPolylineProps extends IBaseProps, React.Props<any> {
  // 支持绘图属性
  attrs: {
    points?: [number, number][],
    [key: string]: any;
  };
  [key: string]: any;
}

class Polyline extends Base<IPolylineProps> {
  constructor(props) {
    super(props);
    this.helper = new Helper('polyline');
  }
}

export default withGroupContext<IPolylineProps>(Polyline);
