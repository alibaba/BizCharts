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

class Range extends React.Component {
  render() {
    const data = [
      {
        profession: "两年制副学士学位",
        highest: 110000,
        minimum: 23000,
        mean: 56636
      },
      {
        profession: "执法与救火",
        highest: 120000,
        minimum: 18000,
        mean: 66625
      },
      {
        profession: "教育学",
        highest: 125000,
        minimum: 24000,
        mean: 72536
      },
      {
        profession: "心理学",
        highest: 130000,
        minimum: 22500,
        mean: 75256
      },
      {
        profession: "计算机科学",
        highest: 131000,
        minimum: 23000,
        mean: 77031
      }
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "map",

      callback(row) {
        // 加工数据后返回新的一行，默认返回行数据本身
        row.range = [row.minimum, row.highest];
        return row;
      }
    });
    return (
      <div>
        <Chart height={400} data={dv} padding={[20, 80, 50, 110]} forceFit>
          <Coord transpose />
          <Axis
            name="profession"
            label={{
              offset: 12
            }}
          />
          <Axis name="range" />
          <Tooltip />
          <Geom type="interval" position="profession*range" />
        </Chart>
      </div>
    );
  }
}

export default Range;
