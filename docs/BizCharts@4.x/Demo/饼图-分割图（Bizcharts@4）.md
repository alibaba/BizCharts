# 饼图-分割图（Bizcharts@4）

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/3221fad0-af9f-11ea-837f-55d728e4ee90.png)

```js
import React from "react";
import {
  Chart,
  registerShape,
  Geom,
  Axis,
  Tooltip,
  Interval,
  Interaction,
  Coordinate,
} from "bizcharts";

const data = [
  {
    type: "分类一",
    value: 20
  },
  {
    type: "分类二",
    value: 18
  },
  {
    type: "分类三",
    value: 32
  },
  {
    type: "分类四",
    value: 15
  },
  {
    type: "Other",
    value: 15
  }
]; // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值

const sliceNumber = 0.01; // 自定义 other 的图形，增加两条线

registerShape("interval", "sliceShape", {
  draw(cfg, container) {
    const points = cfg.points;
    let path = [];
    path.push(["M", points[0].x, points[0].y]);
    path.push(["L", points[1].x, points[1].y - sliceNumber]);
    path.push(["L", points[2].x, points[2].y - sliceNumber]);
    path.push(["L", points[3].x, points[3].y]);
    path.push("Z");
    path = this.parsePath(path);
    return container.addShape("path", {
      attrs: {
        fill: cfg.color,
        path: path
      }
    });
  }
});
    

class SliderChart extends React.Component {
  render() {
    return (
     <Chart data={data} height={500} autoFit >
        <Coordinate type="theta" radius={0.8} innerRadius={0.75} />
        <Axis visible={false} />
        <Tooltip showTitle={false} />
        <Interval
          adjust="stack"
          position="value"
          color="type"
          shape="sliceShape"
        />
        <Interaction type="element-single-selected" />
      </Chart>
       
    );
  }
}

ReactDOM.render(<SliderChart />, mountNode)

```
