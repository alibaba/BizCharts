
import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, G2 } from 'bizcharts';
import { DataView } from '@antv/data-set';

const { Html } = Guide;

const data = [
  { item: 5, count: 0, title: 'xxx' },
  { item: 4, count: 0, title: 'x;ghxx' },
  { item: 3, count: 1.43, title: 'xxdgdfx' },
  { item: 2, count: 98.57, title: 'xxrgrex' },
  { item: 1, count: 0, title: 'xdfdxx' }
  ];
  const dv = new DataView();
  dv.source(data).transform({
  type: 'percent',
  field: 'count',
  dimension: 'title',
  as: 'percent'
  });
const cols = {
percent: {
formatter: val => {
val = val * 100;
return Number(val).toFixed(2)+'%';
}
}
};

export default class PieC extends Component {
  render() {
    return <Chart forceFit={false} width={250} height={250} data={[]} scale={cols} padding={[30]}>
    <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
    <Tooltip
      showTitle={false}
      itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
    />
    <Guide>
      <Html
        position={["50%", "50%"]}
        html="<div style=&quot;color:#8c8c8c;font-size:14px;text-align: center;width: 10em;&quot;>稳定性占比</div>"
        alignX="middle"
        alignY="middle"
      />
    </Guide>
    <Geom
      type="intervalStack"
      position="percent"
      color={['title', ['#FF2038','#FF9500','#FBC300','#5078F2','#2ED573']]}
      tooltip={[
        "title*percent",
        (title, percent) => {
          percent = percent * 100;
          return {
            name: title,
            value: Number(percent).toFixed(2)+'%',
          };
        }
      ]}
      style={{
        lineWidth: 1,
        stroke: "#fff"
      }}
    >
      <Label
        content="percent"
        formatter={(val, title) => {
          return val;
        }}
      />
    </Geom>
  </Chart>
  }
};