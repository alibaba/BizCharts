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
    // Sample data
    const data = [
      {
        country: "中国",
        population: 131744
      },
      {
        country: "印度",
        population: 104970
      },
      {
        country: "美国",
        population: 29034
      },
      {
        country: "印尼",
        population: 23489
      },
      {
        country: "巴西",
        population: 18203
      }
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.source(data).transform({
      type: "sort",

      callback(a, b) {
        // 排序依据，和原生js的排序callback一致
        return a.population - b.population > 0;
      }
    });
    return (
      <div>
        <Chart height={400} data={dv} forceFit>
          <Coord transpose />
          <Axis
            name="country"
            label={{
              offset: 12
            }}
          />
          <Axis name="population" />
          <Tooltip />
          <Geom type="interval" position="country*population" />
        </Chart>
      </div>
    );
  }
}

export default Basic;
