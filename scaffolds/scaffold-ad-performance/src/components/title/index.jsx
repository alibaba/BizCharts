/**
 * Common title component
 */

import React, { Component } from 'react';

import './index.scss';

export default class Title extends Component {
  render() {
    const text = '2016奥林匹克NBC传播';
    const text2 = '电视广告表现';

    return (
      <div className="title-top-container">
        <img className="title-logo" src="//img.alicdn.com/tfs/TB1RsUlem_I8KJjy0FoXXaFnVXa-1242-1083.png" />
        <span className="title-text-container">
          <font className="title-text-top">{ text2 }</font>
          <font className="title-text-bottom">{ text }</font>
          <font className="title-text-des"> &nbsp;（数据来源:Google Data Studio）</font>
        </span>
      </div>
    );
  }
}
