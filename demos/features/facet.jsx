import React from "react";
import { Chart, Tooltip, Coord, Legend, Facet } from "../../src";
import DataSet from "@antv/data-set";

class Columntree extends React.Component {
  render() {
    const data = [
      {
        gender: "男",
        count: 40,
        class: "一班",
        grade: "一年级",
      },
      {
        gender: "女",
        count: 30,
        class: "一班",
        grade: "一年级",
      },
      {
        gender: "男",
        count: 35,
        class: "二班",
        grade: "一年级",
      },
      {
        gender: "女",
        count: 45,
        class: "二班",
        grade: "一年级",
      },
      {
        gender: "男",
        count: 20,
        class: "三班",
        grade: "一年级",
      },
      {
        gender: "女",
        count: 35,
        class: "三班",
        grade: "一年级",
      },
      {
        gender: "男",
        count: 30,
        class: "一班",
        grade: "二年级",
      },
      {
        gender: "女",
        count: 40,
        class: "一班",
        grade: "二年级",
      },
      {
        gender: "男",
        count: 25,
        class: "二班",
        grade: "二年级",
      },
      {
        gender: "女",
        count: 32,
        class: "二班",
        grade: "二年级",
      },
      {
        gender: "男",
        count: 28,
        class: "三班",
        grade: "二年级",
      },
      {
        gender: "女",
        count: 36,
        class: "三班",
        grade: "二年级",
      },
    ];
    const DataView = DataSet.DataView;
    const scale = {
      cut: {
        sync: true,
      },
      mean: {
        sync: true,
        tickCount: 5,
      },
    };
    return (
      <div>
        <Chart
          data={data}
          width={600}
          height={450}
          padding={[30, 80, 80, 80]}
          scale={scale}
        >
          <Tooltip showTitle={false} />
          <Legend />
          <Coord type="theta" />
          <Facet
            type="tree"
            fields={["grade", "class"]}
            line={{
              stroke: "#c0d0e0",
              smooth: true,
            }}
            eachView={(view, facet) => {
              const dv = new DataView();
              dv.source(facet.data).transform({
                type: "percent",
                field: "count",
                dimension: "gender",
                as: "percent",
              });

              view.data(dv.rows);
              view.scale({
                percent: {
                  formatter(val) {
                    return (val * 100).toFixed(2) + "%";
                  },
                },
              });
              view
                .interval()
                .position("percent")
                .color("gender")
                .adjust("stack");
              view.interaction("element-active");
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Columntree;
