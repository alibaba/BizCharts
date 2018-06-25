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

class Donutrose extends React.Component {
  render() {
    const data = [
      {
        year: "2001",
        population: 41.8
      },
      {
        year: "2002",
        population: 38
      },
      {
        year: "2003",
        population: 33.7
      },
      {
        year: "2004",
        population: 30.7
      },
      {
        year: "2005",
        population: 25.8
      },
      {
        year: "2006",
        population: 31.7
      },
      {
        year: "2007",
        population: 33
      },
      {
        year: "2008",
        population: 46
      },
      {
        year: "2009",
        population: 38.3
      },
      {
        year: "2010",
        population: 28
      },
      {
        year: "2011",
        population: 42.5
      },
      {
        year: "2012",
        population: 30.3
      }
    ];
    const chart = new G2.Chart({
      container: "container",
      forceFit: true,
      height: window.innerHeight
    });
    chart.source(data);
    chart.coord("polar");
    chart.axis(false);
    chart
      .interval()
      .position("year*population")
      .style({
        lineWidth: 1,
        stroke: "#fff"
      });
    chart.render();
    return (
      <div>
        <Chart height={window.innerHeight} data={data} forceFit>
          <Coord type="polar" innerRadius={0.2} />
          <Tooltip />
          <Legend
            position="right"
            offsetY={-window.innerHeight / 2 + 180}
            offsetX={-160}
          />
          <Geom
            type="interval"
            color="year"
            position="year*population"
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Donutrose;
