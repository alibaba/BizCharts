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

class Areahorizongraph extends React.Component {
  render() {
    const series = {
      0: "All Industries",
      32229: "Nonagriculture, Private Wage and Salary Workers",
      32230: "Mining and Extraction",
      32231: "Construction",
      32232: "Manufacturing",
      32233: "Durable goods manufacturing",
      32234: "Nondurable goods manufacturing",
      32235: "Wholesale and Retail Trade",
      32236: "Transportation and Utilities",
      32237: "Information",
      32238: "Finance",
      32239: "Business services",
      32240: "Education and Health",
      32241: "Leisure and hospitality",
      32242: "Other",
      35109: "Agriculture",
      28615: "Government",
      35181: "Self-employed"
    };
    var dv = new DataSet.View().source(data);
    dv.transform({
      type: "map",
      callback: function(row) {
        row.series = series[row.series];
        return row;
      }
    });
    const scale = {
      date: {
        type: "time"
      },
      rate: {
        min: 0
      }
    };
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={dv}
          padding={["50%", 0, 0]}
          scale={scale}
          forceFit
        >
          <Geom
            type="area"
            position="date*rate"
            color="series"
            opacity={0.85}
          />
        </Chart>
      </div>
    );
  }
}

export default Areahorizongraph;
