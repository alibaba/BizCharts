import React, { Component } from 'react';
import Basic from './basic';
import Percent from './percent';
import Stacked from './stacked';


export default class AreaChart extends Component {
  render() {
    return (
      <div className='Area-charts'>
        <div className='Area-chart-basic'>
          <Basic />
        </div>
        <div className='Area-chart-Percent'>
          <Percent />
        </div>
        <div className='Area-chart-Stacked'>
          <Stacked />
        </div>
      </div>
    );
  }
}