import React, { Component } from 'react';
import Arc from './arc';


export default class RelationChart extends Component {
  render() {
    return (
      <div className='relation-charts'>
        <div className='relation-chart-demo'>
          <Arc />
        </div>
      </div>
    );
  }
}