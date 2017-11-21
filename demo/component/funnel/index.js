import React, { Component } from 'react';
import Basic from './basic';


export default class FunnelChart extends Component {
  render() {
    return (
      <div className='funnel-charts'>
        <div className='funnel-chart'>
          <Basic />
        </div>
      </div>
    );
  }
}