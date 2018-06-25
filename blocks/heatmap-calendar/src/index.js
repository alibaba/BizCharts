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

class Calendar extends React.Component {
  getMonthWeek(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthFirst = new Date(year, month, 0);
    const intervalDays = Math.round(
      (date.getTime() - monthFirst.getTime()) / 86400000
    );
    const index = Math.floor((intervalDays + monthFirst.getDay()) / 7);
    return index;
  }
  render() {
    const { DataView } = DataSet;
    const cols = {
      month: {
        type: "cat",
        values: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ]
      },
      day: {
        type: "cat"
      },
      week: {
        type: "cat",
        values: ["5", "4", "3", "2", "1", "0"]
      },
      涨跌幅: {
        type: "linear",
        min: -10,
        max: 10,
        sync: true
      },
      time: {
        type: "time"
      },
      日期: {
        type: "time"
      }
    };

    // 加工数据
    // 增加涨幅、跌幅
    // 添加所属月、周几、每个月的第几周
    data.forEach((obj) => {
      const date = new Date(obj["日期"]);
      const month = date.getMonth();
      obj.month = month;
      obj.day = date.getDay();
      obj.week = this.getMonthWeek(date).toString();
    }); // 对数据进行排序

    const dv = new DataView();
    dv.source(data).transform({
      type: "sort-by",
      fields: ["day"],
      order: "DESC"
    });
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={dv}
          scale={cols}
          forceFit
          padding={[20, 120, 50, 120]}
        >
          <Legend name="涨跌幅" offset={0} />
          <Tooltip title="日期" />
          <Axis name="day" visible={false} />
          <Axis name="week" visible={false} />
          <Axis name="日期" visible={false} />
          <Facet
            type="list"
            fields={["month"]}
            cols={3}
            padding={[0, 15, 30, 15]}
            colTitle={{
              offsetY: -10,
              style: {
                fontSize: 12,
                textAlign: "center",
                fill: "#666"
              }
            }}
          >
            <View>
              <Geom
                type="polygon"
                position="day*week*日期"
                style={{
                  lineWidth: 1,
                  stroke: "#fff"
                }}
                color={[
                  "涨跌幅",
                  "#F51D27-#FA541C-#FFBE15-#FFF2D1-#E3F6FF-#85C6FF-#0086FA-#0A61D7"
                ]}
              />
            </View>
          </Facet>
        </Chart>
      </div>
    );
  }
}

export default Calendar;
