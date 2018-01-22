import React, { Component } from 'react';
import AddDelete from './adddelete';
import Update from './update';


export default class Guide extends Component {
  render() {
    return (
      <div>
        <AddDelete />
        <Update />
      </div>
    );
  }
}
