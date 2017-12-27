/**
 * Chart Component
 */

import React from 'react';
import Util from '../../shared/util';
import PureChart from './purechart';
import Empty from './empty';

function hasSource(source) {
  let flag;

  if (source == null) {
    flag = false;
  } else if (Util.isArray(source)) {
    flag = source[0];
  } else {
    flag = true;
  }

  return !!flag;
}

export default class Chart extends (React.PureComponent || React.Component) {
  getG2Instance() {
    return this.chart;
  }
  _refCallback = (c) => {
    if (c) {
      this.chart = c.getG2Instance();
    }
  }
  render() {
    const { data, width, height, placeholder } = this.props;
    let hasView = false;
    if (!hasSource(data)) {
      React.Children.map(this.props.children, function (child) {
        if (typeof (child.type) === 'function' && child.type.name === 'View' && child.props.data && hasSource(child.props.data)) {
          hasView = true;
        }
      });
    }
    return (<div>
      {
        (hasSource(data) || hasView) ?
          <PureChart ref={this._refCallback} {...this.props} /> :
          <Empty width={width} height={height} placeholder={placeholder} />
      }
    </div>);
  }
}
