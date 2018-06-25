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

import data from "./mock.json";

class Bubble extends React.Component {
  render() {
    const { DataView } = DataSet;
    const cols = {
      exp_dat: {
        type: "time",
        mask: "M/YY",
        tickCount: 14
      },
      exp_amo: {
        type: "log",
        ticks: [225, 1000000, 2000000, 4000000, 6000000]
      }
    };
    const dv = new DataView();
    dv.source(data).transform({
      type: "map",
      callback: obj => {
        obj.exp_amo = obj.exp_amo * 1;
        return obj;
      }
    });
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={dv}
          scale={cols}
          padding={[40, 90]}
          forceFit
        >
          <Tooltip showTitle={false} />
          <Axis
            name="exp_dat"
            tickLine={null}
            label={{
              textStyle: {
                fontSize: 14
              }
            }}
          />
          <Axis
            name="exp_amo"
            tickLine={null}
            line={null}
            label={{
              textStyle: {
                fontSize: 14
              }
            }}
            label={{
              formatter: function(val) {
                let formatted;

                if (+val === 225) {
                  formatted = 0;
                } else {
                  formatted = val / 1000000;
                }

                return "$" + formatted + "M";
              }
            }}
            grid={{
              lineStyle: {
                lineDash: null,
                stroke: "#999"
              }
            }}
          />
          <Geom
            type="point"
            position="exp_dat*exp_amo"
            size={["exp_amo", [1, 10]]}
            opacity="exp_amo"
            shape="circle"
            tooltip="exp_dat*can_nam*spe_nam*exp_amo"
          />
        </Chart>
      </div>
    );
  }
}

export default Bubble;
