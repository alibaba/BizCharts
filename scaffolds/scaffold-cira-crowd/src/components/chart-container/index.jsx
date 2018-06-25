import React, { Component } from 'react';

import Charts from '../charts';
import data from '../../mock/data.json';
import './index.scss';

export default class ChartContainer extends Component {
  getChartInstance = (_instance) => {
    this._instance = _instance;
  }

  downloadChartScreenShot = () => {
    this._instance.downloadImage();
  }

  customInteraction1 = () => {
    // todo: 自定义操作1
  }

  customInteraction2 = () => {
    // todo: 自定义操作2
  }

  render() {
    const { item, title, style } = this.props;
    const Compo = Charts[item.type];

    return (
      <div className="chart-container" style={style}>
        <div className="header">
          <div className="title">{title}</div>
          <div className="operations">
            <div className="icon" onClick={this.customInteraction1}>
              <img src="//img.alicdn.com/tfs/TB1WY27xamWBuNjy1XaXXXCbXXa-48-48.png" />
            </div>
            <div className="icon" onClick={this.customInteraction2}>
              <img src="//img.alicdn.com/tfs/TB1Hfmaxf9TBuNjy0FcXXbeiFXa-48-48.png" />
            </div>
            <div className="icon" onClick={this.downloadChartScreenShot}>
              <img src="//img.alicdn.com/tfs/TB1HuvPxf1TBuNjy0FjXXajyXXa-128-128.png" />
            </div>
          </div>
        </div>
        <div className="content">
          <Compo data={data[item.key] || []} updateInstance={this.getChartInstance} />
        </div>
      </div>
    );
  }
}
