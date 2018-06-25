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

import data from "./mock.json";

function getComponent(data) {
  const ds = new DataSet({
    state: {
      start: new Date("2009/7/20 0:00").getTime(),
      end: new Date("2009/9/9 0:00").getTime()
    }
  });
  const dv = ds.createView("origin").source(data);
  dv.transform({
    type: "filter",

    callback(obj) {
      const time = new Date(obj.time).getTime(); // !注意：时间格式，建议转换为时间戳进行比较

      return time >= ds.state.start && time <= ds.state.end;
    }
  });
  const scale = {
    time: {
      type: "time",
      tickCount: 8,
      mask: "m/dd hh:MM"
    },
    flow: {
      alias: "流量(m^3/s)"
    },
    rain: {
      alias: "降雨量(mm)"
    }
  };
  let chart;

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
            height={window.innerHeight - 40}
            padding={[40, 40, 40, 80]}
            scale={scale}
            onGetG2Instance={g2Chart => {
              g2Chart.animate(false);
              chart = g2Chart;
            }}
            forceFit
          >
            <Axis name="rain" grid={null} />
            <Axis name="flow" title />
            <Legend visible={false} />
            <Tooltip />
            <View data={dv} scale={scale}>
              <Axis name="rain" grid={null} />
              <Geom
                type="area"
                position="time*flow"
                color="l(100) 0:#a50f15 1:#fee5d9"
                opacity={0.85}
              />
            </View>
            <View data={dv} scale={scale}>
              <Axis name="rain" position="right" />
              <Coord reflect />
              <Geom
                type="area"
                position="time*rain"
                color="l(100) 0:#293c55 1:#f7f7f7"
                opacity={0.85}
              />
            </View>
          </Chart>
          <div>
            <Slider
              width="auto"
              height={26}
              start={ds.state.start}
              end={ds.state.end}
              xAxis="time"
              yAxis="flow"
              scales={{
                time: {
                  type: "time",
                  tickCount: 10,
                  mask: "M/DD H:mm"
                }
              }}
              data={dv}
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

class Arearainfall extends React.Component {
  render() {
    const SliderChart = getComponent(data);
    return (
      <div>
        <SliderChart />
      </div>
    );
  }
}

export default Arearainfall;
