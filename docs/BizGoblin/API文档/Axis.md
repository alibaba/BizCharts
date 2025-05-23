# Axis





坐标轴的配置，将Axis抽离为一个单独的组件，不适用Axis组件则默认不显示所有坐标轴及相关的信息。

## 使用说明
### 父组件
- [`<Chart />`](47)

### 子组件
- none

### 注意事项

```js
// 不显示坐标轴
<Chart width={320} height={240} data={data} defs={defs} >
  <Geom geom='line' position='time*tem' />
</Chart>
```

* 使用Axis组件时，必须指定当前坐标轴对应数据源中的字段名（字段名为name），否则该坐标轴相关配置信息将不起作用；


```js
// 指定坐标轴对应数据源中的字段名
<Chart width={320} height={240} data={data} defs={defs} >
  <Axis dataKey='time' label={label} />
  <Geom geom='line' position='time*tem' />
</Chart>
```

* 一旦使用`<Axis/>`组件，那么所有的坐标轴都会显示，如若需要隐藏某一个坐标轴及相关信息，务必将show参数并置为false，如下所示：

```js
// 只显示其中一条坐标轴
<Chart width={320} height={240} data={data} defs={defs} >
  <Axis dataKey='time' label={label} />
  <Axis dataKey='tem' show={false}/>
  <Geom geom='line' position='time*tem' />
</Chart>
```

## API

###  dataKey
* 类型：String
* 描述：当前坐标轴对应数据源中的字段名(必填)
```js
  <Axis dataKey="time" />
```

###  show
* 类型：boolean
* 描述：当前坐标轴是否需要可见，默认值true。
```js
  <Axis dataKey='tem' show={false}/>
```

###  position
* 类型：String
* 描述：当前坐标轴的摆放位置，可设置的值为`top`、`bottom`、`left`、`right`。`x` 轴默认位于底部 `bottom`， `y` 轴可设置 `position` 为 `left` 、 `right`。

###  line
* 类型：Object | null
* 描述：设置坐标轴线的样式，包括线的颜色、粗细等。如果该属性值为 null 则表示不展示坐标轴线。样式设置细节参考[绘图属性](https://bizcharts.alibaba-inc.com/product/bizcharts/category/7/page/40)

###  labelOffset
* 类型：Number
* 描述：坐标轴文本距离轴线的距离

###  grid
* 类型：Object | Function | null
* 描述：设置坐标轴网格线的样式，网格线与坐标轴线垂直。如果该属性值为 null 则表示不展示。细节参考[绘图属性](https://bizcharts.alibaba-inc.com/product/bizcharts/category/7/page/40)

```js
//可配置样式
const grid = {
  align: 'center', // 网格顶点从两个刻度中间开始
  type: 'line' || 'arc', // 网格的类型
  lineStyle: {
    stroke: '#d9d9d9', // 网格线的颜色
    lineWidth: 1, // 网格线的宽度复制代码
    lineDash: [4, 4] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
  }, // 网格线的样式配置，原有属性为 line
  alternateColor: '#ccc' || ['#f80', '#ccc'], // 为网格设置交替的背景色，指定一个值则先渲染奇数层，两个值则交替渲染。**代替原有的 odd 和 even 属性**
}
```


###  tickLine
* 类型：Object | Function | null
* 描述：设置坐标轴的刻度线。如果该属性值为 null 则表示不展示。

```js
//可配置样式
const tickLine = {
  lineWidth: 1, // 刻度线宽
  stroke: '#ccc', // 刻度线的颜色
  length: 5, // 刻度线的长度, **原来的属性为 line**,可以通过将值设置为负数来改变其在轴上的方向
}
```

###  label
* 类型：Object | Function | null
* 描述：坐标轴文本配置，设置 null，不展示坐标轴文本。

```js
const label = {
  offset: {number}, // 数值，设置坐标轴文本 label 距离坐标轴线的距离
  // 设置文本的显示样式，还可以是个回调函数，回调函数的参数为该坐标轴对应字段的数值
  textStyle: {
    textAlign: 'center', // 文本对齐方向，可取值为： start center end
    fill: '#404040', // 文本的颜色
    fontSize: '12', // 文本大小
    fontWeight: 'bold', // 文本粗细
    rotate: 30,
    textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
  } | (text) => {
    // text: 坐标轴对应字段的数值
  },
  autoRotate: {boolean}, // 文本是否需要自动旋转，默认为 true
  /**
   * 用于格式化坐标轴上显示的文本信息的回调函数
   * @param  {string} text  文本值
   * @param  {object} item  该文本值对应的原始数据记录
   * @param  {number} index 索引值
   * @return {string}       返回格式化后的文本值
   */
  formatter(text, item, index) {},
  /**
   * 使用 html 渲染文本
   * @param  {string} text  文本值
   * @param  {object} item  该文本值对应的原始数据记录
   * @param  {number} index 索引值
   * @return {string}       返回 html 字符串
   */
  htmlTemplate(text, item, index) {}
}
```

###  top
* 类型：boolean
* 描述：调整图层层级，true 表示展示在最上层图形，false 表示展示在最下层图形。
