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
  const originDv = ds.createView("origin");
  originDv.source(data).transform({
    type: "fold",
    fields: ["rain", "flow"],
    key: "type",
    value: "value",
    retains: ["rain", "flow", "time"]
  });
  const chartDv = ds.createView();
  chartDv
    .source(originDv)
    .transform({
      type: "fold",
      fields: ["rain", "flow"],
      key: "type",
      value: "value",
      retains: ["rain", "flow", "time"]
    })
    .transform({
      type: "filter",

      callback(obj) {
        const time = new Date(obj.time).getTime(); // !注意：时间格式，建议转换为时间戳进行比较

        return time >= ds.state.start && time <= ds.state.end;
      }
    });
  const cols = {
    time: {
      type: "time",
      tickCount: 10,
      mask: "M/DD H:mm"
    }
  };

  class SliderChart extends React.Component {
    onChange(obj) {
      const { startValue, endValue } = obj;
      ds.setState("start", new Date(startValue).getTime());
      ds.setState("end", new Date(endValue).getTime());
    }

    render() {
      return (
        <div>
          <Chart
            height={window.innerHeight - 60}
            data={chartDv}
            scale={cols}
            forceFit
            padding={[20, 80]}
          >
            <Facet
              type="mirror"
              fields={["type"]}
              showTitle={false}
              padding={[0, 0, 40, 0]}
              eachView={(view, facet) => {
                const { colValue, data } = facet;
                let color;
                let alias;

                if (colValue === "rain") {
                  color = "#1890ff";
                  alias = "降雨量(mm)";
                } else if (colValue === "flow") {
                  color = "#2FC25B";
                  alias = "流量(m^3/s)";
                }

                view.source(data, {
                  [`${colValue}`]: {
                    alias
                  }
                });
                view.axis(colValue, {
                  title: {
                    autoRotate: false,
                    offset: -10,
                    position: "end",
                    textStyle: {
                      textAlign: "start"
                    }
                  }
                });
                view
                  .line()
                  .position("time*" + colValue)
                  .color(color);
              }}
            />
          </Chart>
          <div>
            <Slider
              width="auto"
              height={26}
              start={ds.state.start}
              end={ds.state.end}
              xAxis="time"
              yAxis="value"
              scales={{
                time: {
                  type: "time",
                  tickCount: 10,
                  mask: "M/DD H:mm"
                }
              }}
              data={originDv}
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

class Rainandflow extends React.Component {
  render() {
    const SliderChart = getComponent(data);
    return (
      <div>
        <SliderChart />
      </div>
    );
  }
}

export default Rainandflow;
