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
import airports from "./airports.json";

function getComponent() {
  var dv = new DataSet.View().source(data).source(data, {
    type: "GeoJSON"
  });
  const scale = {
    longitude: {
      max: -66,
      min: -125,
      sync: true
    },
    latitude: {
      max: 50,
      min: 24,
      sync: true
    }
  };

  class SliderChart extends React.Component {
    onChange(obj) {
      const { startValue, endValue } = obj;
      ds.setState("start", new Date(startValue).getTime());
      ds.setState("end", new Date(endValue).getTime());
    }

    render() {
      return (
        <div>
          <Chart
            height={window.innerHeight}
            scale={scale}
            forceFit
            padding={0}
          >
            <Axis visible={false} />
            <View data={dv}>
              <Tooltip visible={false} />
              <Geom
                type="polygon"
                position="longitude*latitude"
                color="#ddd"
                style={{
                  stroke: "#666",
                  lineWidth: 1
                }}
              />
            </View>
            <View data={airports.slice(1, 100)}>
              <Tooltip visible={false} />
              <Geom
                type="point"
                position="longitude*latitude"
                shape={[
                  "iata",
                  function() {
                    return [
                      "path",
                      "M15 0C6.716 0 0 6.656 0 14.866c0 8.211 15 35.135 15 35.135s15-26.924 15-35.135C30 6.656 23.284 0 15 0zm-.049 19.312c-2.557 0-4.629-2.055-4.629-4.588 0-2.535 2.072-4.589 4.629-4.589 2.559 0 4.631 2.054 4.631 4.589 0 2.533-2.072 4.588-4.631 4.588z"
                    ];
                  }
                ]}
                size={40}
                color="#666"
              />
            </View>
          </Chart>
        </div>
      );
    }
  }

  return SliderChart;
}
class Mapsymbol extends React.Component {
  render() {
    const SliderChart = getComponent();
    return <div>
      <SliderChart />
    </div>
  }
}

export default Mapsymbol;
