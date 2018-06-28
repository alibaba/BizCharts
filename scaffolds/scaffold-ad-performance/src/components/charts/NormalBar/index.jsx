import React, { Component } from 'react';
import { Chart, Geom, Axis, Label, Tooltip } from 'bizcharts';
import './index.scss';

export default class NormalBar extends Component {
  render() {
    const width = 350;
    const { data, text, color, xPos, yPos, height } = this.props;
    const relHeight = height || 150;
    const scale = {};
    scale[yPos] = {
      tickCount: 3,
    };

    return (
      <div className="bar-container">
        <div className="bar-title">{text}</div>
        <Chart
          data={data}
          scale={scale}
          height={relHeight}
          width={width}
          padding="auto"
          forceFit
        >
          <Axis name={xPos} line={{ stroke: 'black', lineWidth: 0.3 }} />
          <Axis name={yPos} line={null} />
          <Tooltip />
          <Geom type="interval" position={`${xPos}*${yPos}`} color={color} opacity={1}>
            <Label content={yPos} offset={-10} />
          </Geom>
        </Chart>
      </div>
    );
  }
}
