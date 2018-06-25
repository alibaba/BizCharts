import React, { Component } from 'react';
import { Chart, Geom, Axis, Coord, Label, Tooltip } from 'bizcharts';
import './index.scss';

export default class Bar extends Component {
  render() {
    const width = 260;
    const { data, text, color, xPos, yPos, height, showPercent } = this.props;
    const relHeight = height || 240;
    const scale = {};
    scale[yPos] = {
      formatter: !showPercent ? null : (val) => {
        val = `${val * 100}%`;
        return val;
      },
      tickCount: 5,
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
          <Coord transpose />
          <Axis name={xPos} grid={null} line={null} tickLine={null} />
          <Axis name={yPos} line={{ stroke: 'black', lineWidth: 0.3 }} />
          <Tooltip />
          <Geom
            type="interval"
            position={`${xPos}*${yPos}`}
            color={color}
            opacity={1}
          >
            <Label content={yPos} offset={-10} />
          </Geom>
        </Chart>
      </div>
    );
  }
}
