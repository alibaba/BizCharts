import React, { Component } from 'react';
import RegionFilterGuide2 from './regionFilter-guide2';
import DataMarkerDataRegion from './dataMarker_dataRegion';
import RegionFilterRealtime from './regionFilter-realtime';

export default class GuageChart extends Component {
  render() {
    return (
      <div className='guide'>
        <RegionFilterRealtime/>
        <RegionFilterGuide2 />
        <DataMarkerDataRegion />
      </div>
    );
  }
}
