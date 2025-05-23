# g2-brush 结合 DataSet

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77b42a50-9979-11ea-8225-e30c1937e15c.png)

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
  Util
} from "bizcharts@3.5.8";
import DataSet from "@antv/data-set";

import Brush from "@antv/g2-brush";
import $ from "jquery";

let data;
$.ajax({
  url: "https://alifd.alibabausercontent.com/materials/@bizcharts/g2-brush-ds-state/0.2.9/mock.json",
  async : false,
  success: (iData) => { data = iData }
});

function getComponent(data) {
  $("#mountNode").html('<div id="canvas1"></div><div id="canvas2"></div>');
  const ds = new DataSet({
    state: {
      dates: null
    }
  });
  const totalDv = ds.createView().source(data);
  const dv = ds.createView();
  dv.source(data).transform({
    type: "filter",
    callback: obj => {
      if (ds.state.dates) {
        return ds.state.dates.indexOf(obj.date) > -1;
      }

      return obj;
    }
  });
  const scale1 = {
    date: {
      tickCount: 10,
      type: "time",
      mask: "MMM D YYYY"
    },
    price: {
      min: totalDv.min("price"),
      max: totalDv.max("price")
    }
  };
  const scale2 = {
    date: {
      tickCount: 10,
      type: "time",
      mask: "YYYY"
    }
  };
  let chart2;

  class DoubleChart extends React.Component {
    componentDidMount() {
      new Brush({
        canvas: chart2.get("canvas"),
        chart: chart2,
        type: "X",
        dragable: true,

        onBrushmove(ev) {
          const { date } = ev;
          ds.setState("dates", date);
        },

        onDragmove(ev) {
          const { date } = ev;
          ds.setState("dates", date);
        }
      });
    }

    render() {
      return (
        <div>
          <Chart
            height={300}
            data={dv}
            padding={[100, 40, 50, 80]}
            scale={scale1}
            animate={false}
            forceFit
          >
            <Axis />
            <Tooltip />
            <Geom
              type="area"
              position="date*price"
              shape="smooth"
              opacity={0.85}
            />
          </Chart>
          <Chart
            height={100}
            data={data}
            padding={[5, 40, 60, 80]}
            scale={scale2}
            onGetG2Instance={g2Chart => {
              chart2 = g2Chart;
            }}
            forceFit
          >
            <Axis name="price" visible={false} />
            <Geom
              type="area"
              position="date*price"
              shape="smooth"
              acitve={false}
              opacity={0.85}
            />
          </Chart>
        </div>
      );
    }
  }
  return DoubleChart;
}

class Brushdsstate extends React.Component {
  render() {
    const DoubleChart = getComponent(data);
    return (
      <div>
        <DoubleChart />
      </div>
    );
  }
}

ReactDOM.render(<Brushdsstate />, mountNode)

```
