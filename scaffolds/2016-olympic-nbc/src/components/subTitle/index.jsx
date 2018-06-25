import React, { Component } from 'react';

import './index.scss';

export default class SubTitle extends Component {
  render() {
    const { text, bgColor, imageSrc } = this.props;

    return (
      <div
        className="subtitle-container"
        style={{
          backgroundColor: bgColor,
        }}
      >
        <img className="subtitle-logo" src={imageSrc} />
        <p className="subtitle-text"> {text} </p>
      </div>
    );
  }
}
