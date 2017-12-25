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
  render() {
    const { data, width, height, placeholder } = this.props;
    return (<div>
      {
        hasSource(data) ?
          <PureChart {...this.props} /> :
          <Empty width={width} height={height} placeholder={placeholder} />
      }
    </div>);
  }
}
