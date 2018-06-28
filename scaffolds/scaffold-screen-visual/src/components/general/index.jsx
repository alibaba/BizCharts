import React, { Component } from 'react';

import SubTitle from '../subTitle';
import Utils from '../../utils';

import './index.scss';

const { formatterNumber } = Utils;

export default class General extends Component {
  render() {
    return (
      <div className="trading-volumn-ranking">
        <SubTitle text="总成交金额" />
        <div className="all-account-num">
          <div className="all-account-triangle" />
          {formatterNumber(12345678901)}
        </div>
        <div className="table-container">
          {
            [
              { title: '总成交订单数', num: formatterNumber(123456) },
              { title: '总成交商家数', num: formatterNumber(3456) },
              { title: '总成交门店数', num: formatterNumber(3456) },
              { title: 'POS成交订单数', num: formatterNumber(0) },
            ].map((item, index) => (
              <div className="table-detial" key={index}>
                <p className="desc-name">{ item.title }</p>
                <span className="desc-num">{ item.num }</span>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
