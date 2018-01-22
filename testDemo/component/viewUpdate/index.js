import React, { Component } from 'react';
import AxisUpdate from './axisUpdate';
import CoordUpdate from './coordUpdate';
import GeomUpdate from './geomUpdate';
import GuideUpdate from './guideUpdate';


export default class GuideUpdateChart extends Component {
  render() {
    return (
      <div className='guideupdate'>
        <AxisUpdate />
        <CoordUpdate/>
        <GeomUpdate/>
        <GuideUpdate />
      </div>
    );
  }
}