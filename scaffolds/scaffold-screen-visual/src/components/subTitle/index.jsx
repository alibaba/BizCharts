/*
* sub title componnet
*/
import React, { Component } from 'react';

import './index.scss';

export default class SubTitle extends Component {
  render() {
    const { text, style } = this.props;

    return (
      <div className="common-title-style" style={style || {}}>
        <div className="seperator" />
        <span>{ text }</span>
      </div>
    );
  }
}
