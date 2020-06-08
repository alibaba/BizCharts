import React from 'react';
import { withGroupContext } from '../context/group';
import Helper from './Base/Helper';
import Base, { IBaseProps } from './Base';

export interface IPolygonProps extends IBaseProps, React.Props<any> {
  // 支持绘图属性
  attrs: {
    points?: [number, number][],
    [key: string]: any;
  };
  [key: string]: any;
}

class Polygon extends Base<IPolygonProps> {
  constructor(props) {
    super(props);
    this.helper = new Helper('polygon');
  }
}

export default withGroupContext<IPolygonProps>(Polygon);
