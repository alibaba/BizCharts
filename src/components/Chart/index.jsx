/**
 * Chart Component
 */

import React, { Component } from 'react';
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

export default class Chart extends Component {

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

    return (<div>
      {
        hasSource(data) ?
          <PureChart ref={this._refCallback} {...this.props} /> :
          <Empty width={width} height={height} placeholder={placeholder} />
      }
    </div>);
  }
}
