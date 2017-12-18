import React, { Component } from 'react';
import Basic from './basic';
import ViewChart from './view';
import GuideChart from './guide';


export default class LineChart extends Component {
  render() {
    return (
      <div className='line-charts'>
        <div className='line-chart-basic'>
          {/* <Basic /> */}
          <ViewChart />
          {/* <GuideChart /> */}
        </div>
      </div>
    );
  }
}