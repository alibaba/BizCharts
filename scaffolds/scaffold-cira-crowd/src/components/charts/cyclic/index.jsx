import React, { Component } from 'react';
import { Chart, Coord, Axis, Geom, Label, Tooltip } from 'bizcharts';

export default class cyclic extends Component {
  render() {
    const { data } = this.props;

    return (
      <Chart
        data={data}
        height={400}
        padding={20}
        forceFit
        onGetG2Instance={g2Chart => this.props.updateInstance && this.props.updateInstance(g2Chart)}
      >
        <Coord type="theta" radius={0.75} innerRadius={0.6} />
        <Axis name="value" />
        <Tooltip showTitle={false} />
        <Geom
          type="intervalStack"
          position="value"
          color="key"
        >
          <Label
            content="value"
            formatter={(val, item) => `${item.point.key}: ${val}%`}
          />
        </Geom>
      </Chart>
    );
  }
}
