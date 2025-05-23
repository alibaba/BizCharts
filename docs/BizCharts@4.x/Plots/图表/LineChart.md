# LineChart

折线图、线图、基础折线图。

使用一条折线的线段显示数据在一个具有顺序性的维度上的变化。

## 使用
解构使用
```js
import { LineChart } from 'bizcharts';
function APP() {
  return <LineChart {...options} />;
}
```
按需使用
```js
import LineChart from 'bizcharts/lib/plots/LineChart'; // 或者 'bizcharts/es/plots/LineChart'
function APP() {
  return <LineChart {...options} />;
}
```

## 配置项API

### width

**可选**, _<number>_

功能描述： 设置图表宽度。

默认配置： `400`

### height

**可选**, _<number>_

功能描述： 设置图表高度。

默认配置： `400`

### autoFit
**可选**, _<boolean>_
> 原forceFit 修改改为 autoFit。虽功能支持，但推荐使用autoFit。另ts提示不支持forceFit


功能描述： 图表是否自适应容器宽高。当 `autoFit` 设置为true时，`width` 和 `height` 的设置将失效。

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

<LineChart
  data={data}
  title={{
    visible: true,
    text: '百分比堆叠面积图',
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
  xField="year"
  yField="value"
  seriesField="country"
/>
```

### xField
**必选**, _<string>_

功能描述： 折线形状在 x 方向（横向延伸）对应的数据字段名，一般对应一个连续字段。

默认配置： 无

### yField
**必选**, _<string>_

功能描述： 折线形状在 y 方向对应的数据字段名，一般对应一个离散字段。

默认配置： 无

### seriesField ✨
**必选**, _<string>_


功能描述： 多折线必选。 数据集中的分组字段名，一般对应一个分类字段。通过该字段的值，折线图将会被分为多个组，通过颜色进行区分，视觉上呈现为多条折线。

默认配置： 无

## 图形样式

### color
**可选**, _<string[]>_ | _<Function>_

功能描述： 指定折线颜色，即可以指定一系列色值，也可以通过回调函数的方法根据对应数值进行设置。

默认配置：采用 theme 中的色板。


### lineSize ✨
**可选**, _<number>_

功能描述： 设置折线宽度

默认配置： `2`

### lineStyle ✨
**可选**, _<object>_


功能描述： 设置折线样式。linsStyle中的`lineWidth`会覆盖 `lineSize` 的配置，`stroke`会覆盖`color`的设置。lineStyle可以直接指定，也可以通过callback的方式，根据数据为每一条折线指定单独的样式。

默认配置：


| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| stroke | string | 折线颜色 |
| lineWidth | number | 线宽 |
| lineDash | number[] | 虚线显示 |
| opacity | number | 透明度 |

### smooth ✨
**可选**, _<boolean>_


功能描述： 是否将折线绘制为曲线 (spline)。

默认配置: `false`

### point ✨
**可选**, _<object>_


功能描述： 配置折线上的点

默认配置：
```js
visible: false,
shape: 'circle',
size: 3,
style: {
    stroke: '#fff',
},
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| shape | string | 数据点形状 |
| size | number | 数据点大小 |
| style | object | 数据点样式<br />- fill: string  填充色<br />- stroke: string  描边颜色<br />- lineWidth: number 描边粗细<br />- lineDash: number 虚线描边<br />- opacity: number 透明度<br />- fillOpacity: number 填充透明度<br />- strokeOpacity: number 描边透明度<br /> |

## 图表组件

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*Z3C7QJToIH8AAAAAAAAAAABkARQnAQ" width="600">

### title
**可选**, _<optional>_

功能描述： 配置图表的标题，默认显示在图表左上角。

默认配置：
```js
visible: false,
text:'',
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| <span style="text-decoration: line-through">style</span> | object | 请直接使用ReactNode |

### description
**可选**, _<optional>_


功能描述： 配置图表的描述，默认显示在图表左上角，标题下方。

默认配置：
```js
visible: false,
alignTo: 'left',
text:'',
```
| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| alignTo | string | 位置，支持三种配置：<br />'left' | 'middle' | 'right' |
| <span style="text-decoration: line-through">style</span> | object | 请直接使用ReactNode|

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
| type | string | 坐标轴类型<br />- 'time'：时间轴，<br />- 'linear': 连续轴<br /> |
| tickCount | number | 坐标轴刻度数量 |
| tickInterval | number | 坐标轴刻度间隔 |
| line | object | 坐标轴轴线<br />- visible: boolean 是否可见<br />- style：object 轴线样式<br /> |
| grid | object | 网格线<br />- visible: boolean 是否可见<br />- style：object 网格线样式<br /> |
| label | object | 坐标轴标签<br />- visible: boolean 是否可见<br />- formatter: function 坐标轴标签格式化<br />- suffix: string 后缀<br />- precision：number  标签精度，如配置为 2，则格式化为 2 位小数<br />- mask: string 为日期文本添加格式化遮罩，当坐标轴type为time时生效<br />- offsetX: number 位置在x方向上的偏移量<br />- offsetY：number 位置在y方向上的偏移量<br />- style：object 样<br />-autoHide: boolean 是否自动隐藏<br/>-autoRotate: boolean 是否自动旋转|
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
    visible: false,
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

### legend
**可选**, _<object>_


功能描述：图例，多折线时显示，用于展示颜色分类信息

默认配置：
```js
visible: true,
position: 'top-left',
flipPage: true
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否可见 |
| position | string | 位置，支持12方位布局<br />top-left, top-center,top-right<br />bottom-left,bottom-center,bottom-right<br />left-top,left-center,left-bottom<br />right-top,right-center,right-bottom |
| formatter | function | 对图例显示信息进行格式化 |
| offsetX | number | 图例在 position 的基础上再往 x 方向偏移量，单位 px |
| offestY | number | 图例在 position 的基础上再往 y 方向偏移量，单位 px |
| title | object | 图例标题<br />- visible: boolean 是否显示<br />- text: string 图例文本，如不配置则自动取对应字段名<br />- style: object 标题样式<br /> |
| marker | object | 图例 marker<br />- symbol: string marker符号，默认为 'circle'。可选类型：<br />circle,square,diamond,triangle,triangleDown,hexagon,bowtie,<br />cross,tick,plus,hyphen,line,hollowCircle,hollowSquare,hollowDiamond<br />- style: object marker样式，其中 `r` 配置marker的大小，其余样式参数参考绘图属性文档。<br /> |
| text | object | 图例文本<br />- style: object 配置图例文本样式<br />- formatter:(text,cfg)=>string 格式化图例文本<br /> |

### tooltip
**可选**, _<object>_

功能描述：信息提示框

默认配置：
```js
visible: true,
shared: true,
showCrosshairs: true,
crosshairs: {
  type: 'y'
},
offset: 20,
```

| 细分属性 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| offset | number | 距离鼠标位置偏移值 |
| shared | boolean | 是否同时显示多条数据 |
| showCrosshairs | boolean | 是否tooltip辅助线 |
| crosshairs | object | 配置tooltip辅助线。<br/> -type: string crosshairs类型,可选项： x | y | xy <br/>-line: object 通过lineStyle配置辅助线样式 |
| domStyles | object | 配置tooltip样式<br />- g2-tooltip: object 设置tooltip容器的CSS样式<br />- g2-tooltip-title: object 设置tooltip标题的CSS样式<br />- g2-tooltip-list: object 设置tooltip列表容器的CSS 样式<br />- g2-tooltip-marker: object 设置tooltip列表容器中每一项 marker的CSS样式<br />- g2-tooltip-value: object 设置tooltip 列表容器中每一项 value的CSS样式<br /> |
| fields | string | 设置tooltip内容字段，默认为[ `xField`, `yField`,  `seriesField` ] |
| formatter | object | 对tooltip items进行格式化，入参为tooltip fields对应数值，出参为格式为{name:'a',value:1} |

### label

功能描述： 标签文本

默认配置：
```js
visible: false
type:'point'
offsetX: 6
offsetY: 6
style:{
  fill: 'rgba(0, 0, 0, 0.65)',
  stroke: '#ffffff',
  lineWidth: 2,
}
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| type | string | 文本标签类型<br />- line: 跟随在折线尾部<br />- point: 显示在数据点上<br /> |
| formatter | function | 对文本标签内容进行格式化 |
| offsetX | number | 在 label 位置的基础上再往 x 方向的偏移量 |
| offsetY | number | 在 label 位置的基础上再往 y 方向的偏移量 |
| style | object | 配置文本标签样式。 |

| `type` 类型     | 表现                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| `type: 'point'` | <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*4NmuSaVRZ44AAAAAAAAAAABkARQnAQ" width="350"> |
| `type: 'line'`  | <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*YMGnQoh_jSAAAAAAAAAAAABkARQnAQ" width="350"> |

### guideLine

**可选**, _<object[]>_


<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*y64CRIP7g1QAAAAAAAAAAABkARQnAQ" width="400">

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
<LineChart
    events={{
        onLineClick: (event) => console.log(event),
        onPointClick: (event) => console.log(event),
        onPlotClick: (event) => console.log(event),
    }}
/>
```

### 折线图形事件

| onLineClick<br />折线点击事件 | onLineDblClick<br />折线双击事件 | onLineDblClick<br />折线双击事件 | onLineMouseleave<br />折线鼠标离开事件 |
| --- | --- | --- | --- |
| onLineMousemove<br />折线鼠标移动事件 | onLineMousedown<br />折线鼠标按下事件 | onLineMouseup<br />折线鼠标松开事件 | onLineMouseenter<br />折线鼠标进入事件 |


### 数据点事件

| onPointClick<br />数据点点击事件 | onPointDblClick<br />数据点双击事件 | onPointDblClick<br />数据点双击事件 | onPointMouseleave<br />数据点鼠标离开事件 |
| --- | --- | --- | --- |
| onPointMousemove<br />数据点鼠标移动事件 | onPointMousedown<br />数据点鼠标按下事件 | onPointMouseup<br />数据点鼠标松开事件 | onPointMouseenter<br />数据点鼠标进入事件 |


### 图表区域事件

| onPlotClick<br />图表区域点击事件 | onPlotDblclick<br />图表区域双击事件 | onPlotDblclick<br />图表区域双击事件 | onPlotMouseleave<br />图表区域鼠标离开事件 |
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



## theme

## 交互

### slider 
**可选**, _<object>_


功能描述： 缩略轴 (slider) 交互适用于折线数据较多，用户希望关注数据集中某个特殊区间的场景。

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

示例代码

```js
interactions={[
  {
    type: 'slider',
    cfg:{
        start:0.2,
        end:0.8
    }
    },
]}
```

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
