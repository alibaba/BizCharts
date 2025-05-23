# g2-brush 柱状图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77a0a250-9979-11ea-9761-adf4e02ffa04.png)

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
  Util
} from "bizcharts@3.5.8";
import DataSet from "@antv/data-set";

import Brush from "@antv/g2-brush";

let data;
$.ajax({
  url: "https://alifd.alibabausercontent.com/materials/@bizcharts/g2-brush-interval/0.2.9/mock.json",
  async : false,
  success: (iData) => { data = iData }
});

function getComponent(data) {
  const ds = new DataSet();
  const dv = ds
    .createView("test")
    .source(data)
    .transform({
      as: ["count"],
      groupBy: ["release"],
      operations: ["count"],
      type: "aggregate"
    });
  const scale = {
    count: {
      alias: "top2000 唱片总量"
    },
    release: {
      tickInterval: 5,
      alias: "唱片发行年份"
    }
  };
  let chart;

  class SliderChart extends React.Component {
    componentDidMount() {
      new Brush({
        canvas: chart.get("canvas"),
        chart,
        type: "X",

        onBrushstart() {
          chart.hideTooltip();
        },

        onBrushmove() {
          chart.hideTooltip();
        }
      });
      chart.on("plotdblclick", () => {
        chart.get("options").filters = {};
        chart.repaint();
      });
    }

    render() {
      return (
        <div>
          <Chart
            data={dv}
            scale={scale}
            onGetG2Instance={g2Chart => {
              chart = g2Chart;
            }}
            forceFit
          >
            <Tooltip />
            <Axis />
            <Geom type="interval" position="release*count" color="#e50000" />
          </Chart>
        </div>
      );
    }
  }
  return SliderChart;
}

class Brushinterval extends React.Component {
  render() {
    const SliderChart = getComponent(data);
    return (
      <div>
        <SliderChart />
      </div>
    );
  }
}

ReactDOM.render(<Brushinterval />, mountNode)

```
