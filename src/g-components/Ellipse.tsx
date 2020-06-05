import React from 'react';
import { withGroupContext } from '../context/group';
import Helper from './Helper';

export interface ICircleProps extends React.Props<any> {
  [key: string]: any;
}

class Circle extends React.Component<ICircleProps> {
  helper: Helper;
  constructor(props) {
    super(props);
    this.helper = new Helper('ellipse');
  }
  componentWillUnmount() {
    this.helper.destroy();
  }
  render() {
    this.helper.update(this.props)
    return null;
  }
}

export default withGroupContext<ICircleProps>(Circle);
