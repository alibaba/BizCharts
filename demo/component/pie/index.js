import React, { Component } from 'react';
import Rose from './rose';
import DonutRose from './donutRose';
import Sunburst from './sunburst';

export default class PieChart extends Component {
  render() {
    return (
      <div className='pie-charts'>
        <div className='pie-chart'>
          <Rose />
          <DonutRose />
          <Sunburst />
        </div>
      </div>
    );
  }
}