import React, { Component } from 'react';
import { Chart, Axis, Geom, Shape, Util, PathUtil } from 'bizcharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8441', '#EE3B61', '#FF6590', '#9575DE', '#8EA4F1', '#C6E8D2', '#FFDB91', '#FF9054'];
// 柱状图变形
Shape.registerShape('interval', 'smoothInterval', {
  getShapePoints: (cfg) => {
    const width = cfg.size;
    const x = cfg.x;
    // 最小值的点出现高度为0的情况
    const end = cfg.y === 0 ? 0.1 : cfg.y;

    // 实现层叠效果，并且多加四个控制点(1,2,4,5)来调整贝塞尔曲线的弧度
    return [
      { x: x - width, y: cfg.y0 },
      { x: x - 0.025, y: end / 3 },
      { x: x - 0.005, y: end * 6 / 7 },
      { x: x + 0.02, y: end },
      { x: x + 0.045, y: end * 6 / 7 },
      { x: x + 0.065, y: end / 3 },
      { x: x + width + 0.04, y: cfg.y0 },
    ];
  },
  drawShape(cfg, container) {
    // 将归一化后的数据转换为画布上的坐标
    const points = cfg.points;

    const data = [];
    let prePoint = null;
    const first = points[0];
    const constaint = [ // 范围
      [0, 0],
      [1, 1],
    ];

    Util.each(points, (point) => {
      if (!prePoint || !(prePoint.x === point.x && prePoint.y === point.y)) {
        data.push(point.x);
        data.push(point.y);
        prePoint = point;
      }
    });

    const spline = PathUtil.catmullRomToBezier(data, false, constaint);
    let path = `M${first.x} ${first.y}${PathUtil.parsePathArray(spline)}`;
    path = PathUtil.pathToAbsolute(path);
    path = this.parsePath(path, false);

    return container.addShape('path', {
      attrs: {
        fill: cfg.color || '#00D9DF',
        path,
      },
    });
  },
});

export default class smoothbar extends Component {
  render() {
    const { data } = this.props;

    return (
      <Chart
        data={data}
        height={400}
        padding={50}
        forceFit
        onGetG2Instance={g2Chart => this.props.updateInstance && this.props.updateInstance(g2Chart)}
      >
        <Axis
          name="key"
          line={null}
          title={null}
          tickLine={null}
          label={{
            htmlTemplate: (text, item, index) => `<div style="color:${COLORS[index]};width:45px;position:relative;left:15px;">${text}</div>`,
          }}
        />
        <Axis name="value" visible={false} />
        <Geom
          type="interval"
          position="key*value"
          color={['key', COLORS]}
          shape="smoothInterval"
          label={['value']}
        />
      </Chart>
    );
  }
}
