/**
 * Chart Component
 */

import React from 'react';
import PureChart from './purechart';
import Empty from './empty';
import ErrorBoundary from '../ErrorBoundary';


function hasSource(source) {
  let flag = true;

  if (source == null || source.length === 0 || (source.rows && source.rows.length === 0)) {
    flag = false;
  }

  return !!flag;
}

class Chart extends (React.PureComponent || React.Component) {
  getG2Instance() {
    return this.chart;
  }

  _refCallback = (c) => {
    if (c) {
      this.chart = c.getG2Instance();
    }
  }

  hasViewSource = () => {
    let hasViewSource = false;
    React.Children.map(this.props.children, (child) => {
      if (!hasViewSource && child && typeof (child.type) === 'function' && child.type.name === 'View' && child.props.data && hasSource(child.props.data)) {
        hasViewSource = true;
      }
    });
    return hasViewSource;
  }

  render() {
    const { data, width, height, placeholder, className, style } = this.props;
    return (
      <div className={className} style={style}>
        {
          (hasSource(data) || this.hasViewSource() || !placeholder) ?
            <PureChart ref={this._refCallback} {...this.props} /> :
            <Empty
              width={width}
              height={height}
              placeholder={placeholder === true ? undefined : placeholder}
            />
        }
      </div>
    );
  }
}


export default class BChart extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Chart {...this.props} />
      </ErrorBoundary>
    );
  }
}
