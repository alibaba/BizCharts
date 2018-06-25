import React, { Component } from 'react';
import { Chart, Coord, Axis, Geom, Label } from 'bizcharts';

export default class pie extends Component {
  render() {
    const { data } = this.props;

    return (
      <Chart
        data={data}
        height={400}
        padding={50}
        forceFit
        onGetG2Instance={g2Chart => this.props.updateInstance && this.props.updateInstance(g2Chart)}
      >
        <Coord type="theta" radius={0.75} />
        <Axis name="value" />
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
