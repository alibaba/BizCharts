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

class Matrix extends React.Component {
  render() {
    const { DataView } = DataSet;
    const scale = {
      Species: {
        sync: true
      }
    };
    return (
      <div>
        <Chart data={data} width={800} scale={scale}>
          <Facet
            type="matrix"
            fields={["SepalLength", "SepalWidth", "PetalLength", "PetalWidth"]}
            eachView={(view, facet) => {
              if (facet.rowIndex === facet.colIndex) {
                var dv = new DataView();
                dv.source(facet.data).transform({
                  type: "bin.histogram",
                  field: facet.colField,
                  // 对应数轴上的一个点
                  bins: 30,
                  // 分箱个数
                  as: [facet.colField, "count"],
                  groupBy: ["Species"]
                });
                view.source(dv.rows);
                view
                  .intervalStack()
                  .position(facet.colField + "*count")
                  .color("Species")
                  .opacity(0.85);
              } else {
                view
                  .point()
                  .position([facet.colField, facet.rowField])
                  .color("Species")
                  .shape("circle")
                  .opacity(0.3)
                  .size(3);
              }
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Matrix;
