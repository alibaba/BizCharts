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
import Slider from "bizcharts-plugin-slider";

import $ from "jquery";

import data from "./mock.json";

function getComponent(data) {
  const { Region } = Guide;
  const ds = new DataSet({
    state: {
      start: new Date("2000-06-05").getTime(),
      end: new Date("2000-12-29").getTime()
    }
  });
  $(
    '<h4 style="text-align: center;margin-bottom: 5px;">北京市 2010-2015 年 AQI 指数</h4>'
  ).appendTo($("#mountNode"));
  var dv = ds.createView().source(data);
  dv.transform({
    type: "filter",

    callback(obj) {
      const time = new Date(obj.date).getTime(); // !注意：时间格式，建议转换为时间戳进行比较

      return time >= ds.state.start && time <= ds.state.end;
    }
  });
  var ticks = [0, 50, 100, 150, 200, 300, 500];
  var colors = [
    "#5AC405",
    "#F9C709",
    "#FD942C",
    "#e4440D",
    "#810043",
    "#45001B"
  ];
  const scale = {
    date: {
      type: "time",
      mask: "YYYY-MM-DD",
      tickCount: 4,
      alias: "日期",
      nice: false
    },
    aqi: {
      min: 0,
      ticks: ticks,
      alias: "AQI(空气质量指数)"
    }
  };

  class SliderChart extends React.Component {
    onChange(obj) {
      const { startValue, endValue } = obj;
      ds.setState("start", startValue);
      ds.setState("end", endValue);
    }

    render() {
      return (
        <div>
          <Chart
            height={window.innerHeight - 90}
            data={dv}
            scale={scale}
            forceFit
            padding={[20, 20, 40, 80]}
          >
            <Tooltip />
            <Axis />
            <Geom type="line" position="date*aqi" opacity={0.75} />
            <Guide>
              <Region
                start={["min", 0]}
                end={["max", 50]}
                style={{
                  fill: "#5AC405",
                  fillOpacity: 0.4
                }}
              />
              <Region
                start={["min", 50]}
                end={["max", 100]}
                style={{
                  fill: "#F9C709",
                  fillOpacity: 0.4
                }}
              />
              <Region
                start={["min", 100]}
                end={["max", 150]}
                style={{
                  fill: "#FD942C",
                  fillOpacity: 0.4
                }}
              />
              <Region
                start={["min", 150]}
                end={["max", 200]}
                style={{
                  fill: "#e4440D",
                  fillOpacity: 0.4
                }}
              />
              <Region
                start={["min", 200]}
                end={["max", 300]}
                style={{
                  fill: "#810043",
                  fillOpacity: 0.4
                }}
              />
              <Region
                start={["min", 300]}
                end={["max", 500]}
                style={{
                  fill: "#45001B",
                  fillOpacity: 0.4
                }}
              />
            </Guide>
          </Chart>
          <div>
            <Slider
              width="auto"
              height={26}
              start="2000-06-05"
              end="2000-12-29"
              xAxis="date"
              yAxis="aqi"
              scales={{
                time: {
                  type: "time",
                  tickCount: 10,
                  mask: "YYYY-MM-DD"
                }
              }}
              data={data}
              backgroundChart={{
                type: "line"
              }}
              onChange={this.onChange.bind(this)}
            />
          </div>
        </div>
      );
    }
  }
  return SliderChart;
}

class Pekingaqi extends React.Component {
  render() {
    const SliderChart = getComponent(data);
    return (
      <div>
        <SliderChart />
      </div>
    );
  }
}

export default Pekingaqi;
