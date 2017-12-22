
# Axis

坐标轴组件。

## 坐标轴组成
- 标题 title
- 坐标轴线 line
- 刻度文本 label
- 刻度线 tickLine
- 次刻度线 subTickLine
- 网格线 grid

![image | center](https://zos.alipayobjects.com/skylark/89e9966f-3bd1-4ab1-a134-e3e4cb71867a/attach/3597/ded46c0aecb0e73a/image.png "")

通常的图表都有 x 轴和 y 轴，默认情况下，x 轴显示在图表的底部，y 轴显示在左侧（多个y轴时可以是显示在左右两侧）。通过为坐标轴配置 position 属性可以改变坐标轴的显示位置。

>坐标轴上的所有的配置属性都是围绕在坐标轴各个组成上的。


## 使用说明

* `<Axis />` 坐标轴组件只可以作为 [`<Chart />`](chart.md) 组件 或者 [`<View />`](view.md) 组件的孩子，同时 `<Axis />` 组件下不能嵌套其他图表组件。

* BizCharts中将Axis抽离为一个单独的组件，不使用Axis组件则默认不显示所有坐标轴及相关的信息，如下所示：

```html
// 不显示坐标轴
<Chart width={600} height={400} data={data}>
  <Geom type="interval" position="genre*sold" color="genre" />
</Chart>
```
* 使用Axis组件时，必须指定当前坐标轴对应数据源中的字段名（字段名为name），否则该坐标轴相关配置信息将不起作用；

```html
// 指定坐标轴对应数据源中的字段名
<Chart width={600} height={400} data={data}>
  <Axis name="sold" />
  <Geom type="interval" position="genre*sold" color="genre" />
</Chart>
```
* 一旦使用`<Axis/>`组件，那么所有的坐标轴都会显示，如若需要隐藏某一个坐标轴及相关信息，务必将visible参数并置为false，如下所示：


```html
// 只显示其中一条坐标轴
<Chart width={600} height={400} data={data}>
  <Axis name="sold" />
  <Axis name="genre" visible={false} />
  <Geom type="interval" position="genre*sold" color="genre" />
</Chart>
```

## 属性
### 1、name		* String *
当前坐标轴对应数据源中的字段名(必填)

### 2、visible 	* Boolean *
当前坐标轴是否需要可见

### 3、position 	*'top'|'bottom'|'left'|'right'*
当前坐标轴的摆放位置。

### 4、title 	*Object*
当前坐标轴标题的样式配置。

- 样式配置

```javascript
{
  autoRotate: {Boolean} // 是否需要自动旋转，默认为 true
  offset: {Number}, // 设置标题 title 距离坐标轴线的距离
  textStyle: {
	fontSize: '12',
	textAlign: 'center',
	fill: '#999',
	fontWeight: 'bold',
	rotate: {角度}
  }, // 坐标轴文本属性配置
  position: 'start' || 'center' || 'end', // 标题的位置，**新增**
}
```

- title显示文本配置
当需要配置坐标轴标题文本时，在该轴的 scale 中设置 alias 属性，如下所示，更多 scale 设置请查看 scale。

```jsx
const scale = {
  sales:{
    alias:'标题名称'
  }
};

<Chart scale={scale} />
```

### 5、line 	*Object*
当前坐标轴轴线的样式配置。

```javascript
//可配置样式
{
  stroke: 'dddddd',
  fill: '#ffffff',
  lineDash: [2, 2, 3],
  lineWidth: 3
}
```

### 6、tickLine 	*Object*
当前坐标轴刻度线的样式配置。

```javascript
//可配置样式
{
  lineWidth: 1, // 刻度线宽
  stroke: '#ccc', // 刻度线的颜色
  length: 5, // 刻度线的长度, **原来的属性为 line**,可以通过将值设置为负数来改变其在轴上的方向
}
```

- 刻度线个数、范围、内容可以通过该轴的 scale 配置，如下所示，更多 scale 配置请查看 scale。

```jsx
const scale = {
  sales:{
    min:0,//定义数值范围的最小值
	max:10000,//定义数值范围的最大值
    ticks:[100, 1000, 2000, 3000],//用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。
	tickInterval:1000,//用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，tickCount 和 tickInterval 不可以同时声明。
	tickCount:10,//定义坐标轴刻度线的条数，默认为 5
  }
};

<Chart scale={scale} />
```

<span id="label"></span>

### 7、label 	*Object*
当前坐标轴刻度文本的样式配置。
可配置值有:

```javascript
{
  offset: {Number}, // 设置坐标轴文本 label 距离坐标轴线的距离
  textStyle: {
  textAlign: 'center', // 文本对齐方向，可取值为： start middle end
  fill: '#404040', // 文本的颜色
  fontSize: '12', // 文本大小
  fontWeight: 'bold', // 文本粗细
  rotate: 30,
  textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
  } || {Function}, // 支持回调
  autoRotate: {Boolean} // 是否需要自动旋转，默认为 true
  formatter: {Function}, // 回调函数，用于格式化坐标轴上显示的文本信息
  htmlTemplate: {Function}, // 使用 html 自定义 label
}
```

- label显示文本等配置也可以通过该轴的 scale 配置，如下所示，更多 scale 配置请查看 scale。

```jsx
const scale = {
  sales:{
    min:0,//定义数值范围的最小值
	max:10000,//定义数值范围的最大值
    ticks:[100, 1000, 2000, 3000],//用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。
	tickInterval:1000,//用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，tickCount 和 tickInterval 不可以同时声明。
	tickCount:10,//定义坐标轴刻度线的条数，默认为 5
  }
};

<Chart scale={scale} />
```

### 8、grid 	* Object | null*
当前坐标轴网格线的样式配置。当 `grid={null}` 时，则不现实网格线。

```javascript
//可配置样式
{
  align: 'center', // 网格顶点从两个刻度中间开始
  type: 'line' || 'polygon', // 网格的类型
  lineStyle: {
	stroke: '#d9d9d9', // 网格线的颜色
	lineWidth: 1, // 网格线的宽度复制代码
	lineDash: [4, 4] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
  }, // 网格线的样式配置，原有属性为 line
  alternateColor: '#ccc' || ['#f80', '#ccc'], // 为网格设置交替的背景色，指定一个值则先渲染奇数层，两个值则交替渲染。**代替原有的 odd 和 even 属性**
}
```

### 9、subTickCount 	*Number*
当前坐标轴次刻度线个数。

### 10、subTickLine 	*Object*
当前坐标轴次刻度线样式配置。
```javascript
//可配置样式
{
  lineWidth: 1, // 子刻度线宽
  stroke: '#ddd', // 子刻度线颜色
  length: 3, // 自刻度线的长度
}
```

## 其他配置
坐标轴有很多配置是需要通过配置对应的 scale 才能达到。以下列举了几个常用的 scale 配置，不同类型的 scale 配置的属性略微不同，想知道更多请查看[scale文档](scale.md)
### 1、坐标轴显示范围
需要设置对应 scale 中的 min、max 属性。

```jsx
const scale = {
  sales:{
    type:"linear",
    min:0,
	max:1000,
  },
}
<Chart scale={scale}>
  <Geom type="line" position="city*sales" />
  <Axis name="sales"/>
</Chart>
```

### 2、坐标轴刻度个数
需要设置对应 scale 中的 tickCount 属性。

```jsx
const scale = {
  sales:{
    type:"linear",
    tickCount:10,
  },
}
<Chart scale={scale}>
  <Geom type="line" position="city*sales" />
  <Axis name="sales"/>
</Chart>
```
### 3、坐标轴刻度线间距
对于连续类型的数据，还支持设置坐标轴刻度线的间距（tickInterval 属性），同样需要在 scale 中进行配置，但是需要说明的是，tickInterval 为原始数据值的差值，并且 tickCount 和 tickInterval 不可以同时声明。

```jsx
const scale = {
  sales:{
    type:"linear",
    tickInterval:100,
  },
}
<Chart scale={scale}>
  <Geom type="line" position="city*sales" />
  <Axis name="sales"/>
</Chart>
```

### 4、坐标轴两端空白
对于分类数据的坐标轴两边默认会留下一定的空白，连续数据的坐标轴的两端没有空白刻度。
![坐标轴](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791895682958949d755f/attach/4080/900/image.png)
是否两端有空白是列定义里面 range 属性决定的，分类列的 range 的默认值是 [ 1 / (count - 1), 1 - 1 / (count - 1) ]，可以修改这个值达到改变空白大小的目的。

```jsx
const scale = {
  city:{
    type:"cat",
    range: [ 0, 1 ]
  },
}
<Chart scale={scale}>
  <Geom type="line" position="city*sales" />
  <Axis name="sales"/>
</Chart>
```

### 5、坐标轴在其他坐标系下的显示

不同的坐标系下坐标轴的显示不一样，默认的配置项也不同

* 极坐标下的坐标轴上默认不显示title，栅格线有圆形和多边形两种；
* theta、helix 坐标系默认不显示坐标轴；
* polar 坐标系发生 transpose 时也不显示坐标轴。
