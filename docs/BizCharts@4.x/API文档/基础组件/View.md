# View

视图，由 Chart 生成和管理，拥有自己独立的数据源、坐标系和图层，用于异构数据的可视化以及图表组合，一个 Chart 由一个或者多个视图 View 组成。因此 view 上的 api 同 chart 基本相同。

* 在同一个容器中出现两个或者更多不同坐标系的图表时，可以采用View组件来实现，如多层饼图。
* 在同一个容器中的两个图表需要采用不同的数据源时，如对比漏斗图。


## API

### region 
_<object>_

- 描述：绘制区域的范围，x和y的取值范围均为0到1。我们的起始点是从**左上角**开始的，终点为右下角。

参见:
```js
<View region={{
  start: { x: 0, y:0.5 },
  end: { x: 1, y: 1 }
}} />
```
> 3.X的 start和end属性将在4.1后废弃。请使用region替代。

### data 
_<array>_ _<dataSet>_

- 描述：使用同 `Chart` 的data属性。如果不配置则使用父级的Chart的data数据。


### scale 
_<object>_

- 描述：使用同 `Chart` 的 [scale 属性](77#scale)。


### padding 

- 描述：使用同 `Chart` 的 [padding 属性](77#padding)。

### animate 
_<boolean>_
- 描述：开启或者关闭动画。
