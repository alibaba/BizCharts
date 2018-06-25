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

class Stackedpercentagecolumn extends React.Component {
  render() {
    const data = [
      {
        country: "Europe",
        year: "1750",
        value: 163
      },
      {
        country: "Europe",
        year: "1800",
        value: 203
      },
      {
        country: "Europe",
        year: "1850",
        value: 276
      },
      {
        country: "Europe",
        year: "1900",
        value: 408
      },
      {
        country: "Europe",
        year: "1950",
        value: 547
      },
      {
        country: "Europe",
        year: "1999",
        value: 729
      },
      {
        country: "Europe",
        year: "2050",
        value: 628
      },
      {
        country: "Europe",
        year: "2100",
        value: 828
      },
      {
        country: "Asia",
        year: "1750",
        value: 502
      },
      {
        country: "Asia",
        year: "1800",
        value: 635
      },
      {
        country: "Asia",
        year: "1850",
        value: 809
      },
      {
        country: "Asia",
        year: "1900",
        value: 947
      },
      {
        country: "Asia",
        year: "1950",
        value: 1402
      },
      {
        country: "Asia",
        year: "1999",
        value: 3634
      },
      {
        country: "Asia",
        year: "2050",
        value: 5268
      },
      {
        country: "Asia",
        year: "2100",
        value: 7268
      }
    ];
    const ds = new DataSet();
    const dv = ds
      .createView()
      .source(data)
      .transform({
        type: "percent",
        field: "value",
        // 统计销量
        dimension: "country",
        // 每年的占比
        groupBy: ["year"],
        // 以不同产品类别为分组
        as: "percent"
      });
    const cols = {
      percent: {
        min: 0,

        formatter(val) {
          return (val * 100).toFixed(2) + "%";
        }
      }
    };
    return (
      <div>
        <Chart height={400} data={dv} scale={cols} forceFit>
          <Legend />
          <Axis name="year" />
          <Axis name="percent" />
          <Tooltip />
          <Geom
            type="intervalStack"
            position="year*percent"
            color={"country"}
          />
        </Chart>
      </div>
    );
  }
}

export default Stackedpercentagecolumn;
