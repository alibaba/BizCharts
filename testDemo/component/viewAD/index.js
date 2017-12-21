import React, { Component } from 'react';
import ViewAD from './viewAD';
import GeomAD from './geomAD';
import LabelAd from './labelAD';
import GuideAD from './guideAD';
import GuideAD2 from './guideAD2';
import AxisAd from './axisAD';
import CoordAd from './coordAD';


export default class ViewChart extends Component {
  render() {
    return (
      <div className='line-charts'>
        <div className='line-chart-basic'>
          <ViewAD />
          <GeomAD />
          <LabelAd />
          <GuideAD/>
          <GuideAD2 />
          <AxisAd/>
          <CoordAd/>
        </div>
      </div>
    );
  }
}