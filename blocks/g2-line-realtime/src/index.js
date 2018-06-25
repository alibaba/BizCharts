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

function getComponent() {
  var data = [];
  let chart;
  const scale = {
    time: {
      alias: "时间",
      type: "time",
      mask: "MM:ss",
      tickCount: 10,
      nice: false
    },
    temperature: {
      alias: "平均温度(°C)",
      min: 10,
      max: 35
    },
    type: {
      type: "cat"
    }
  };

  class SliderChart extends React.Component {
    constructor() {
      super();
      this.state = {
        data
      };
    }

    componentDidMount() {
      setInterval(() => {
        var now = new Date();
        var time = now.getTime();
        var temperature1 = ~~(Math.random() * 5) + 22;
        var temperature2 = ~~(Math.random() * 7) + 17;

        if (data.length >= 200) {
          data.shift();
          data.shift();
        }

        data.push({
          time: time,
          temperature: temperature1,
          type: "记录1"
        });
        data.push({
          time: time,
          temperature: temperature2,
          type: "记录2"
        });
        this.setState({
          data
        });
      }, 1000);
    }
    render() {
    console.log(data.length)

      return (
        <Chart
          height={window.innerHeight}
          data={data}
          scale={scale}
          forceFit
          onGetG2Instance={g2Chart => {
            chart = g2Chart;
          }}
        >
          <Tooltip />
          {data.length !== 0 ? <Axis /> : ''}
          <Legend />
          <Geom
            type="line"
            position="time*temperature"
            color={["type", ["#ff7f0e", "#2ca02c"]]}
            shape="smooth"
            size={2}
          />
        </Chart>
      );
    }
  }

  return SliderChart;
}

class Linerealtime extends React.Component {
  render() {
    const SliderChart = getComponent();
    return (
      <div>
        <SliderChart />
      </div>
    );
  }
}

export default Linerealtime;
