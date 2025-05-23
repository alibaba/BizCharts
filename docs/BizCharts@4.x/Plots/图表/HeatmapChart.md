# HeatmapChart

热力图，区块热力图，矩阵图

热力图，是一种通过对色块着色来显示数据的统计图表。

## 使用
解构使用
```js
import { HeatmapChart } from 'bizcharts';
function APP() {
  return <HeatmapChart {...options} />;
}
```
按需使用
```js
import AreaChart from 'bizcharts/lib/plots/HeatmapChart'; // es 取 'bizcharts/es/plots/HeatmapChart'
function APP() {
  return <HeatmapChart {...options} />;
}
```

## API

### width

**可选**, _<number>_

功能描述： 设置图表宽度。

默认配置： `400`

### height

**可选**, _<number>_

功能描述： 设置图表高度。

默认配置： `400`

### forceFit

**可选**, _<boolean>_

功能描述： 图表是否自适应容器宽高。当 `forceFit` 设置为true时，`width` 和 `height` 的设置将失效。

默认配置： `true`

### pixelRatio

**可选**, _<number>_

功能描述： 设置图表渲染的像素比

默认配置： `2`

### renderer

**可选**, _<string>_

功能描述: 设置图表渲染方式为 `canvas` 或 `svg`

默认配置： `canvas`

## 数据映射

### data

**必选**, _<array>_ _<object>_

功能描述： 设置图表数据源

默认配置： 无

数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

### meta
**可选**, _<object>_

功能描述： 全局化配置图表数据元信息，以字段为单位进行配置。在 meta 上的配置将同时影响所有组件的文本信息。

默认配置： 无

| 细分配置项名称 | 类型 | 功能描述 |
| --- | --- | --- |
| alias | *string* | 字段的别名 |
| formatter | *function* | callback方法，对该字段所有值进行格式化处理 |
| values | *string[]* | 枚举该字段下所有值 |
| range | *number[]* | 字段的数据映射区间，默认为[0,1] |


```js
const data = [
  { country: 'Asia', year: '1750', value: 502,},
  { country: 'Asia', year: '1800', value: 635,},
  { country: 'Europe', year: '1750', value: 163,},
  { country: 'Europe', year: '1800', value: 203,},
];

<HeatmapChart
  data={data}
  title={{
    visible: true,
  }}
  meta={{
    year: {
      alias:'年份'
      range: [0, 1],
    },
    value: {
      alias: '数量',
      formatter:(v)=>{return `${v}个`}
    }
  }}
  xField="value"
  yField="type"
  colorField="type"
/>

```

### xField
**必选**, _<string>_

功能描述： 色块形状在 x 方向位置映射对应的数据字段名，一般对应一个分类字段。

默认配置： 无

### yField
**必选**, _<string>_

功能描述： 色块形状在 y 方向位置映射所对应的数据字段名，一般对应一个分类字段。

默认配置： 无


### colorField✨

**必选**, _<string>_

功能描述:  色块颜色映射对应的数据字段名，一般对应一个连续字段。

默认配置： 无

### sizeField✨

**optional**, _<string>_

功能描述： 指定色块形状大小映射的字段，要求必须为一个**连续字段**。

默认配置： 无


## 图形样式

### color

**可选**, _<string[]>_

功能描述： 指定色块图颜色映射的色带颜色，数值中的值为色带节点的色值。
默认配置： 采用 theme 中的配色。

例如，下图的连续渐变色带是这样通过`color`配置项生成：

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*s4l-TZbuhmMAAAAAAAAAAABkARQnAQ" width="300">

```js
color: ['#295599', '#3e94c0', '#78c6d0', '#b4d9e4', '#fffef0', '#f9cdac', '#ec7d92', '#bc448c']
```

### shapeSize✨

**可选**, _<number[]>_

功能描述：指定色块形状大小的值域，顺序为[`min`,`max`]。

默认配置：[5,50]

用法示例：

```js
const matrixPlot = new Matrix(document.getElementById('container'), {
    data,
    xField: 'name',
    yField: 'country',
    colorField: 'value',
    sizeField: 'value',
    shapeSize: [2,20]
});
matrixPlot.render();
```

### shapeType✨

**可选**, _<string>_

