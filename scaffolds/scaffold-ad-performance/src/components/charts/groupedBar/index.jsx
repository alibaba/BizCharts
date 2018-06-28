import React, { Component } from 'react';
import { Chart, Geom, Axis, Label, Legend, Tooltip } from 'bizcharts';
import './index.scss';

export default class GroupedBar extends Component {
  render() {
    const height = 240;
    const width = 350;
    const { data, text, color, xPos, yPos, label, barDes } = this.props;
    const scale = {};
    scale[yPos] = {
      tickCount: 4,
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
          <Axis name={yPos} grid={null} />
          <Axis name={xPos} line={{ stroke: 'black', lineWidth: 0.3 }} />
          <Legend position="top" />
          <Tooltip />
          <Geom
            type="interval"
            position={`${xPos}*${yPos}`}
            color={color}
            opacity={1}
            adjust={[{ type: 'dodge', marginRatio: 1 / 3 }]}
          >
            <Label content={label} offset={-10} />
          </Geom>
        </Chart>
        <div className="bar-des">
          <span>{barDes}</span>
        </div>
      </div>
    );
  }
}
