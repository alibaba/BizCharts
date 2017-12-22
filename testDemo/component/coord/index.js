import React, { Component } from 'react';
import AddDelete from './adddelete';
import UpdatePolar from './updatePolar';
import UpdateHelix from './updateHelix';
import UpdateRect from './updateRect';
import UpdateTheta from './updateTheta';


export default class Guide extends Component {
  render() {
    return (
      <div>
        <AddDelete />
        <UpdateHelix />
        <UpdatePolar />
        <UpdateRect />
        <UpdateTheta />
      </div>
    );
  }
}
