import React, { Component } from 'react';
import Basic from './basic';


export default class LineChart extends Component {
  render() {
    return (
      <div className='line-charts'>
        <div className='line-chart-basic'>
          <Basic />
        </div>
      </div>
    );
  }
}