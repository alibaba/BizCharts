import React, { Component } from 'react';
import Basic from './basic';
import ViewChart from './view';
import GuideChart from './guide';
import ListFacet from './listFacet';


export default class LineChart extends Component {
  render() {
    return (
      <div className='line-charts'>
        <div className='line-chart-basic'>
          <Basic />
          <ViewChart />
          <GuideChart />
          <ListFacet />
        </div>
      </div>
    );
  }
}