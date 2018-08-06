import React, { Component } from 'react';
import RegionFilterGuide2 from './regionFilter-guide2';
import DataMarkerDataRegion from './dataMarker_dataRegion';

export default class GuageChart extends Component {
  render() {
    return (
      <div className='guide'>
        <RegionFilterGuide2 />
        <DataMarkerDataRegion />
      </div>
    );
  }
}
