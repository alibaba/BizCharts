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

function getTextAttrs(cfg) {
  return _.assign(
    {},
    {
      fillOpacity: cfg.opacity,
      fontSize: cfg.origin._origin.size,
      rotate: cfg.origin._origin.rotate,
      text: cfg.origin._origin.text,
      textAlign: "center",
      fontFamily: cfg.origin._origin.font,
      fill: cfg.color,
      textBaseline: "Alphabetic"
    },
    cfg.style
  );
}

// 给point注册一个词云的shape
Shape.registerShape("point", "cloud", {
  drawShape(cfg, container) {
    const attrs = getTextAttrs(cfg);
    return container.addShape("text", {
      attrs: _.assign(attrs, {
        x: cfg.x,
        y: cfg.y
      })
    });
  }
});

class Wordcloudmask extends React.Component {
  constructor() {
    super();
    this.state = {
      dv: null
    };
  }
  componentDidMount () {
    const dv = new DataSet.View().source(data);
    const range = dv.range("value");
    const min = range[0];
    const max = range[1];
    const imageMask = new Image();
    imageMask.crossOrigin = "";
    imageMask.src =
      "https://img.alicdn.com/tfs/TB1VAglldfJ8KJjy0FeXXXKEXXa-2333-1200.png";

    imageMask.onload = () => {
      dv.transform({
        type: "tag-cloud",
        fields: ["name", "value"],
        imageMask,
        font: "Verdana",
        size: [window.innerWidth, window.innerHeight],
        // 宽高设置最好根据 imageMask 做调整
        padding: 0,
        timeInterval: 5000,

        // max execute time
        rotate() {
          let random = ~~(Math.random() * 4) % 4;

          if (random == 2) {
            random = 0;
          }

          return random * 90; // 0, 90, 270
        },

        fontSize(d) {
          return ((d.value - min) / (max - min)) * (32 - 8) + 8;
        }
      });
      this.setState({
        dv
      })
    };
  }

  render() {
    const { dv } = this.state;
    const scale = {
      x: {
        nice: false
      },
      y: {
        nice: false
      }
    };
    if (!dv) return null;
    return <div>
      <Chart
          width={window.innerWidth}
          height={window.innerHeight}
          data={dv}
          scale={scale}
          padding={0}
          forceFit
        >
          <Tooltip showTitle={false} />
          <Coord reflect="y" />
          <Geom type="point" position="x*y" color="text" shape="cloud" />
        </Chart>
    </div>;
  }
}

export default Wordcloudmask;
