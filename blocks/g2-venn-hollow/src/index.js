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

class Vennhollow extends React.Component {
  render() {
    var sets = [
      {
        sets: ["A"],
        size: 12,
        label: "A"
      },
      {
        sets: ["B"],
        size: 12,
        label: "B"
      },
      {
        sets: ["C"],
        size: 12,
        label: "C"
      },
      {
        sets: ["A", "B"],
        size: 2,
        label: "A&B"
      },
      {
        sets: ["A", "C"],
        size: 2,
        label: "A&C"
      },
      {
        sets: ["B", "C"],
        size: 2,
        label: "B&C"
      },
      {
        sets: ["A", "B", "C"],
        size: 1
      }
    ];

    class SliderChart extends React.Component {
      render() {
        return (
          <Chart height={window.innerHeight} data={sets} padding={10} forceFit>
            <Geom
              type="venn"
              color="id"
              active={false}
              shape="hollow"
              size="size"
              shape="hollow"
              style={{
                lineWidth: 10,
                padding: 10,
                textStyle: {
                  fontSize: 32
                }
              }}
            >
              <Label content="sets" />
            </Geom>
          </Chart>
        );
      }
    }
    return (
      <div>
        <SliderChart />
      </div>
    );
  }
}

export default Vennhollow;
