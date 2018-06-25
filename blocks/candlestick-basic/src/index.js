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
  const { DataView } = DataSet;
  const cols = {
    time: {
      type: "timeCat",
      nice: false,
      range: [0, 1]
    },
    trend: {
      values: ["上涨", "下跌"]
    },
    volumn: {
      alias: "成交量"
    },
    start: {
      alias: "开盘价"
    },
    end: {
      alias: "收盘价"
    },
    max: {
      alias: "最高价"
    },
    min: {
      alias: "最低价"
    },
    range: {
      alias: "股票价格"
    }
  };
  // 设置状态量，时间格式建议转换为时间戳，转换为时间戳时请注意区间
  const ds = new DataSet({
    state: {
      start: "2015-04-07",
      end: "2015-07-28"
    }
  });
  const dv = ds.createView();
  dv.source(data)
    .transform({
      type: "filter",
      callback: obj => {
        const date = obj.time;
        return date <= ds.state.end && date >= ds.state.start;
      }
    })
    .transform({
      type: "map",
      callback: obj => {
        obj.trend = obj.start <= obj.end ? "上涨" : "下跌";
        obj.range = [obj.start, obj.end, obj.max, obj.min];
        return obj;
      }
    });

  class SliderChart extends React.Component {
    onChange(obj) {
      const { startText, endText } = obj;
      ds.setState("start", startText);
      ds.setState("end", endText);
    }

    render() {
      return (
        <div>
          <Chart
            height={window.innerHeight - 50}
            animate={false}
            padding={[10, 40, 40, 40]}
            data={dv}
            scale={cols}
            forceFit
          >
            <Legend offset={20} />
            <Tooltip
              showTitle={false}
              itemTpl="<li data-index={index}><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}{value}</li>"
            />
            <View
              end={{
                x: 1,
                y: 0.5
              }}
              data={dv}
            >
              <Axis name="time" />
              <Axis name="range" />
              <Geom
                type="schema"
                position="time*range"
                color={[
                  "trend",
                  val => {
                    if (val === "上涨") {
                      return "#f04864";
                    }

                    if (val === "下跌") {
                      return "#2fc25b";
                    }
                  }
                ]}
                tooltip={[
                  "time*start*end*max*min",
                  (time, start, end, max, min) => {
                    return {
                      name: time,
                      value:
                        '<br><span style="padding-left: 16px">开盘价：' +
                        start +
                        "</span><br/>" +
                        '<span style="padding-left: 16px">收盘价：' +
                        end +
                        "</span><br/>" +
                        '<span style="padding-left: 16px">最高价：' +
                        max +
                        "</span><br/>" +
                        '<span style="padding-left: 16px">最低价：' +
                        min +
                        "</span>"
                    };
                  }
                ]}
                shape="candle"
              />
            </View>
            <View
              start={{
                x: 0,
                y: 0.65
              }}
              data={dv}
              scale={{
                volumn: {
                  tickCount: 2
                }
              }}
            >
              <Axis
                name="volumn"
                label={{
                  formatter: function(val) {
                    return parseInt(val / 1000, 10) + "k";
                  }
                }}
              />
              <Axis name="time" tickLine={null} label={null} />
              <Geom
                type="interval"
                position="time*volumn"
                color={[
                  "trend",
                  val => {
                    if (val === "上涨") {
                      return "#f04864";
                    }

                    if (val === "下跌") {
                      return "#2fc25b";
                    }
                  }
                ]}
                tooltip={[
                  "time*volumn",
                  (time, volumn) => {
                    return {
                      name: time,
                      value:
                        '<br/><span style="padding-left: 16px">成交量：' +
                        volumn +
                        "</span><br/>"
                    };
                  }
                ]}
                shape="candle"
              />
            </View>
          </Chart>
          <div>
            <Slider
              padding={[20, 40, 20, 40]}
              width="auto"
              height={26}
              start={ds.state.start}
              end={ds.state.end}
              xAxis="time"
              yAxis="volumn"
              scales={{
                time: {
                  type: "timeCat",
                  nice: false
                }
              }}
              data={data}
              onChange={this.onChange.bind(this)}
            />
          </div>
        </div>
      );
    }
  }
  return SliderChart;
}

class Basic extends React.Component {
  render() {
    const SliderChart = getComponent(data);
    return (
      <div>
        <SliderChart />
      </div>
    );
  }
}

export default Basic;
