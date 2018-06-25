import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";

class Basic extends React.Component {
  render() {
    const { DataView } = DataSet;
    const data = [
      {
        x: "Oceania",
        low: 1,
        q1: 9,
        median: 16,
        q3: 22,
        high: 24
      },
      {
        x: "East Europe",
        low: 1,
        q1: 5,
        median: 8,
        q3: 12,
        high: 16
      },
      {
        x: "Australia",
        low: 1,
        q1: 8,
        median: 12,
        q3: 19,
        high: 26
      },
      {
        x: "South America",
        low: 2,
        q1: 8,
        median: 12,
        q3: 21,
        high: 28
      },
      {
        x: "North Africa",
        low: 1,
        q1: 8,
        median: 14,
        q3: 18,
        high: 24
      },
      {
        x: "North America",
        low: 3,
        q1: 10,
        median: 17,
        q3: 28,
        high: 30
      },
      {
        x: "West Europe",
        low: 1,
        q1: 7,
        median: 10,
        q3: 17,
        high: 22
      },
      {
        x: "West Africa",
        low: 1,
        q1: 6,
        median: 8,
        q3: 13,
        high: 16
      }
    ];
    const dv = new DataView().source(data);
    dv.transform({
      type: "map",
      callback: obj => {
        obj.range = [obj.low, obj.q1, obj.median, obj.q3, obj.high];
        return obj;
      }
    });
    const cols = {
      range: {
        max: 35
      }
    };
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={dv}
          scale={cols}
          padding={[20, 120, 95]}
          forceFit
        >
          <Axis name="x" />
          <Axis name="range" />
          <Tooltip
            showTitle={false}
            crosshairs={{
              type: "rect",
              style: {
                fill: "#E4E8F1",
                fillOpacity: 0.43
              }
            }}
            itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/><span style=&quot;padding-left: 16px&quot;>最大值：{high}</span><br/><span style=&quot;padding-left: 16px&quot;>上四分位数：{q3}</span><br/><span style=&quot;padding-left: 16px&quot;>中位数：{median}</span><br/><span style=&quot;padding-left: 16px&quot;>下四分位数：{q1}</span><br/><span style=&quot;padding-left: 16px&quot;>最小值：{low}</span><br/></li>"
          />

          <Geom
            type="schema"
            position="x*range"
            shape="box"
            tooltip={[
              "x*low*q1*median*q3*high",
              (x, low, q1, median, q3, high) => {
                return {
                  name: x,
                  low,
                  q1,
                  median,
                  q3,
                  high
                };
              }
            ]}
            style={{
              stroke: "rgba(0, 0, 0, 0.45)",
              fill: "#1890FF",
              fillOpacity: 0.3
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Basic;
