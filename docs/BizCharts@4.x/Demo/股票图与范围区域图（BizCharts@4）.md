# 股票图与范围区域图（BizCharts@4）

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/dbd5f030-afaf-11ea-b974-bdbc104e7053.png)

```js
import $ from "jquery";
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
  Interval,
  Area,
  Schema,
  Line
} from "bizcharts";
import DataSet from "@antv/data-set";

let data;
$.ajax({
  url: "https://alifd.alibabausercontent.com/materials/@bizcharts/candlestick-k-and-area/0.3.1/mock.json",
  async : false,
  success: (iData) => { data = iData }
});

class Kandarea extends React.Component {
  render() {
    const { DataView } = DataSet;
    const cols = {
      date: {
        type: "time",
        nice: false,
        mask: "MM-DD",
        tickCount: 10
      },
      range: {
        min: 20,
        max: 35,
        nice: false,
        tickInterval: 2
      },
      mean: {
        min: 20,
        max: 35,
        nice: false
      },
      stockRange: {
        min: 20,
        max: 35,
        nice: false
      }
    };
    const dv = new DataView();
    dv.source(data).transform({
      type: "map",
      callback: obj => {
        obj.stockRange = [obj.start, obj.end, obj.highest, obj.lowest];
        return obj;
      }
    });
    return (
        <Chart 
          height={600} 
          width={600}
          data={dv} 
          scale={cols} 
          autoFit
        >
          <Axis 
            name="mean" 
            visible={false} 
          />
          <Axis 
            name="stockRange" 
            visible={false} 
          />
          <Tooltip
            showCrosshairs
            shared
          />
         <Area
           position="date*range"
           color="#64b5f6"
         />
         <Schema
            position="date*stockRange"
            color={[
              "trend",
              val => {
                if (val === "up") {
                  return "#f04864";
                }

                if (val === "down") {
                  return "#2fc25b";
                }
              }
            ]}
            tooltip="start*end*highest*lowest"
            shape="candle"
         />
          <Line 
            position="date*mean" 
            color="#FACC14"
          />
        </Chart>
    );
  }
}

ReactDOM.render(<Kandarea />, mountNode)

```
