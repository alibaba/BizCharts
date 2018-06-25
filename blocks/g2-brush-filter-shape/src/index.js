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

import Brush from "@antv/g2-brush";

import data from "./mock.json";

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
            height={window.innerHeight}
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

export default Brushfiltershape;
