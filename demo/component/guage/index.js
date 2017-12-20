import React, { Component } from 'react';
import Basic from './basic';
import Color from './color';
// import GuideChart from './guide';
// import ListFacet from './listFacet';


export default class GuageChart extends Component {
  render() {
    return (
      <div className='guage'>
        <div className='guage-basic'>
          {/* <Basic /> */}
          <Color />
        </div>
      </div>
    );
  }
}