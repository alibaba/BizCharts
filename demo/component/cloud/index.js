import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, Coord, Legend, Label } from 'bizcharts';
import { DataView } from '@antv/data-set';


export default class PieComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {"item":"18岁以下","count":1},
        {"item":"18-24岁","count":2},
        {"item":"25-29岁","count":1},
        {"item":"30-34岁","count":2},
        {"item":"40-49岁","count":1}
      ]
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    });
  }

  render() {
    let data = this.state.data;

    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });

    const cols = {
      percent: {
        formatter: (val) => {
          val = `${val * 100}%`;
          return val;
        },
      },
    };

    return (
      <div className="zhongce-chart-pie">
        <h4 className='zhongce-chart-pie-title'>{this.props.title}</h4>
        <Chart
          height={300}
          data={dv}
          scale={cols}
          padding={[60, 30, 60, 30]}
          forceFit={true}
        >
          <Coord type="theta" radius={0.75} />
          <Axis name="percent" />
          <Legend position="button" offsetY={0} offsetX={0} />
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              'item*percent',
              (item, percent) => {
                return {
                  name: item,
                  value: (percent * 100).toFixed(2) + '%',
                };
              },
            ]}
            style={{ lineWidth: 1, stroke: '#fff' }}
          >
            <Label
              content="percent"
              formatter={(val, item) => {
                let percent = item.point.percent;
                percent = (percent * 100).toFixed(2) + '%';
                return `${item.point.item}: ${percent}`;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}
