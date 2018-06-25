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
    return container.addShape('text', {
      attrs: Object.assign(attrs, {
        x: cfg.x,
        y: cfg.y,
      }),
    });
  },
});

export default class star extends Component {
  render() {
    const { data } = this.props;
    const scale = {
      x: { nice: false },
      y: { nice: false },
    };

    const dv = new DataSet.View().source(data);
    const range = dv.range('value');
    const min = range[0];
    const max = range[1];
    dv.transform({
      type: 'tag-cloud',
      fields: ['key', 'value'],
      size: [window.innerWidth, 400],
      font: 'Verdana',
      padding: 0,
      timeInterval: 5000,
      rotate() {
        let random = ~~(Math.random() * 4) % 4; // eslint-disable-line
        if (random === 2) {
          random = 0;
        }
        return random * 90;
      },
      fontSize(d) {
        if (d.value) {
          return ((d.value - min) / (max - min)) * (80 - 24) + 24;
        }
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
