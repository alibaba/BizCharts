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

class Barchangepie extends React.Component {
  render() {
    var ds = new DataSet({
      state: {
        currentState: "WY"
      }
    });
    var dvForAll = ds
      .createView("populationByAge", {
        watchingStates: [] // 用空数组，使得这个实例不监听 state 变化
      }) // 在 DataSet 实例下创建名为 populationByAge 的数据视图
      .source(data);
    dvForAll
      .transform({
        // 合并列
        type: "fold",
        fields: [
          "小于5岁",
          "5至13岁",
          "14至17岁",
          "18至24岁",
          "25至44岁",
          "45至64岁",
          "65岁及以上"
        ],
        key: "age",
        value: "population"
      })
      .transform({
        type: "map",
        callback: function(row) {
          row.population = parseInt(row.population, 10);
          return row;
        }
      });
    var dvForOneState = ds.createView("populationForOneState").source(dvForAll);
    dvForOneState
      .transform({
        // 过滤数据
        type: "filter",
        callback: function(row) {
          return row.state === ds.state.currentState;
        }
      })
      .transform({
        type: "percent",
        field: "population",
        dimension: "age",
        as: "percent"
      });
    window.G2.Global.widthRatio.column = 0.95;
    return (
      <div>
        <div>
          <Chart
            data={dvForAll}
            height={400}
            forceFit={true}
            onTooltipChange={evt => {
              console.log(111);
              const items = evt.items || [];

              if (items[0]) {
                ds.setState("currentState", items[0].title);
              }
            }}
          >
            <Legend position="top" offsetY={10} />
            <Tooltip />
            <Axis
              name="population"
              label={{
                formatter: val => {
                  return val / 1000000 + "M";
                }
              }}
            />
            <Geom
              type="intervalStack"
              position="state*population"
              color="age"
              select={[
                true,
                {
                  mode: "single",
                  style: {
                    stroke: "red",
                    strokeWidth: 5
                  }
                }
              ]}
            />
          </Chart>
          <Chart data={dvForOneState} height={300} forceFit={true} padding={0}>
            <Coord type="theta" radius={0.8} />
            <Tooltip />
            <Geom type="intervalStack" position="percent" color="age">
              <Label
                content={[
                  "age*percent",
                  (age, percent) => {
                    percent = (percent * 100).toFixed(2) + "%";
                    return age + " " + percent;
                  }
                ]}
              />
            </Geom>
          </Chart>
        </div>
      </div>
    );
  }
}

export default Barchangepie;
