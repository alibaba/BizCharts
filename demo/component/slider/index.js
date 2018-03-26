import React, { Component } from 'react';
import Basic from './basic';


export default class SliderChart extends Component {
  render() {
    return (
      <div className='slider-charts'>
        <div className='candlestick'>
          <Basic />
        </div>
      </div>
    );
  }
}
