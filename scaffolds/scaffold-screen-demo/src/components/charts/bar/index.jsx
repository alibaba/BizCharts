import React, { Component } from 'react';
import { Chart, Coord, Geom, Shape } from 'bizcharts';

import Utils from '../../../utils';

const { formatterNumber } = Utils;
const greenColors = ['#d8e962', '#b6ef7f', '#9ef394', '#90f4a0', '#9bf396'];
const yellowColors = ['#e24e4c', '#e35c51', '#e46c55', '#e77a5b', '#e8875f'];

for (const item of ['compareBar', 'compareOrderBar']) {
  Shape.registerShape('interval', item, {
    drawShape(cfg, container) {
      const points = cfg.points;
      const maxPts = this.parsePoints([{ x: 1.0, y: 1.0 }]);
      let path = [];
      path.push(['M', points[0].x, points[0].y]);
      path.push(['L', points[1].x, points[1].y]);
      path = this.parsePath(path);

      // 今年数据，背景层
      if (cfg.origin._origin.type === 'value') {
        container.addShape('rect', {
          attrs: {
            x: 0,
            y: cfg.y, // 矩形起始点为左上角
            width: maxPts[0].x,
            height: cfg.size,
            fill: '#28283a',
            radius: cfg.size / 2,
          },
        });
        // 右侧数值
        container.addShape('text', {
          attrs: {
            fontSize: 14,
            fontFamily: 'Arial,Microsoft YaHei,黑体,宋体,sans-serif',
            text: formatterNumber(cfg.origin._origin.sold),
            fill: cfg.origin.color,
            textAlign: 'right',
            textBaseline: 'middle',
            x: maxPts[0].x,
            y: cfg.y,
          },
        });
        // 标题文案
        container.addShape('text', {
          attrs: {
            fontSize: 14,
            fontFamily: 'Arial,Microsoft YaHei,黑体,宋体,sans-serif',
            text: cfg.origin._origin.key,
            fill: '#ABB9C8',
            textAlign: 'left',
            textBaseline: 'middle',
            x: 0,
            y: cfg.y - 12,
          },
        });
      } else if (cfg.origin._origin.type === 'last') {
        container.addShape('text', {
          attrs: {
            fontSize: 10,
            fontFamily: 'Arial,Microsoft YaHei,黑体,宋体,sans-serif',
            text: `去年数值 ${formatterNumber(cfg.origin._origin.sold)}`,
            fill: '#6A7088',
            textAlign: 'left',
            textBaseline: 'middle',
            x: cfg.x,
            y: cfg.y + 2,
          },
        });
      } else {
        container.addShape('text', {
          attrs: {
            fontSize: 12,
            fontFamily: 'Arial,Microsoft YaHei,黑体,宋体,sans-serif',
            text: `${cfg.origin._origin.sold ? `对比去年${cfg.origin._origin.sold}x` : ''}`,
            fill: '#6A7088',
            textAlign: 'left',
            textBaseline: 'middle',
            x: cfg.origin._origin.key.length * 16,
            y: cfg.y + 6,
          },
        });
      }

      // 今年数据和去年数据，前景层
      if (cfg.origin._origin.type !== 'comparison') {
        container.addShape('rect', {
          attrs: {
            x: 0,
            y: cfg.y, // 矩形起始点为左上角
            width: path[1][1] - path[0][1],
            height: cfg.size,
            fill: cfg.origin._origin.type === 'last' ? '#6A7088' : cfg.origin.color,
            radius: cfg.size / 2,
          },
        });
      }
      return container;
    },
  });
}

export default class Bar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
    };
  }

  componentDidMount() {
    this.setState({
      height: this.dom.clientHeight,
    });
  }

  render() {
    const { height } = this.state;
    const { data, type, hasComparison } = this.props;
    const colorGrp = type === 'yellow' ? yellowColors : greenColors;

    for (const item of data) {
      item.comparison = item.value / item.last;
      if (item.comparison === Infinity || isNaN(item.comparison)) { // eslint-disable-line
        item.comparison = undefined;
      } else {
        item.comparison = (item.comparison).toFixed(1);
      }
    }
    const reverseData = data.reverse();

    const dataSets = hasComparison ? ['last', 'value', 'comparison'] : ['value'];
    const ds = new window.DataSet();
    const dv = ds.createView().source(reverseData);
    dv.transform({
      type: 'fold',
      fields: dataSets,
      key: 'type',
      value: 'sold',
    });
    const cols = {
      sold: {
        range: [0, 0.7],
      },
    };

    return (
      <div className="bar-container" ref={(dom) => { this.dom = dom; }}>
        <Chart
          height={height}
          data={dv}
          forceFit
          padding={[10]}
          scale={cols}
        >
          <Coord transpose />
          <Geom
            type="interval"
            position="key*sold"
            color={['type', colorGrp]}
            size={6}
            adjust={[{
              type: 'dodge',
            }]}
            shape={type === 'yellow' ? 'compareOrderBar' : 'compareBar'}
          />
        </Chart>
      </div>
    );
  }
}
