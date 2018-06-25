import React, { Component } from 'react';
import { Chart, Coord, Axis, Tooltip, Geom, Label } from 'bizcharts';

export default class horizon extends Component {
  render() {
    const { data } = this.props;

    return (
      <Chart
        data={data}
        height={400}
        padding={[50, 50, 50, 100]}
        forceFit
        onGetG2Instance={g2Chart => this.props.updateInstance && this.props.updateInstance(g2Chart)}
      >
        <Coord transpose />
        <Axis name="key" title={null} label={{ autoRotate: false }} />
        <Axis
          name="value"
          title={null}
          grid={null}
          line={null}
          label={null}
          tickLine={null}
        />
        <Tooltip showTitle={false} />
        <Geom
          type="interval"
          position="key*value"
          color="key"
        >
          <Label
            content="percent"
            formatter={text => `${text}%`}
          />
        </Geom>
      </Chart>
    );
  }
}
