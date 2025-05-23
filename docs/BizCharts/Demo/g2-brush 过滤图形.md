# g2-brush 过滤图形

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77c3bab0-9979-11ea-bd36-0f0eda3e7ac1.png)

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

import Brush from "@antv/g2-brush";

let data;
$.ajax({
  url: "https://alifd.alibabausercontent.com/materials/@bizcharts/g2-brush-filter-shape/0.2.9/mock.json",
  async : false,
  success: (iData) => { data = iData }
});

function getComponent(data) {
  let chart;
  let view2;

  class RenderChart extends React.Component {
    componentDidMount() {
      new Brush({
        canvas: chart.get("canvas"),
        dragable: true,

        onBrushstart(ev) {
          const { x, y } = ev;
          const views = chart.getViewsByPoint({
            x,
            y
          });

          if (views.length > 1) {
            this.chart = views[1];
            const coord = views[1].get("coord");
            this.plot = {
              start: coord.start,
              end: coord.end
            };
            this.xScale = views[1].getXScale();
            this.yScale = views[1].getYScales()[0];
          }
        },

        onBrushmove(ev) {
          const views = chart.get("views");
          const { data } = ev;
          views[1].filterShape(obj => {
            return data.indexOf(obj) > -1;
          });
        },

        onDragmove(ev) {
          const views = chart.get("views");
          const { data } = ev;
          views[1].filterShape(obj => {
            return data.indexOf(obj) > -1;
          });
        }
      });
    }

    render() {
      return (
        <div>
          <Chart
            onGetG2Instance={g2Chart => {
              chart = g2Chart;
            }}
            forceFit
          >
            <Tooltip />
            <View
              end={{
                x: 0.45,
                y: 1
              }}
              data={data}
            >
              <Axis />
              <Tooltip visible={false} />
              <Geom type="point" position="Horsepower*Miles_per_Gallon" />
            </View>
            <View
              start={{
                x: 0.55,
                y: 0
              }}
              data={data}
            >
              <Axis />
              <Geom type="point" position="Acceleration*Displacement" />
            </View>
          </Chart>
        </div>
      );
    }
  }
  return RenderChart;
}

class Brushfiltershape extends React.Component {
  render() {
    const RenderChart = getComponent(data);
    return (
      <div>
        <RenderChart />
      </div>
    );
  }
}

ReactDOM.render(<Brushfiltershape />, mountNode)

```
