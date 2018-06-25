import React, { Component } from 'react';
import { Chart, Geom, Tooltip, Coord, Shape } from 'bizcharts';

const { DataSet } = window;

function getTextAttrs(cfg) {
  return Object.assign({}, {
    fillOpacity: cfg.opacity,
    fontSize: cfg.origin._origin.size,
    rotate: cfg.origin._origin.rotate,
    text: cfg.origin._origin.text,
    textAlign: 'center',
    fontFamily: cfg.origin._origin.font,
    fill: cfg.color,
    textBaseline: 'Alphabetic',
  }, cfg.style);
}

Shape.registerShape('point', 'cloud', {
  drawShape(cfg, container) {
    const attrs = getTextAttrs(cfg);
    const { x, y } = cfg;

    // 背景圆
    container.addShape('circle', {
      attrs: {
        x,
        y,
        fill: cfg.origin._origin.bg,
        r: cfg.origin._origin.size / 2 + attrs.fontSize + 10,
      },
    });
    // 图片
    const imgWidth = 26;
    container.addShape('image', {
      attrs: {
        x: x - (imgWidth / 2),
        y: y + (imgWidth / 2) - 10,
        width: imgWidth,
        height: imgWidth,
        img: cfg.origin._origin.img,
      },
    });
    return container.addShape('text', {
      attrs: Object.assign(attrs, {
        x,
        y,
        fill: '#ffffff',
      }),
    });
  },
});

export default class circlecloud extends Component {
  render() {
    const { data } = this.props;
    const scale = {
      x: { nice: false },
      y: { nice: false },
    };

    const dv = new DataSet.View().source(data);
    const range = dv.range('size');
    const min = range[0];
    const max = range[1];
    dv.transform({
      type: 'tag-cloud',
      fields: ['cate', 'size'],
      size: [window.innerWidth, 400],
      font: 'Verdana',
      padding: 20,
      timeInterval: 5000,
      fontSize(d) {
        if (d.size) {
          return ((d.size - min) / (max - min)) * 14 + 12;
        }
        return 0;
      },
      rotate() {
        return 0;
      },
    });

    return (
      <Chart
        data={dv}
        height={400}
        padding={50}
        scale={scale}
        forceFit
        onGetG2Instance={g2Chart => this.props.updateInstance && this.props.updateInstance(g2Chart)}
      >
        <Tooltip showTitle={false} />
        <Coord reflect="y" />
        <Geom type="point" position="x*y" color="key" shape="cloud" />
      </Chart>
    );
  }
}
