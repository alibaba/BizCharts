import React, { useState, useEffect } from 'react';
import {
  Chart,
  Point,
  Line,
  Area,
  Tooltip,
  Interval,
  Legend,
  Annotation,
  Coordinate
} from '../../src';
import DataSet from '@antv/data-set';

const { DataView } = DataSet;
const dv = new DataView().source([
  { action: '浏览网站', pv: 50000 },
  { action: '放入购物车', pv: 35000 },
  { action: '生成订单', pv: 25000 },
  { action: '支付订单', pv: 15000 },
  { action: '完成交易', pv: 8000 },
]);
dv.transform({
  type: 'map',
  callback(row) {
    row.percent = row.pv / 50000;
    return row;
  },
});


function Demo() {

  return (
    <Chart
      height={600}
      data={dv.rows}
      padding={[20, 120, 95]}
      forceFit
    >
      <Tooltip
        showTitle={false}
        itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/><span style=&quot;padding-left: 16px&quot;>浏览人数：{pv}</span><br/><span style=&quot;padding-left: 16px&quot;>占比：{percent}</span><br/></li>"
      />
      <Coordinate scale={[1, -1]} transpose type="rect" />
      <Legend />
      {dv.rows.map(obj => {
          return (
            <Annotation.Text
              top={true}
              position={{
                action: obj.action,
                percent: "median"
              }}
              content={parseInt(obj.percent * 100) + "%"}
              style={{
                fill: "#fff",
                fontSize: "12",
                textAlign: "center",
                shadowBlur: 2,
                shadowColor: "rgba(0, 0, 0, .45)"
              }}
            />
          );
        })}
      <Interval
        position="action*percent"
        adjust="symmetric"
        shape="funnel"
        color={[
          "action",
          ["#0050B3", "#1890FF", "#40A9FF", "#69C0FF", "#BAE7FF"]
        ]}
        tooltip={[
          "action*pv*percent",
          (action, pv, percent) => {
            return {
              name: action,
              percent: parseInt(percent * 100) + "%",
              pv: pv
            };
          }
        ]}
        label={["action*pv",
          (action, pv) => {
            return {content: action + " " + pv};
          },
          {
            offset: 35,
            labeLine: {
              lineWidth: 1,
              stroke: "rgba(0, 0, 0, 0.15)"
            }
          }]}
      >
      </Interval>
    </Chart>
  )
}
 
export default Demo;