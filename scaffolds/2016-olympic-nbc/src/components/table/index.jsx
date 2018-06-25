import React, { Component } from 'react';

import './index.scss';

export default class TableChart extends Component {
  render() {
    const { text } = this.props;
    return (
      <div className="table-container">
        <div className="table-title">{ text }</div>
        <table className="table-val">
          <tbody>
            <tr>
              <td className="table-subTitle">宝马</td>
              <td className="table-value">3.2</td>
            </tr>
            <tr>
              <td className="table-subTitle">可口可乐</td>
              <td className="table-value">2.01</td>
            </tr>
            <tr>
              <td className="table-subTitle">麦当劳</td>
              <td className="table-value">1.57</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