功能描述： 指定色块形状的类型，支持设置`rect`和`circle`两种类型。

默认配置： 默认为`rect`。

### shapeStyle✨

**可选**, _<object | function>_

功能描述： 设置色块形状的样式。shapeStyle中的`fill`会覆盖 `color` 的配置。shapeStyle可以直接指定，也可以通过callback的方式，根据数据为每一根色块指定单独的样式。

默认配置： 无


### forceSquare✨

**可选**, _<boolean>_

功能描述：是否强制色块形状的 width 和 height 相等。

默认配置： false


## 图表组件

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*Ne3KQI23QJ0AAAAAAAAAAABkARQnAQ" width="600">

### title
**可选**, _<optional>_


功能描述： 配置图表的标题，默认显示在图表左上角。

默认配置：
```js
visible: false,
alignTo: 'left',
text:'',
style:{
    fontSize: 18,
    fill: 'black',
}
```
| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| alignTo | string | 位置，支持三种配置：<br />'left' | 'middle' | 'right' |
| style | object | 样式：<br />- fontSize: number 文字大小<br />- fill: string 文字颜色<br />- stroke: string  描边颜色<br />- lineWidth: number 描边粗细<br />- lineDash: number 虚线描边<br />- opacity: number 透明度<br />- fillOpacity: number 填充透明度<br />- strokeOpacity: number 描边透明度<br /> |

### description
**可选**, _<optional>_


功能描述： 配置图表的描述，默认显示在图表左上角，标题下方。

默认配置：
```js
visible: false,
alignTo: 'left',
text:'',
style:{
    fontSize: 12,
    fill: 'grey',
}
```
| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| alignTo | string | 位置，支持三种配置：<br />'left' | 'middle' | 'right' |
| style | object | 样式：<br />- fontSize: number 文字大小<br />- fill: string 文字颜色<br />- stroke: string  描边颜色<br />- lineWidth: number 描边粗细<br />- lineDash: number 虚线描边<br />- opacity: number 透明度<br />- fillOpacity: number 填充透明度<br />- strokeOpacity: number 描边透明度<br /> |

### xAxis
**可选**, _<object>_

功能描述： x方向上的坐标轴，用于展示xField对应的映射信息


默认配置：

```js
visible: true,
gridAlign: 'center',
grid: {
    visible: true,
},
tickLine: {
    visible: true,
},
line: {
    visible: false,
},
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否可见 |
| line | object | 坐标轴轴线<br />- visible: boolean 是否可见<br />- style：object 轴线样式<br /> |
| grid | object | 网格线<br />- visible: boolean 是否可见<br />- style：object 网格线样式<br /> |
| label | object | 坐标轴标签<br />- visible: boolean 是否可见<br />- formatter: function 坐标轴标签格式化<br />- suffix: string 后缀<br />- mask: string 为日期文本添加格式化遮罩，当坐标轴type为time时生效<br />- offsetX: number 位置在x方向上的偏移量<br />- offsetY：number 位置在y方向上的偏移量<br />- style：object 样<br /> -autoHide: boolean 是否自动隐藏<br/>-autoRotate: boolean 是否自动旋转 |
| tickLine | object | 坐标轴刻度<br />- visible：boolean 是否可见<br />- style: object 样式<br /> |
| title | object | 坐标轴标题<br />- visible： boolean 是否可见<br />- text: string 标题文字<br />- offset: number 位置偏移量<br />- style：object 样式<br /> |

### yAxis
**可选**, _<object>_


功能描述： y方向上的坐标轴，用于展示yField对应的映射信息

默认配置：
```js
visible: true,
grid: {
    visible: true,
},
line: {
    visible: true,
},
tickLine: {
    visible: true,
},
label: {
    visible: true,
    autoRotate: true,
    autoHide: true
},
title: {
    visible: false,
},
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否可见 |
| tickCount | number | 坐标轴刻度数量 |
| tickInterval | number | 坐标轴刻度间隔 |
| min | number | 设置坐标轴最小值 |
| max | number | 设置坐标轴最大值 |
| line | object | 坐标轴轴线<br />- visible: boolean 是否可见<br />- style：object 轴线样式<br /> |
| grid | object | 网格线<br />- visible: boolean 是否可见<br />- style：object 网格线样式<br /> |
| label | object | 坐标轴标签<br />- visible: boolean 是否可见<br />- formatter: function 坐标轴标签格式化 DEMO<br />- suffix: string 后缀<br />- precision：number  标签精度，如配置为 2，则格式化为 2 位小数<br />- offsetX: number 位置在x方向上的偏移量<br />- offsetY：number 位置在y方向上的偏移量<br />- style：object 样<br /> -autoHide: boolean 是否自动隐藏<br/>-autoRotate: boolean 是否自动旋转 |
| tickLine | object | 坐标轴刻度<br />- visible：boolean 是否可见<br />- style: object 样式<br /> |
| title | object | 坐标轴标题<br />- visible： boolean 是否可见<br />- text: string 标题文字<br />- offset: number 位置偏移量<br />- style：object 样式<br /> |

