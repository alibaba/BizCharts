import React, { Component } from 'react';
import Basic from './basic';
import Series from './series';
import Step from './step';


export default class LineChart extends Component {
  render() {
    return (
      <div className='line-charts'>
        <div className='line-chart-basic'>
          <Basic />
          <Series />
          <Step />
        </div>
      </div>
    );
  }
}