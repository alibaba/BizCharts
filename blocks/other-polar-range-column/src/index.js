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

import data from "./mock.json";

class Polarrangecolumn extends React.Component {
  render() {
    const { Text, Line } = Guide;
    const ds = new DataSet();
    const dv = ds
      .createView("test")
      .source(data)
      .transform({
        type: "map",

        callback(row) {
          // 加工数据后返回新的一行，默认返回行数据本身
          row.range = [row.min_temp, row.max_temp];
          return row;
        }
      });
    const cols = {
      date: {
        type: "cat"
      },
      range: {
        max: 30,
        min: -25
      },
      mean_temp: {
        alias: "Average Daily Temperature"
      }
    };
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={dv}
          scale={cols}
          forceFit
          padding={[20, 0, 105]}
        >
          <Coord type="polar" innerRadius={0.35} />
          <Legend
            offset={25}
            title={{
              fontSize: 12,
              fill: "#4F4F4F",
              fontWeight: 300,
              textAlign: "start"
            }}
            slidable={false}
            position="bottom"
            width={200}
            height={15}
            offsetX={25}
            textStyle={{
              textBaseline: "top",
              textAlign: "center"
            }}
          />
          <Axis name="date" visible={false} />
          <Axis
            name="range"
            line={null}
            tickLine={null}
            label={null}
            grid={{
              ineStyle: {
                lineDash: [0, 0],
                stroke: "#E8E8E8",
                lineWidth: 1
              }
            }}
          />
          <Tooltip />
          <Geom
            type="interval"
            position="date*range"
            color={[
              "mean_temp",
              "rgb(44, 123, 182)-rgb(0, 166, 202)-rgb(0, 204, 188)-rgb(144, 235, 157)-rgb(255, 255, 140)-rgb(249, 208, 87)-rgb(242, 158, 46)-rgb(231, 104, 24)-rgb(215, 25, 28)"
            ]}
            size={2.5}
            opacity={1}
          />
          <Guide>
            <Line
              start={{
                date: "2015-1-1",
                range: -25
              }}
              end={{
                date: "2015-1-1",
                range: 35
              }}
              lineStyle={{
                stroke: "#aaa",
                lineWidth: 1,
                lineDash: null
              }}
              text={{
                position: 0.95,
                autoRotate: false,
                style: {
                  fontSize: 16,
                  textAlign: "start",
                  fontWeight: 100,
                  fill: "#aaa"
                },
                content: "January",
                offsetX: 10
              }}
            />
          </Guide>
        </Chart>
      </div>
    );
  }
}

export default Polarrangecolumn;