### legend
**可选**, _<object>_

功能描述：图例，用于展示颜色分类信息

默认配置：
```js
visible: true,
position: 'right-center',
```
| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否可见 |
| position | string | 位置，支持12方位布局<br />top-left, top-center,top-right<br />bottom-left,bottom-center,bottom-right<br />left-top,left-center,left-bottom<br />right-top,right-center,right-bottom |
| width | number | 图例宽度 |
| height | number | 图例高度 |
| text | object | 图例两端刻度值<br />- style: object 刻度值样式<br />- formatter: function 对刻度值进行格式化<br /> |
| ticklineStyle | object | 图例刻度线样式 |
| anchorStyle | object | 图例锚点滑块样式 |
| triggerOn | string | 图例响应交互的事件，默认为click |

完整配置示例：

```js
legend:{
    visible: true,
    position:'bottom-center',
    width: 300,
    height: 10,
    text:{
        formatter:(v)=>{
            return parseFloat(v) / 100;
        },
        style:{
            fill:'black',
            fontSize: 12
        }
    },
    anchorStyle:{
        fill:'black',
    },
    ticklineStyle:{
        lineDash:[2,2],
        stroke:'black'
    }
    triggerOn:'click'
}
```
效果： <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*PYRhRrc4kSoAAAAAAAAAAABkARQnAQ" width="400">


### tooltip
**可选**, _<object>_

功能描述：信息提示框

默认配置：
```js
visible: true,
offset: 20,
```

| 细分属性 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| offset | number | 距离鼠标位置偏移值 |
| domStyles | object | 配置tooltip样式<br />- g2-tooltip: object 设置tooltip容器的CSS样式<br />- g2-tooltip-title: object 设置tooltip标题的CSS样式<br />- g2-tooltip-list: object 设置tooltip列表容器的CSS 样式<br />- g2-tooltip-marker: object 设置tooltip列表容器中每一项 marker的CSS样式<br />- g2-tooltip-value: object 设置tooltip 列表容器中每一项 value的CSS样式<br /> |
| fields | string | 设置tooltip内容字段，默认为[ `xField`, `yField`, `colorField` ] |
| formatter | object | 对tooltip items进行格式化，入参为tooltip fields对应数值，出参为格式为{name:'a',value:1} |

### label

功能描述： 标签文本

默认配置：
```js
visible: false
offsetX: 6
offsetY: 6
style:{
  fill: 'rgba(0, 0, 0, 0.65)',
  stroke: '#ffffff',
  lineWidth: 2,
},
adjustColor: true,
adjustPosition: true
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| formatter | function | 对文本标签内容进行格式化 |
| offsetX | number | 在 label 位置的基础上再往 x 方向的偏移量 |
| offsetY | number | 在 label 位置的基础上再往 y 方向的偏移量 |
| adjustColor | boolean | 是否根据对应图形的颜色自动调整颜色 |
| adjustPosition | boolean | 显示空间不够时是否自动隐藏 |
| style | object | 配置文本标签样式。 |



## 事件 events

使用说明：
```js
<HeatmapChart
    events={{
        onRectClick: (event) => console.log(event),
        onPlotClick: (event) => console.log(event),
        onLegendClick: (event) => console.log(event),
    }}
