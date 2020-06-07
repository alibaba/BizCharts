import React from 'react';
import Helper from './Helper';

export * from './Helper';

class Base<T> extends React.Component<T> {
  helper: Helper;
  render() {
    this.helper.update(this.props);
    return null;
  }
}

export default Base;
