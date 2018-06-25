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

class Sparklines extends React.Component {
  render() {
    var plotHeight = (window.innerHeight - 180) / 4;
    var c0Types = ["line", "interval", "area"];
    var c0Data = [
      [
        936,
        968,
        1025,
        999,
        998,
        1014,
        1017,
        1010,
        1010,
        1007,
        1004,
        988,
        990,
        988,
        987,
        995,
        946,
        954,
        991,
        984,
        974,
        956,
        986,
        936,
        955,
        1021,
        1013,
        1005,
        958,
        953,
        952,
        940,
        937,
        980,
        966,
        965,
        928,
        916,
        910,
        980
      ],
      [
        16,
        17,
        18,
        19,
        20,
        21,
        21,
        22,
        23,
        22,
        20,
        18,
        17,
        17,
        16,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        25,
        24,
        24,
        22,
        22,
        23,
        22,
        22,
        21,
        16,
        15,
        15,
        16,
        19,
        20,
        20,
        21
      ],
      [
        71,
        70,
        69,
        68,
        65,
        60,
        55,
        55,
        50,
        52,
        73,
        72,
        72,
        71,
        68,
        63,
        57,
        58,
        53,
        55,
        63,
        59,
        61,
        64,
        58,
        53,
        48,
        48,
        45,
        45,
        63,
        64,
        63,
        67,
        58,
        56,
        53,
        59,
        51,
        54
      ]
    ];
    var c1Data = [
      [14, 10],
      [8, 16],
      [8, 16],
      [12, 12],
      [6, 18],
      [1, 23],
      [5, 19]
    ];
    c0Data.forEach(function(values, index) {
      var data = values.map(function(value, i) {
        return {
          x: "" + i,
          y: value
        };
      });
      ReactDOM.render(
        <Chart height={plotHeight} data={data} padding={0} forceFit>
          <Tooltip showTitle={false} />
          <Geom type={c0Types[index]} position="x*y" />
        </Chart>,
        document.getElementById(`c0${index}`)
      );
    });
    c1Data.forEach(function(values, index) {
      var data = values.map(function(value, i) {
        return {
          x: i,
          y: value
        };
      });
      var dv = new DataSet.View().source(data);
      dv.transform({
        type: "percent",
        field: "y",
        dimension: "x",
        as: "percent"
      });
      ReactDOM.render(
        <Chart height={plotHeight} data={dv} padding={0} forceFit>
          <Tooltip showTitle={false} />
          <Coord type="theta" />
          <Geom type="intervalStack" position="percent" color="x" />
        </Chart>,
        document.getElementById(`c1${index}`)
      );
    });
    return <div />;
  }
}

export default Sparklines;
