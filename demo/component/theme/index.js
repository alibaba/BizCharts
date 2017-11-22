import React, { Component } from 'react';
import Black from './black';


export default class ThemeChart extends Component {
  render() {
    return (
      <div className='theme-charts'>
        <div className='theme-chart-demo'>
          <Black />
        </div>
      </div>
    );
  }
}