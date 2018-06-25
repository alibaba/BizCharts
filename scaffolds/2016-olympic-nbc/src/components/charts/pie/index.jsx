import React, { Component } from 'react';
import { Chart, Geom, Coord, Label, Tooltip, Legend } from 'bizcharts';
import './index.scss';

export default class Pie extends Component {
  render() {
    const height = 260;
    const width = 350;
    const { data, text, color } = this.props;
    const scale = {
      value: {
        formatter: (val) => {
          val = `${val * 100}%`;
          return val;
        },
      },
    };

    return (
      <div className="bar-container">
        <div className="bar-title">{text}</div>
        <Chart
          data={data}
          scale={scale}
          height={height}
          width={width}
          padding="auto"
          forceFit
        >
          <Coord type="theta" radius={0.9} innerRadius={0.6} />
          <Tooltip />
          <Legend position="right" offsetY={-80} />
          <Geom type="intervalStack" position="value" color={color}>
            <Label content="value" offset={-8} />
          </Geom>
        </Chart>
      </div>
    );
  }
}
