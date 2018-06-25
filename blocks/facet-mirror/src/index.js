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

class Mirror extends React.Component {
  render() {
    const DataView = DataSet.DataView;
    const tmp = [];
    const dates = [];
    data.male.values.forEach(function(obj) {
      if (dates.indexOf(obj.date) === -1) {
        dates.push(obj.date);
      }

      obj.age_groups.forEach(function(subObject) {
        subObject.gender = "male";
        subObject.date = obj.date;
        tmp.push(subObject);
      });
    });
    data.female.values.forEach(function(obj) {
      obj.age_groups.forEach(function(subObject) {
        subObject.gender = "female";
        subObject.date = obj.date;
        tmp.push(subObject);
      });
    });
    const ds = new DataSet();
    const dv = ds
      .createView()
      .source(tmp)
      .transform({
        type: "filter",

        callback(row) {
          // 判断某一行是否保留，默认返回true
          return (
            new Date(row.date * 1000).getFullYear() ===
            new Date(dates[0] * 1000).getFullYear()
          );
        }
      });
    const scale = {
      age: {
        sync: true,
        tickCount: 11
      },
      total_percentage: {
        sync: true,

        formatter(v) {
          return v + "%";
        }
      },
      gender: {
        sync: true
      }
    };
    return (
      <div>
        <Chart height={600} data={dv} scale={scale}>
          <Facet
            type="mirror"
            fields={["gender"]}
            transpose={true}
            eachView={(view, facet) => {
              view
                .interval()
                .position("age*total_percentage")
                .color("gender", ["rgb(113,192,235)", "rgb(246,170,203)"]);
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Mirror;
