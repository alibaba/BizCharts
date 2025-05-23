# Legend

## 什么是图例

> 图例（legend）是图表的辅助元素，使用颜色、大小、形状区分不同的数据类型，用于图表中数据的筛选。G2 会根据设置图形属性映射以及数据的类型自动生成不同的图例。
> shape, color, size 只有当 `<Geom />` 组件上有这三个属性中任意一个时，并且将 `<Legend>` 组件的 name 属性跟这个属性的字段关联上，才会显示图例；

* shape 属性，会根据不同的 shape 类型生成图例；
* color 属性, 会赋予不同的图例项不同的颜色来区分图形；
* size 属性, 在图例上显示图形的大小。

图例分为两种：

1. 分类图例。
2. 连续图例。

![image | center](https://zos.alipayobjects.com/skylark/9f146402-1e62-4029-b3b8-3d32029af1d6/attach/2378/eb826d75a0bb34cb/image.png "")

## 父组件
[`<Chart />`](24)

## 子组件
无

## 使用说明
* 图表默认不显示图例,只有置了`<Legend />`才会展示图例。

```js
// Basic Usage
<Chart width={600} height={400} data={data}>
  <Legend />
  <Geom type="bar" position="genre*sold" color="genre" />
</Chart>
```

* 使用 `<Legend/>` 组件时，可以指定当前图例对应数据源中的字段名（字段名为name），不指定则默认设置所有图例；


```js
// 指定图例对应数据源中的字段名
<Chart width={600} height={400} data={data}>
    // Geom 组件上必须有 `shape, color, size `中某个属性值为 genre 字段，才会有图例出现。
	<Legend name="genre" position="right" title={null} dx={20} />
	<Geom type="bar" position="genre*sold" color="genre" />
</Chart>

// 不指定图例对应数据源中的字段名，则默认设置所有图例
<Chart width={600} height={400} data={data}>
	<Legend position="right" title={null} dx={20} />
	// Geom 组件上必须有 `shape, color, size `中某个属性值为 genre 字段，才会有图例出现。
	<Geom type="bar" position="genre*sold" color="genre" />
</Chart>
```

* 一旦使用 `<Legend/>` 组件，那么所有的图例都会显示，如若需要隐藏某一个图例，将 visible 参数配置为 false，如下所示：

```html
<Chart width={600} height={400} data={data}>
	<Legend name="genre" visible={false} />
	<Legend name="type" visible={true} />
	<Geom type="bar" position="genre*sold" color="genre" />
	<Geom type="line" position="genre*sold" color="type" />
</Chart>
```

## API

**分类类型**和**连续类型**的配置有一定的区别，下面列出了这两种类型支持的可配置的属性：

## 共同属性

### name
_<String>_
* 描述：图例的对应到数据源中的数据字段名，不传则默认设置所有图例。

### visible
_<Boolean>_
* 描述：图例是否可见,默认值:true。

### position
_<String>_
* 描述：设置图例的显示位置，可设置的值有12个：`left-top`,`left-center`,`left-bottom`,`right-top`,`right-bottom`, `right-center`,`top-left`,`top-center`,`top-right`,`bottom-left`,`bottom-center`,`bottom-right`。也可使用`bottom`,`top`,`left`,`right`设置位置，此时对应的值分别为`bottom-center`,`top-center`,`left-bottom`,`right-bottom`。
* 默认值: bottom-center。
[demo链接](https://bizcharts.alibaba-inc.com/product/bizcharts/demo/110)

### offsetX
_<Number>_
* 描述：图例 x 方向的偏移值，数值类型，数值单位为 'px'，默认值为 0。

### offsetY
_<Number>_
* 描述：图例 Y 方向的偏移值，数值类型，数值单位为 'px'，默认值为 0。

### title
_<Boolean>_ _<Object>_
* 描述: 图例标题的显示样式设置，如果值为 null，表示不展示图例标题，默认不展示。
```js
<Chart width={600} height={400} data={data}>
  <Legend name="genre" title={{
      textAlign: 'center', // 文本对齐方向，可取值为： start middle end
      fill: '#404040', // 文本的颜色
      fontSize: '12', // 文本大小
      fontWeight: 'bold', // 文本粗细
      rotate: 30, // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
      textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
  }} />
	<Geom type="bar" position="genre*sold" color="genre" />
</Chart>
```
### textStyle
_<Object>_
* 描述：图例的背景样式配置。参考[绘图属性](./40)Text的样式

```js
<Legend name="genre" textStyle={{
  textAlign: 'start', // 文本对齐方向，可取值为： start middle end
  fill: '#404040', // 文本的颜色
  fontSize: '12', // 文本大小
  fontWeight: 'bold', // 文本粗细
  rotate: 30, // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
  textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
}} />
```

## 分类图例
![image | center](https://img.alicdn.com/tfs/TB1roBwhrYI8KJjy0FaXXbAiVXa-450-232.png "")


### layout
_<String>_
* 描述: 对分类类型的图例生效，用于设置各个图例项的排列方式，可设置值包括：vertical、horizontal，分别表示垂直和水平排布。


### itemGap
_<Number>_
* 描述: 对分类类型的图例生效，表示图例每项之间的间距，如果是水平排布则为左右间距，如果是竖直排布则其在出现多列时有效，并代表不同列的左右间距。

### itemMarginBottom
_<Number>_
* 描述：对分类类型的图例生效，表示各个图例项垂直方向的间距。

### itemWidth
_<Number>_
* 描述：对分类类型的图例生效，设置图例项的宽度，当图例有很多图例项，并且用户想要这些图例项能垂直对齐时，此时这个属性可帮用户实现此效果。
<img src="https://img.alicdn.com/tfs/TB1HzWCuwHqK1RjSZJnXXbNLpXa-1718-894.png" style="width: 80%" />


### unCheckColor 
_<String>_
* 描述：对分类类型的图例生效，用于取消选中的图例文本颜色。

### background
_<Number>_
* 描述：对分类类型的图例生效，用于设置图例的背景样式。
```js
<Legend name="genre" background={{
  fill:"#ff0000",
  fillOpacity:0.5,
}} />
```

### allowAllCanceled
_<Boolean>_
* 描述：对分类类型的图例生效，表示是否允许所有图例项被取消选中，默认为 false，即必须保留一个被选中的图例项。

### itemFormatter
_<Function>_
* 描述：回调函数，用于格式化图例每项的文本显示。
```js
<Legend
    itemFormatter = {val => {
      return val + "xxx"; // val 为每个图例项的文本值
    }}
/>

```


### marker
_<String>_ _<Function>_
* 描述：对分类类型的图例生效，用于设置图例的 marker 样式，默认按照 geom 的类型显示。
      - 当为 string 类型时，可选项如下:
| type | shape |
|------|-------|
| circle  | ![](https://antv.alipay.com/assets/image/g2/tutorial/circle.png)|
|square  |![](https://antv.alipay.com/assets/image/g2/tutorial/square.png)|
|bowtie  |![](https://antv.alipay.com/assets/image/g2/tutorial/bowtie.png)|
|diamond |![](https://antv.alipay.com/assets/image/g2/tutorial/diamond.png)|
|hexagon |![](https://antv.alipay.com/assets/image/g2/tutorial/hexagon.png)|
|triangle|![](https://antv.alipay.com/assets/image/g2/tutorial/triangle.png)|
|triangle-down|![](https://antv.alipay.com/assets/image/g2/tutorial/triangle-down.png)|
|tick|![](https://antv.alipay.com/assets/image/g2/tutorial/tick.png)|
|plus|![](https://antv.alipay.com/assets/image/g2/tutorial/plus.png)|
|hyphen|![](https://antv.alipay.com/assets/image/g2/tutorial/hyphen.png)|
|line|![](https://antv.alipay.com/assets/image/g2/tutorial/line.png)|
|hollowCircle|![](https://antv.alipay.com/assets/image/g2/tutorial/hollowCircle.png)|
|hollowSquare|![](https://antv.alipay.com/assets/image/g2/tutorial/hollowSquare.png)|
|hollowBowtie|![](https://antv.alipay.com/assets/image/g2/tutorial/hollowBowtie.png)|
|hollowDiamond|![](https://antv.alipay.com/assets/image/g2/tutorial/hollowDiamond.png)|
|hollowHexagon|![](https://antv.alipay.com/assets/image/g2/tutorial/hollowHexagon.png)|
|hollowTriangle|![](https://antv.alipay.com/assets/image/g2/tutorial/hollowTriangle.png)|
|hollowTriangle-down|![](https://antv.alipay.com/assets/image/g2/tutorial/hollowTriangle-down.png)|

      - 当为 Function 时，可以自定义 shape 图形，使用方式如下:

```js
/**
 * 自定义 marker 形状
 * @param  {number} x   该 marker 的横轴坐标
 * @param  {number} y   该 marker 的纵轴坐标
 * @param  {number} r   该 marker 的半径大小
 * @return {null}     
 */
marker = {(x, y, r) => {
}}
```
以下代码绘制了如图所示的 marker: <img style='display:inline;margin:0' src='http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/1edafb90-f273-11ea-bbeb-8bad211ff8c4.jpg' width='40px'/>
```js
marker = {{
      symbol: (x, y, radius) => {
        const r = radius / 2;
        return [
          ['M', x - 3 * r, y],
          ['L', x + 3 * r, y],
          ['M', x - r, y],
          ['A', r, r, 0, 0, 0, x + r, y],
          ['A', r, r, 0, 0, 0, x - r, y],
        ];
      },
    }}
```



### attachLast
_<Boolean>_
* 描述: 是否启用尾部跟随图例(tail-legend)，尾部跟随图例自动跟随geom的最后一个数据点，适用的图表类型为line、stackLine、area、stackArea。 默认为 false ，即不启用。

### clickable
_<Boolean>_
* 描述：对分类类型的图例生效，设置图例项是否允许点击，默认为 true，即允许点击。

### hoverable
_<Boolean>_
* 描述：对分类类型的图例生效，设置是否开启鼠标 hover 至图例的交互效果，默认为 true，即开启动画。

### selectedMode
_<String>_
* 描述：针对分类类型图例，当 clickable 为 true 时该配置项生效，用于设置图例的选中交互模式，可配置的属性:
    - selectedMode: 'single'：表示开启单选模式；
    - selectedMode: 'multiple'：表示开启多选模式，默认为 multiple。

### onHover
_<Function>_
* 描述：针对分类类型的图例，用于自定义鼠标 hover 图例项的交互，当 hoverable 为 false 不生效。
```js
 // 自定义图例项鼠标 hover 事件，hoverable 为 false 不生效
<Legend onHover={ev=>{console.log(ev)}}/>
```

### onClick
_<Function>_
* 描述：针对分类类型的图例，用于自定义鼠标点击图例项的交互，当 clickable 为 false 不生效。
```js
// 自定义图例项点击事件， clickable 为 false 不生效
<Legend onClick={ev=>{console.log(ev)}}/>
```
![](https://img.alicdn.com/tfs/TB1YpOyk.D1gK0jSZFGXXbd3FXa-2726-1236.png_800x800)

## 分类 html 自定义图例

分类 html 自定义图例大部分属性跟分类图例是一样的，需要额外设置以下属性。

### useHtml
_<Boolean>_ _<Function>_
* 描述：针对分类类型图例，用于开启是否使用 html 渲染图例，默认为 false，true 表示使用 html 渲染图例。

### container
_<String>_
* 描述：当 useHtml 为 true 时生效，用于指定生成图例的 dom 容器，那么该值必须为 dom 容器的 id 值为分类类型的话，则支持传入索引值。

### containerTpl
_<String>_
* 描述：当 useHtml 为 true 时生效，用于指定图例容器的模板，默认值如下：
```js
<Legend
  containerTpl={'<div class="g2-legend" style="position:absolute;top:20px;right:60px;width:auto;">'
  + '<h4 class="g2-legend-title"></h4>' 
  + '<ul class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;"></ul>'
  + '</div>'}
/>
```
### itemTpl
_<String>_ _<Function>_
* 描述：当 useHtml 为 true 时生效，用于指定生成图例的图例项 html 模板，默认值如下：
```js
<Legend
  itemTpl={'<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}" style="cursor: pointer;font-size: 14px;">'
  + '<i class="g2-legend-marker" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px;background-color: {color};"></i>'
  + '<span class="g2-legend-text">{value}</span>'
  + '</li>'}
/>
```
> !注意：自定义模板时必须包含各个 dom 节点的 class，样式可以自定义。

### g2-legend 
### g2-legend-item
### g2-legend-list-item
### g2-legend-marker
### g2-legend-text
_<Object>_
* 描述：当用户使用html时，可以通过向<Legend /> 组件传递 html原生支持的的class名来修改模板样式；
```js
<Legend position='bottom'
  useHtml={true}
  g2-legend = {{
    marginLeft: '100px',
    marginTop: '-107px'
  }}
  g2-legend-list={{
    border: 'none'
  }}
/>
```

### scroll
_<Boolean>_
* 描述：当用户使用 html 的时候，超出高度或者宽度会自动换行。

## 连续图例

### sizeType
_<circle>_ _<normal>_ _<null>_
* 描述：针对连续的大小图例，设置图例是否是针对节点大小映射的样式。

当为 circle 时的样式：

![](https://img.alicdn.com/tfs/TB1RGWyuwDqK1RjSZSyXXaxEVXa-418-138.png)

当为 normal 时的样式：

![](https://img.alicdn.com/tfs/TB1n4uCuCzqK1RjSZFHXXb3CpXa-442-116.png)

### slidable
_<Boolean>_
* 描述：针对连续图例，用于设置连续图例是否允许滑动，默认为 true，即开启滑动操作。

### reactive
_<Boolean>_
* 描述：设置是否开启鼠标 hover 图表元素时，图例对应项的高亮效果。默认为 false，即不开启动画。

### width
_<Number>_
* 描述：针对连续图例，用于设置图例的宽度。

### height
_<Number>_
* 描述：针对连续图例，用于设置图例的高度。

### 自定义混合图例
自定义图例大部分属性跟普通图例一样，需要额外配置的属性有。

### custom
_<Boolean>_
* 描述：默认为 false，当 custom 为 true，表示不使用默认生成的图例，允许用户自定义图例，包括具体的图例项以及 click、hover 交互。

自定义图例时需要用户自己声明具体的图例项 items(该属性是一个对象数组，数组中每一项为一个对象类型，结构为： { value: '', marker:{fill: 'red'}})以及图例项的 hover 和 click 事件。

[custom API Demo 示例](https://bizcharts.alibaba-inc.com/product/bizcharts/demo/112)


### items
_<Object>_
* 描述：自定义图例的配置。需要用户自己声明具体的图例项（每个图例项结构为 { value: '', fill: '', marker: '' }）以及图例项的 hover 和 click 事件。

```js
<Legend
  custom={true}
  items={[
    { value: 'waiting', fill: '#3182bd', marker: 'shape' },
    { value: 'call', fill: '#99d8c9', marker: 'shape' },
    { value: 'people', fill: '#fdae6b', marker: 'shape' },
  ]}
  onHover={ev => {console.log(ev)}} // 自定义 hover 事件
  onClick={ev => {console.log(ev)}} // 自定义 click 事件
/>
```

[items API Demo 示例](https://bizcharts.alibaba-inc.com/product/bizcharts/demo/112)


```html
// 略...
<Chart height={400} data={dv} scale={cols} forceFit>
  <Axis name="month" />
  <Axis name="temperature" label={{formatter: val => `${val}°C`}}/>
  <Legend />
  <Tooltip crosshairs={{type : "y"}}/>
  <Geom type="line" position="month*temperature" size={2} color={'city'} />
  <Geom type='point' position="month*temperature" size={4} shape={'circle'} color={'city'} style={{ stroke: '#fff', lineWidth: 1}} />
</Chart>
```
<img src="https://img.alicdn.com/tfs/TB1..5Ma8fH8KJjy1XbXXbLdXXa-1600-856.png" style="width: 80%" />
