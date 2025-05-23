# HistogramChart

直方图

直方图是一种统计报告图，由一系列高度不等的纵向条纹或线段表示数据分布的情况。

## 使用
解构使用
```js
import { HistogramChart } from 'bizcharts';
function APP() {
  return <HistogramChart {...options} />;
}
```
按需使用
```js
import HistogramChart from 'bizcharts/lib/plots/HistogramChart'; // es 取 'bizcharts/es/plots/HistogramChart'
function APP() {
  return <HistogramChart {...options} />;
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

数据源为对象集合，例如：`[{ type: 'a'，value: 20 }, { type: 'b'，value: 20 }]`。

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

<HistogramChart
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
  // highlight-end
  binField="year"
/>

```

### binField ✨
**必选**, _<string>_

功能描述： 设置直方图绘制 (进行分箱) 的字段

默认配置： 无


### binWidth ✨
**可选**, _<number>_


功能描述： 设置直方图的分箱宽度，binWidth影响直方图分成多少箱。

注意：binWidth 和 binNumber 只能选择一个进行配置，默认采用binWidth.

默认配置： 自动计算


### binNumber ✨
**可选**, _<number>_


功能描述： 设置直方图的分箱数量，binNumber影响直方图分箱后每个柱子的宽度。

注意：binWidth 和 binNumber 只能选择一个进行配置，默认采用binWidth.

默认配置： 无


## 图形样式

### color
**可选**, _<string>_

功能描述： 指定直方图柱形颜色。

默认配置：采用 theme 中的色板。


### columnStyle ✨
**可选**, _<object>_

功能描述： 设置直方图柱子样式。columnStyle中的`fill`会覆盖 `color` 的配置。
默认配置： 无


| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| fill | string | 填充颜色 |
| stroke | string | 描边颜色 |
| lineWidth | number | 描边宽度 |
| lineDash | number | 虚线描边 |
| opacity | number | 整体透明度 |
| fillOpacity | number | 填充透明度 |
| strokeOpacity | number | 描边透明度 |

