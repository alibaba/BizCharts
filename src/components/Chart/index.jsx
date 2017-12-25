/**
 * Chart Component
 */

import React from 'react';
import PropTypes from 'prop-types';
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

  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.object),
      PropTypes.object,
    ]),
    scale: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    animate: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number.isRequired,
    placeholder: PropTypes.node,
    onGetG2Instance: PropTypes.func,
  }

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
