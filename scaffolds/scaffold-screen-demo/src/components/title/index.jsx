/**
 * Common title component
 */

import React, { Component } from 'react';
import moment from 'moment';

import './index.scss';

export default class Title extends Component {
  render() {
    const { text, updateTime, startTime } = this.props;

    return (
      <div className="title-top-container">
        <img className="title-top-logo" src="//img.alicdn.com/tfs/TB1RsUlem_I8KJjy0FoXXaFnVXa-1242-1083.png" />
        <p className="title-top-text">{ text }</p>
        <p className="title-top-time"> （ 数据从 { moment(startTime).format('YYYY/MM/DD HH:mm:ss') } 开始累计，截止更新于 { moment(updateTime).format('YYYY/MM/DD HH:mm:ss') } ）</p>
      </div>
    );
  }
}
