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

class Columnanimated extends React.Component {
  render() {
    var data = [];

    var getValue = (function() {
      var value = 0;
      return function() {
        if (value >= Math.PI * 2) {
          value = 0;
        }

        var result = Math.sin(value);
        value += Math.PI / 6;
        return result;
      };
    })();

    for (var i = 1; i <= 12; i++) {
      data.push({
        month: "" + i,
        value: getValue() * 8 + 15
      });
    }

    const scale = {
      month: {
        type: "cat",
        formatter: function(dimValue) {
          return dimValue + "月";
        }
      },
      value: {
        min: 0,
        max: 30
      }
    };
    let chart;

    class RenderChart extends React.Component {
      constructor() {
        super();
        this.state = {
          data
        };
      }

      componentDidMount() {
        const _this = this;

        setInterval(function() {
          getValue();
          const newData = data.map(function(item) {
            return {
              value: getValue() * 8 + 15,
              month: item.month
            };
          });

          _this.setState({
            data: newData
          });
        }, 120);
      }

      render() {
        return (
          <Chart
            height={window.innerHeight}
            data={this.state.data}
            scale={scale}
            forceFit
          >
            <Axis />
            <Legend visible={false} />
            <Geom type="interval" position="month*value" color="month" />
          </Chart>
        );
      }
    }
    return (
      <div>
        <RenderChart />
      </div>
    );
  }
}

export default Columnanimated;
