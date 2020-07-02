import React from 'react';
import Helper from './Helper';

export * from './Helper';

class Base<T> extends React.Component<T> {
  helper: Helper;
  componentWillUnmount() {
    this.helper.destroy();
  }
  render() {
    this.helper.update(this.props);
    return null;
  }
}

export default Base;
