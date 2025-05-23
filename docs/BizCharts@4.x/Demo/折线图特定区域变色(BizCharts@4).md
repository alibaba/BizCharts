# 折线图特定区域变色(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/59b67dd0-9290-11eb-b6ac-c11ccf54cc02.png)

```js
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
  Util,
} from "bizcharts";

// 业务实际使用的数据，如果你要使用此图表，需要：
// 1. 将此数据改为接口数据
// 2. 如果数据字段不同，需要修改下方全部同名的字段，比如 count -> xxxCount, 那么下面所有的 count 都要修改
var data = [
  {
    date: "2020-01-30",
    count: 35,
    alert: false,
  },
  {
    date: "2020-02-01",
    count: 50,
    alert: false,
  },
  {
    date: "2020-02-02",
    count: 2,
    alert: true,
  },
  {
    date: "2020-02-03",
    count: 4,
    alert: true,
  },
  {
    date: "2020-02-04",
    count: 30,
    alert: false,
  },
  {
    date: "2020-02-05",
    count: 2,
    alert: true,
  },
];

class Lineofdashed extends React.Component {
  render() {
    const alertLine = [...data].map((item) => {
      if (item.alert) {
        return item;
      }
      return {
        ...item,
        count: null,
      };
    });
    console.log("红色线", alertLine);
    console.log("完整数据", data);

    var scale = {
      date: {
        alias: "日期",
        type: "time",
      },
      count: {
        alias: "次数",
        tickCount: 6,
        // 由于使用不同View，需要设定 scale 的 min 和 max
        min: 0,
        max: 60,
      },
    };

    class SliderChart extends React.Component {
      render() {
        return (
          <Chart
            height={400}
            autoFit
            scale={{
              count: {
                sync: true,
              },
            }}
          >
            <Tooltip />
            <View data={data} scale={scale}>
              <Axis name="count" />
              <Geom
                type="line"
                position="date*count"
                color="#9AD681"
                size={2}
                tooltip={[
                  "count*alert",
                  (count, alert) => {
                    if (alert) {
                      return {
                        name: "次数",
                        color: "red",
                        value: count,
                      };
                    }
                    return {
                      name: "次数",
                      color: "#9AD681",
                      value: count,
                    };
                  },
                ]}
              />
              <Geom
                type="point"
                position="date*count"
                size={4}
                shape={"circle"}
                tooltip={false}
                color={[
                  "count*alert",
                  (count, alert) => {
                    if (alert) {
                      return "red";
                    }
                    return "#9AD681";
                  },
                ]}
              />
            </View>
            <View data={alertLine} scale={scale}>
              <Geom
                type="line"
                position="date*count"
                color="red"
                size={2}
                tooltip={false}
              />
            </View>
            <Legend name="count" visible={false} />
          </Chart>
        );
      }
    }
    return <SliderChart />;
  }
}

ReactDOM.render(<Lineofdashed />, mountNode);

```
