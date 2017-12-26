import React, { Component } from 'react';
import Basic from './basic';
import Color from './color';
import Text from './text';


export default class GuageChart extends Component {
  render() {
    return (
      <div className='guage'>
        <div className='guage-basic'>
          <Basic />
          <Color />
          <Text />
        </div>
      </div>
    );
  }
}