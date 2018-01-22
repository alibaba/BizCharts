# View

视图组件，由 Chart 实例生成和管理，拥有自己独立的数据源、坐标系和图层，用于异构数据的可视化以及图表组合。一个 Chart 由一个或者多个视图 View 组成，因此 view 上的属性基本同 chart 基本相同。

## 使用说明

**`<View />` 组件只可以作为 [`<Chart />`](chart.md) 组件的孩子，同时 `<View />` 组件下可以嵌套的组件有：**
  - [`<Coord/>`](coord.md) 坐标系组件
  - [`<Axis/>`](axis.md) 坐标轴组件,特性跟`<Chart/>`一样，默认全部不显示，若配置一个轴显示，则全部轴显示。
  - [`<Geom/>`](geom.md) 几何标记组件
  - [`<Legend/>`](legend.md) 图例组件
  - [`<Tooltip/>`](tooltip.md) 提示框组件
  - [`<Guide/>`](guide.md) 辅助标记组件
  - [`<Facet/>`](facet.md) 分面组件
  - [`<View/>`](view.md) 视图组件


**实际开发过程中，很多图表都可以采用View组件来实现，包含但不限于以下几个方面：**

* 在同一个容器中出现两个或者更多不同坐标系的图表时，可以采用View组件来实现，如下图所示；[Demo](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/pie/sunburst)
![image | center](https://img.alicdn.com/tfs/TB1GqOTa4rI8KJjy0FpXXb5hVXa-1600-856.png)

* 同一个容器中的两个图表需要采用不同的数据源时，如下图所示：[Demo](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/funnel/symmetric)
![image | center](https://img.alicdn.com/tfs/TB1w1flbhrI8KJjy0FpXXb5hVXa-1600-856.png)



```html
// 这里只显示部分核心代码
<Chart width={600} height={400} data={data}>
<Coord type="theta" radius={0.5} />
<Geom
  type="pie"
  position={Stat.summary.percent('value')}
  color={['type', ['#4E7CCC', '#36B3C3', '#F9815C']]}
/>
<View data={data}>
  <Coord type="theta" inner={0.75} />
  <Geom
    type="pie"
    position={Stat.summary.percent('value')}
    color="name"
  />
</View>
</Chart>
```

## 属性
### 1、id 	* String *
视图的 id 标识，用于唯一标定视图，如果用户不指定，G2 会默认提供一套 id 生成机制（‘view’ + views.length，如 view0, view1, …, viewN)。

### 2、start 	* Object *
绘制区域的起始坐标，x和y的取值范围均为0 -1。
参见:
```jsx
<View start={{x:0.5, y:0.5}} />
```
### 3、end 	* Object *
绘制区域的结束坐标，x和y的取值范围均为0 -1。

参见:
```jsx
<View end={{x:0.5, y:0.5}} />
```

### 4、data 	* Array | DataSet *
使用同 `Chart` 的 [data 属性](chart.md#data)。

### 5、animate 	* Boolean *
视图是否执行动画。
默认值:true。

### 6、scale 	* Object *
使用同 `Chart` 的 [scale 属性](chart.md#scale)。

### 7、filter 	* Object *
使用同 `Chart` 的 [filer 属性](chart.md#filter)。

