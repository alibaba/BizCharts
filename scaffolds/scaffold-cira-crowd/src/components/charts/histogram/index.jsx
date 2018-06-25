import React, { Component } from 'react';
import { Chart, Axis, Tooltip, Geom, Label } from 'bizcharts';

export default class histogram extends Component {
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
