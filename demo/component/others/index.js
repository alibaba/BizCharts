import React, { Component } from 'react';
import HtmlTooltip from './htmlTooltip';
import CustomLegend from './customLegend';
import Venn from './venn';


export default class OtherChart extends Component {
  render() {
    return (
      <div className='cust-charts'>
        <div className='cust-chart-china'>
          <HtmlTooltip />
          <CustomLegend />
          <Venn />
        </div>
      </div>
    );
  }
}