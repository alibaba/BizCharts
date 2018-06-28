import React, { Component } from 'react';
import { Chart, Coord, Geom, Tooltip } from 'bizcharts';

import './index.scss';

const colorGrp = ['#fb497c', '#ffc760', '#6fe621', '#4fcdff', '#4c7af3'];

export default class RosePie extends Component {
  render() {
    const { data } = this.props;

    // 排序
    data.sort((m, n) => m.value < n.value);

    return (
      <div className="pie-container">
        <div className="mock-legend">
          {
            data.map((item, index) => (
              <div className="legend-item" key={index}>
                <div className="percent" style={{ color: colorGrp[index] }}>{ (item.value).toFixed(1) }%</div>
                <div className="title">{ item.key }</div>
              </div>
            ))
          }
        </div>
        <div>
          <Chart
            height={window.innerWidth <= 1490 ? 280 : 350}
            padding={[40, 120, 0, 0]}
            data={data}
            forceFit
          >
            <Coord type="theta" radius={0.75} innerRadius={0.6} />
            <Tooltip showTitle={false} />
            <Geom
              type="intervalStack"
              position="value"
              color={['key', colorGrp]}
            />
          </Chart>
        </div>
      </div>
    );
  }
}
