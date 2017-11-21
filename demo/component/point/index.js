import React, { Component } from 'react';
import Jitter from './jitter';
import Bubble from './bubble';

export default class PointChart extends Component {
  render() {
    return (
      <div className='point-charts'>
        <div className='point-chart-demo'>
          <Jitter />
          <Bubble />
        </div>
      </div>
    );
  }
}