/>
```

### 矩形事件

| onRectClick<br />矩形点击事件 | onRectDblClick<br />矩形双击事件 | onRectDblClick<br />矩形双击事件 | onRectMouseleave<br />矩形鼠标离开事件 |
| --- | --- | --- | --- |
| onRectMousemove<br />矩形标移动事件 | onRectMousedown<br />矩形鼠标按下事件 | onRectMouseup<br />矩形鼠标松开事件 | onRectMouseenter<br />矩形鼠标进入事件 |




### 图表区域事件

| onPlotClick<br />图表区域点击事件 | onPlotDblClick<br />图表区域双击事件 | onPlotDblClick<br />图表区域双击事件 | onPlotMouseleave<br />图表区域鼠标离开事件 |
| --- | --- | --- | --- |
| onPlotMousemove<br />图表区域鼠标移动事件 | onPlotMousedown<br />图表区域鼠标按下事件 | onPlotMouseup<br />图表区域鼠标松开事件 | onPlotMouseenter<br />图表区域鼠标进入事件 |


### 图例事件

| onLegendClick<br />图例点击事件 | onLegendDblClick<br />图例双击事件 | onLegendMouseenter<br />图例鼠标进入事件 | onLegendMouseleave<br />图例鼠标离开事件 |
| --- | --- | --- | --- |
| onLegendMousemove<br />图例鼠标移动事件 | onLegendMousedown<br />图例鼠标按下事件 | onLegendMouseup<br />图例鼠标松开事件 | onLegendMouseenter<br />图例鼠标进入事件 |


## 图例标签事件

| onLegendLabelClick<br />图例标签点击事件 | onLegendLabelDblClick<br />图例标签双击事件 | onLegendLabelDblClick<br />图例标签双击事件 | onLegendLabelMouseleave<br />象限标签鼠标离开事件 |
| --- | --- | --- | --- |
| onLegendLabelMousemove<br />图例标签鼠标移动事件 | onLegendLabelMousedown<br />图例标签鼠标按下事件 | onLegendLabelMouseup<br />图例标签鼠标松开事件 | onLegendLabelMouseenter<br />图例标签鼠标进入事件 |


### 坐标轴事件

| onAxisClick<br />坐标轴点击事件 | onAxisDblClick<br />坐标轴双击事件 | onAxisDblClick<br />坐标轴双击事件 | onAxisMouseleave<br />坐标轴鼠标离开事件 |
| --- | --- | --- | --- |
| onAxisMousemove<br />坐标轴鼠标移动事件 | onAxisMousedown<br />坐标轴鼠标按下事件 | onAxisMouseup<br />坐标轴鼠标松开事件 | onAxiMouseenter<br />坐标轴鼠标进入事件 |


### 图形标签事件

| onLabelClick<br />图形标签点击事件 | onLabelDblClick<br />图形标签双击事件 | onLabelDblClick<br />图形标签双击事件 | onLabelMouseleave<br />图形标签鼠标离开事件 |
| --- | --- | --- | --- |
| onLabelMousemove<br />图形标签鼠标移动事件 | onLabelMousedown<br />图形标签鼠标按下事件 | onLabelMouseup<br />图形标签鼠标松开事件 | onLabelMouseenter<br />图形标签鼠标进入事件 |


### 标题事件

| onTitleClick<br />标题点击事件 | onTitleDblClick<br />标题双击事件 | onTitleDblClick<br />标题双击事件 | onTitleMouseleave<br />标题鼠标离开事件 |
| --- | --- | --- | --- |
| onTitleMousemove<br />标题鼠标移动事件 | onTitleMousedown<br />标题鼠标按下事件 | onTitleMouseup<br />标题鼠标松开事件 | onTitleMouseenter<br />标题鼠标进入事件 |


### 描述事件

| onDescriptionClick<br />标题点击事件 | onDescriptionDblClick<br />标题双击事件 | onDescriptionDblClick<br />标题双击事件 | onDescriptionMouseleave<br />标题鼠标离开事件 |
| --- | --- | --- | --- |
| onDescriptionMousemove<br />标题鼠标移动事件 | onDescriptionMousedown<br />标题鼠标按下事件 | onDescriptionMouseup<br />标题鼠标松开事件 | onDescriptionMouseenter<br />标题鼠标进入事件 |

