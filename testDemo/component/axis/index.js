import React, { Component } from 'react';
import AddDelete from './adddelete';
import UpdateRect from './updateRect';


export default class Guide extends Component {
  render() {
    return (
      <div>
        <AddDelete />
        <UpdateRect />
      </div>
    );
  }
}
