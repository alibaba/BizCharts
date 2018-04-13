import React, { Component } from 'react';
import Basic from './basic';
import Symmetric from './symmetric';


export default class FunnelChart extends Component {
  render() {
    return (
      <div className='funnel-charts'>
        <div className='funnel-chart'>
          <Basic />
          <Symmetric />
        </div>
      </div>
    );
  }
}
