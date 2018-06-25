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

class Circle extends React.Component {
  render() {
    const DataView = DataSet.DataView;
    const scale = {
      mean: {
        sync: true
      },
      cut: {
        sync: true
      }
    };
    return (
      <div>
        <Chart
          height={450}
          data={data}
          width={800}
          height={600}
          padding={[30, 80, 80, 80]}
          axis={false}
          scale={scale}
        >
          <Coord type="polar" />
          <Facet
            type="circle"
            fields={["clarity"]}
            eachView={(view, facet) => {
              var data = facet.data;
              var dv = new DataView();
              dv.source(data).transform({
                type: "aggregate",
                fields: ["price"],
                operations: ["mean"],
                as: ["mean"],
                groupBy: ["cut"]
              });
              view.source(dv);
              view
                .interval()
                .position("cut*mean")
                .color("cut");
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Circle;
