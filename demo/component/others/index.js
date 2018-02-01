import React, { Component } from 'react';
import HtmlTooltip from './htmlTooltip';
import CustomLegend from './customLegend';


export default class OtherChart extends Component {
  render() {
    return (
      <div className='cust-charts'>
        <div className='cust-chart-china'>
          <HtmlTooltip />
          <CustomLegend />
        </div>
      </div>
    );
  }
}