## 图表组件

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*998oTou8UhAAAAAAAAAAAABkARQnAQ" width="600">

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
grid: {
    visible: false,
},
line: {
    visible: true
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
    offset: 12,
},
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否可见 |
| line | object | 坐标轴轴线<br />- visible: boolean 是否可见<br />- style：object 轴线样式<br /> |
| grid | object | 网格线<br />- visible: boolean 是否可见<br />- style：object 网格线样式<br /> |
| label | object | 坐标轴标签<br />- visible: boolean 是否可见<br />- formatter: function 坐标轴标签格式化<br />- suffix: string 后缀<br />- offsetX: number 位置在x方向上的偏移量<br />- offsetY：number 位置在y方向上的偏移量<br />- style：object 样<br /> -autoHide: boolean 是否自动隐藏<br/>-autoRotate: boolean 是否自动旋转 |
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
    visible: false,
},
tickLine: {
    visible: false,
},
label: {
    visible: true,
    autoRotate: true,
    autoHide: true
},
title: {
    visible: true,
    offset: 12,
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
| fields | string | 设置tooltip内容字段，默认为[ `xField`, `yField` ] |
| formatter | object | 对tooltip items进行格式化，入参为tooltip fields对应数值，出参为格式为{name:'a',value:1} |

### label

功能描述： 标签文本

默认配置：
```js
visible: false
position: 'top'
offsetX: 6
offsetY: 6
style:{
  fill: 'rgba(0, 0, 0, 0.65)',
  stroke: '#ffffff',
  lineWidth: 2,
},
adjustColor: true,
adjustPosition: false
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| position | string | label的位置<br />- top 位于柱子顶部<br />- middle 位于柱子垂直中心<br />- bottom 位于柱子底部<br /> |
| formatter | function | 对文本标签内容进行格式化 |
| offsetX | number | 在 label 位置的基础上再往 x 方向的偏移量 |
| offsetY | number | 在 label 位置的基础上再往 y 方向的偏移量 |
| style | object | 配置文本标签样式。 |
| adjustColor | boolean | 文本标签颜色是否自动适应图形颜色，position为middle时有效。 |
| adjustPosition | boolean | 是否根据显示区域自动调整文本标签位置，position为middle时有效。如图形区域容纳不下label，则label位置自动调整至图形上方。 |


### guideLine

**可选**, _<object[]>_


功能描述： 配置图表辅助线，支持同时配置多条。

默认配置： 无

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| type | string | 含有统计意义的辅助线类型，可选类型为 max | min | median | mean<br />*注意：如指定了辅助线类型，则不需要配置辅助线的start和end。 |
| start | array | 指定辅助线起始位置，如不配置`type`，则该辅助线为自定义辅助线，`start`是必选项。<br/>支持两种配置形式，两者不能混用：<br />- 原始数据值，如 ['2010-01-01', 100]<br />- 绘图区域百分比位置，如 ['50%', '50%']<br /> |
| end | array | 指定辅助线终止位置，如不配置`type`，则该辅助线为自定义辅助线，end 是必选项。<br/>支持两种数据形式，两者不能混用：<br />- 原始数据值，如 ['2010-01-01', 100]<br />- 绘图区域百分比位置，如 ['50%', '50%']<br /> |
| lineStyle | object | 配置辅助线样式。 |
| text | object | 设置辅助线文本。<br />- position: string 辅助线文本位置，可选项：start、center、end<br />- content: string 辅助线文本内容<br />- offsetX: number 位置在x方向上的偏移量<br />- offsetY: number 位置在y方向上的偏移量<br />- style: object 文本样式<br /> |
|  |  |  |



配置统计辅助线示例代码：

```js
guideLine={[
    {
      type: 'mean',
      lineStyle: {},
      text: {},
    },
  ]}
```

配置自定义辅助线示例代码：

```js
guideLine={[
    {
      start: ['2010-01-01', 100] || ['0%', '50%'],
      end: ['2010-01-10', 50] || ['100%', '80%'],
      lineStyle: {},
      text: {},
    },
  ]}
```


## 事件 events

使用说明：
```js
<HistogramChart
    events={{
        onColumnClick: (event) => console.log(event),
        onLegendClick: (event) => console.log(event),
        onPlotClick: (event) => console.log(event),
    }}
/>
```

### 柱形图形事件

| onColumnClick<br />柱形点击事件 | onColumnDblClick<br />柱形双击事件 | onColumnDblClick<br />柱形双击事件 | onColumnMouseleave<br />柱形鼠标离开事件 |
| --- | --- | --- | --- |
| onColumnMousemove<br />柱形鼠标移动事件 | onColumnMousedown<br />柱形鼠标按下事件 | onColumnMouseup<br />柱形鼠标松开事件 | onColumnMouseenter<br />柱形鼠标进入事件 |


### 图表区域事件

| onPlotClick<br />图表区域点击事件 | onPlotDblClick<br />图表区域双击事件 | onPlotDblClick<br />图表区域双击事件 | onPlotMouseleave<br />图表区域鼠标离开事件 |
| --- | --- | --- | --- |
| onPlotMousemove<br />图表区域鼠标移动事件 | onPlotMousedown<br />图表区域鼠标按下事件 | onPlotMouseup<br />图表区域鼠标松开事件 | onPlotMouseenter<br />图表区域鼠标进入事件 |


### 图例事件

| onLegendClick<br />图例点击事件 | onLegendDblClick<br />图例双击事件 | onLegendMouseenter<br />图例鼠标进入事件 | onLegendMouseleave<br />图例鼠标离开事件 |
| --- | --- | --- | --- |
| onLegendMousemove<br />图例鼠标移动事件 | onLegendMousedown<br />图例鼠标按下事件 | onLegendMouseup<br />图例鼠标松开事件 | onLegendMouseenter<br />图例鼠标进入事件 |


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


## 交互

### slider 
**可选**, _<object>_


功能描述： 缩略轴 (slider) 交互适用于数据较多，用户希望关注数据集中某个特殊区间的场景。

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| height | number | slider高度 |
| start | number<br /> | 滑块初始开始位置，值域为[0,1] |
| end | number | 滑块初始结束位置，值域为[0,1] |
| trendCfg | object | 配置slider内的趋势组件<br />- smooth: boolean 趋势组件是否平滑<br />- isArea: boolean 趋势组件是都绘制为面积图，如设置false则绘制折线，默认false<br />- lineStyle: object 配置折线形态趋势组件的样式<br />- areaStyle: object 配置面积形态趋势组件的样式<br /> |
| backgroundStyle | object | 配置背景样式 |
| forgroundStyle | object | 配置前景样式 |
| handlerStyle | object | 配置滑块样式 |
| textStyle | object | 配置跟随滑块的文字样式 |
| minLimit | number | 允许滑动的最小位置，值域范围为[0,1] |
| maxLimit | number | 允许滑动的最大位置，值域范围为[0,1] |

### scrollBar 
**可选**, _<object>_


功能描述： 配置横向滚动条，适用于数据较多的场景。

示例代码：

```js
interactions={[
  {
    type: 'scrollbar',
    },
]}
```