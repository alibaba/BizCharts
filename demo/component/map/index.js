import React, { Component } from 'react';
import China from './china';
import Choropleth from './choropleth';


export default class MapChart extends Component {
  render() {
    return (
      <div className='map-charts'>
        <div className='map-chart-china'>
          <China />
          <Choropleth />
        </div>
      </div>
    );
  }
}
