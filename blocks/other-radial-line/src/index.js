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

class Radialline extends React.Component {
  render() {
    const { Text } = Guide;
    const data = [
      {
        term: "Zombieland",
        count: 9
      },
      {
        term: "Wieners",
        count: 8
      },
      {
        term: "Toy Story",
        count: 8
      },
      {
        term: "trashkannon",
        count: 7
      },
      {
        term: "the GROWLERS",
        count: 6
      },
      {
        term: "mudweiser",
        count: 6
      },
      {
        term: "ThunderCats",
        count: 4
      },
      {
        term: "The Taqwacores - Motion Picture",
        count: 4
      },
      {
        term: "The Shawshank Redemption",
        count: 2
      },
      {
        term: "The Olivia Experiment",
        count: 1
      }
    ];
    const cols = {
      count: {
        max: 12
      }
    };
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={data}
          scale={cols}
          forceFit
          padding={[20, 80]}
        >
          <Coord type="theta" innerRadius={0.2} endAngle={Math.PI} />
          <Tooltip />
          <Geom
            type="interval"
            position="term*count"
            color="#8543e0"
            shape="line"
          />
          <Geom
            type="point"
            position="term*count"
            color="#8543e0"
            shape="circle"
          />
          <Guide>
            <Text
              position={["50%", "50%"]}
              content="Music"
              style={{
                textAlign: "center",
                fontSize: 24,
                fill: "#8543e0"
              }}
            />

            {data.map(obj => {
              return (
                <Text
                  position={[obj.term, 0]}
                  content={obj.term + " "}
                  style={{
                    textAlign: "right"
                  }}
                />
              );
            })}
          </Guide>
        </Chart>
      </div>
    );
  }
}

export default Radialline;
