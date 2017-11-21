import React, { Component } from 'react';
import List from './list';


export default class FacetChart extends Component {
  render() {
    return (
      <div className='pie-charts'>
        <div className='pie-chart'>
          <List />
        </div>
      </div>
    );
  }
}