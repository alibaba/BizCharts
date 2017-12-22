import React, { Component } from 'react';
import AxisUpdate from './axisUpdate';
import CoordUpdate from './coordUpdate';


export default class GuideUpdateChart extends Component {
  render() {
    return (
      <div className='guideupdate'>
        {/* <AxisUpdate /> */}
        <CoordUpdate/>
      </div>
    );
  }
}