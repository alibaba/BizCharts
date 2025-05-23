# Axis

坐标轴的配置，BizCharts中将Axis抽离为一个单独的组件，不使用Axis组件则默认不显示所有坐标轴及相关的信息。

## 使用说明

* 使用Axis组件时，必须指定当前坐标轴对应数据源中的字段名（字段名为name），否则该坐标轴相关配置信息将不起作用；

```js
// 指定坐标轴对应数据源中的字段名
<Chart width={600} height={400} data={data}>
  <Axis name="sold" />
  <Geom type="interval" position="genre*sold" color="genre" />
</Chart>
```
* 图表默认显示Axis,如果不需要可通过visible=false关闭对应name的坐标轴

```js
// 不显示坐标轴
<Chart width={600} height={400} data={data}>
  <Axis name="x" visible={false} />
</Chart>
```

* 坐标轴由如下五部分组成：
  
![坐标轴组成](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*1L3wTJfnjLAAAAAAAAAAAABkARQnAQ)



## API详解
###  name 
_<string>_
- 描述：坐标轴对应数据源中的字段名，如果不配置则对所有轴生效，但只支持配置visible；
- 如果需要单独配置某个坐标轴的位置（position）、文本（label）、格网（grid）展示等，需要配置name为坐标轴对应数据源中的字段名。
```js
  <Axis name="sold" />
```

###  visible 
_<boolean>_
- 描述：对应name的坐标轴是否可见，默认值`true`。
```js
  <Axis name="genre" visible={false} />
```

###  position 
_<string>_
- 描述：设置当前坐标轴的摆放位置，可设置的值为`top`、`bottom`、`left`、`right`。


###  title 
_<object>_ _<boolean>_
- 描述：当前坐标轴标题是否需要显示,及其样式配置。是否显示轴的 title 是默认不显示。如果需要显示需要将此属性配置为 `true`
```js
  <Axis title />
```
通过以下配置对标题进行个性化配置。

```js
const title = {
  style: { // 绘图属性配置
  	fontSize: 12,
  	textAlign: 'center',
  	fill: '#999',
  	fontWeight: 'bold',
  	rotate: {角度弧度）
  },
  // 设置标题 title 距离坐标轴线的距离
  offset: Number,
  // 文本旋转角度（弧度）
  rotate: number,
  // 是否自动旋转，默认 true
  autoRotate: boolean | (isVertical: boolean, labelGroup: IGroup, limitLength?: number) => boolean; | string,
  // 是否自动隐藏，默认 false
  autoHide: boolean | (isVertical: boolean, labelGroup: IGroup, limitLength?: number) => boolean; | string,
  // 是否自动省略，默认 false
  autoEllipsis: boolean | (isVertical: boolean, labelGroup: IGroup, limitLength?: number) => boolean; | string,
  /**
   * 适用于直角坐标系，设置坐标轴的位置。
   */
  position?: 'start' | 'center' | 'end' 
}
```
提示：当需要为坐标轴设置别名时，需要在该轴的 scale 中设置 alias 属性，如下所示，更多 scale 设置请查看 [scale](35)。


```js
const scale = {
  month:{
    alias:'月份' // 别名
  }
};

<Chart scale={scale} >
  <Axis name="month" title />
</Chart>
```

### line 
_<object>_ _<boolean>_
- 描述：设置坐标轴线的样式，包括线的颜色、粗细等。如果该属性值为 false 则表示不展示坐标轴线。样式设置细节参考[绘图属性](40)
> 如果发现`line`的样式被`grid`遮盖了，可以把`line`和`grid`的`lineWidth`都去掉，或者设置为一样的值。

```js
//可配置样式
<Axis line={{
  style:{
    stroke: '#ddd',
    fill: '#ffffff',
    lineDash: [2, 2, 3],
    lineWidth: 3
  }
}} />
```

### tickLine 
_<object>_ _<null>_
- 描述：设置坐标轴的刻度线。如果该属性值为 null 则表示不展示。

```js
//可配置样式
const tickLine = {
  style: {
    lineWidth: 1, // 刻度线宽
    stroke: '#ccc', // 刻度线的颜色
  },
  length: 5, // 刻度线的长度, **原来的属性为 line**,可以通过将值设置为负数来改变其在轴上的方向
  
}
```
提示：刻度线个数、范围、内容可以通过该轴的 scale 配置，如下所示，更多 scale 配置请查看 [scale](35)。

```js
const scale = {
  sales:{
    min: 0, // 定义数值范围的最小值
    max: 10000, // 定义数值范围的最大值
    ticks: [100, 1000, 2000, 3000], // 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。
    tickInterval: 1000, // 用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，tickCount 和 tickInterval 不可以同时声明。
    tickCount: 10, // 定义坐标轴刻度线的条数，默认为 5
  }
};

<Chart scale={scale} >
  <Axis name="sold" tickLine={tickLine}/>
</Chart>
```
<span id="label"></span>

