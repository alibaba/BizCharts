# 按需加载

自 bizcharts@3.1.8 版本起，开始支持按需加载资源文件的功能。

## 做法
g2 中资源主要是分为 core 和 对应个 geom 资源，g2 用户需要声明使用了哪个 [geom](https://github.com/antvis/g2/issues/364)。
- 在 bizcharts 中也类似，需要用户自己声明需要加载的资源模块,因此加入了各个类别的 geom 组件，参见 ``src/components/TypedGeom`` 目录。

| 组件 | 说明 | 
| :- | :- |
| ``<Line>`` | 相当于 ``<Geom type='line'>`` |
| ``<Interval>`` | 相当于 ``<Geom type='interval'>`` |
| ``<Area>`` | 相当于 ``<Geom type='area'>`` |
| ``<Point>`` | 相当于 ``<Geom type='point'>`` |
| ``<Path>`` | 相当于 ``<Geom type='path'>`` |
| ``<Edge>`` | 相当于 ``<Geom type='edge'>`` |
| ``<Heatmap>`` | 相当于 ``<Geom type='heatmap'>`` |
| ``<Polygon>`` | 相当于 ``<Geom type='polygon'>`` |
| ``<Schema>`` | 相当于 ``<Geom type='schema'>`` |
| ``<Venn>`` | 相当于 ``<Geom type='venn'>`` |


**因此如果想要按需加载 bizcharts 资源，请使用命名后的 geom 组件，例如 ``<Line> <Interval>`` 等，请勿使用之前的 <Geom> 组件，否则会全量加载 geom 资源。 **

- 需要使用原先 bizcharts 上的工具函数，请加载 ``import Chart from 'bizcharts/lib/core'``


## 使用 demo
直接加载需要的组件和模块使用即可。

```jsx
import * as bizUtil from 'bizcharts/lib/core'
import Chart from 'bizcharts/lib/components/Chart';
import Axis from 'bizcharts/lib/components/Chart';
import Line from 'bizcharts/lib/components/TypedGeom/Line';

bizUtil.setTheme('dark');

ReactDOM.render(
  <Chart
  width={600}
  height={500}
  data={[
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 }
  ]}
  >
    <Axis />
    <Line position="year*value"/>
  </Chart>
  ,
  mountNode
);
```
