import React, { Component } from 'react';
import Heatmap from './heatmap';
import Image from './image';
import Reactangle from './rectangle';


export default class HeatmapChart extends Component {
  render() {
    return (
      <div className='headmap-charts'>
        <div className='headmap-chart'>
          <Heatmap />
          <Image />
          <Reactangle />
        </div>
      </div>
    );
  }
}