###  label 
_<object>_ _<null>_
- 描述：设置坐标轴文本的样式。如果该属性值为 null 则表示不展示坐标轴文本。
- 配置label属性请一定要指定name字段。即坐标轴对应的字段名。
```js
const label = {
  offset: {number}, // 数值，设置坐标轴文本 label 距离坐标轴线的距离
  rotate: Math.PI / 2, // 文本旋转角度（弧度）
  // 设置文本的显示样式，还可以是个回调函数，回调函数的参数为该坐标轴对应字段的数值
  style: {
    textAlign: 'center', // 文本对齐方向，可取值为： start center end
    fill: '#404040', // 文本的颜色
    fontSize: 12, // 文本大小
    fontWeight: 'bold', // 文本粗细
    textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
  },
  verticalLimitLength:{number}, // 文字最大长度，超出显示省略号，默认宽度1/3
  autoHide: {boolean}, // 是否自动隐藏，默认 true
  autoEllipsis: {boolean}, // 是否自动省略，默认 false
  autoRotate: {boolean}, // 文本是否需要自动旋转，默认为 true
  /**
   * 用于格式化坐标轴上显示的文本信息的回调函数
   * @param  {string} text  文本值
   * @param  {object} item  该文本值对应的原始数据记录
   * @param  {number} index 索引值
   * @return {string}       返回格式化后的文本值
   */
  formatter(text, item, index) {
    let arr = text.split(' ');
    return `${arr[0]}\n${arr[1]}`;
  },
  // 不再支持html 类型的label
}

<Chart scale={scale} >
  <Axis name="sold" label={label}/>
</Chart>
```

提示：label显示文本等配置也可以通过该轴的 scale 配置，如下所示，更多 scale 配置请查看 [scale](35)。

```js
const scale = {
  sales: {
    min:0, // 定义数值范围的最小值
    max:10000, // 定义数值范围的最大值
    ticks:[100, 1000, 2000, 3000], // 用于指定坐标轴上刻度点的文本信息（label），当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。
    tickInterval: 1000, // 用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，tickCount 和 tickInterval 不可以同时声明。
    tickCount: 10, // 定义坐标轴刻度线的条数，默认为 5
  }
};

<Chart scale={scale} >
  <Axis name="sold" label={label}/>
</Chart>
```

### grid 
_<object>_ _<null>_
- 描述：设置坐标轴网格线的样式，网格线与坐标轴线垂直。如果该属性值为 null 则表示不展示。
更多参考[绘图属性](40)

```js
//可配置样式
const grid = {
  align: 'center', // 网格顶点从两个刻度中间开始
  line: { // 当line为null时则不展示网格线
    type: 'line', // 网格线类型 line circle polygon
    style: {
    	stroke: '#d9d9d9', // 网格线的颜色
    	lineWidth: 1, // 网格线的宽度复制代码
    	lineDash: [4, 4] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
    }
  }, // 网格线的样式配置，原有属性为 line
  alternateColor: '#ccc' || ['#f80', '#ccc'], // 为网格设置交替的背景色，指定一个值则先渲染奇数层，两个值则交替渲染。**代替原有的 odd 和 even 属性**
  alignTick: false, // 是否同刻度线对齐，如果值为 false，则会显示在两个刻度中间。 alignTick设为false，且数据类型为 category 时，tickLine 的样式变为 category 数据专有样式
}
```
设置alignTick为false且数据类型为 category 时:
![alignTick:false](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*ZbKGTK5s49oAAAAAAAAAAABkARQnAQ)

###  subTickLine 
_<object>_
- 描述：当前坐标轴次刻度线样式配置。
```js
//可配置样式
<Axis
  name="x"
  subTickLine={{
    style: {
      lineWidth: 1, // 次刻度线宽
      stroke: '#ddd', // 次刻度线颜色
      strokeOpacity: 0.5, // 次刻度线颜色的透明度
    },
    length: 3 // 次刻度线的长度，可以为负值（表示反方向渲染）
  }}
/> 
```

###  animate 
_<boolean>_
* 描述：动画开关，默认开启。

###  verticalFactor 
_<number>_
* 描述：标记坐标轴 label 的方向，左侧为 1，右侧为 -1。

## 其他配置
坐标轴有很多配置是需要通过配置对应的 scale 才能达到。以下列举了几个常用的 scale 配置，不同类型的 scale 配置的属性略微不同，想知道更多请查看[scale文档](35)
### 坐标轴显示范围
需要设置对应 scale 中的 min、max 属性。

```js
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

### 坐标轴刻度个数
需要设置对应 scale 中的 tickCount 属性。

```js
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
### 坐标轴刻度线间距
对于连续类型的数据，还支持设置坐标轴刻度线的间距（tickInterval 属性），同样需要在 scale 中进行配置，但是需要说明的是，tickInterval 为原始数据值的差值，并且 tickCount 和 tickInterval 不可以同时声明。

```js
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

### 坐标轴两端空白
对于分类数据的坐标轴两边默认会留下一定的空白，连续数据的坐标轴的两端没有空白刻度。

![坐标轴](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791895682958949d755f/attach/4080/900/image.png)

是否两端有空白是列定义里面 range 属性决定的，分类列的 range 的默认值是 [ 1 / (count - 1), 1 - 1 / (count - 1) ]，可以修改这个值达到改变空白大小的目的。

```js
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

### 坐标轴在其他坐标系下的显示

不同的坐标系下坐标轴的显示不一样，默认的配置项也不同

* 极坐标下的坐标轴上默认不显示title，栅格线有圆形和多边形两种；
* theta、helix 坐标系默认不显示坐标轴；
* polar 坐标系发生 transpose 时也不显示坐标轴。