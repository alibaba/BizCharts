# RangeColumnChart

区间柱状图

## 使用
解构使用
```js
import { RangeColumnChart } from 'bizcharts';
function APP() {
  return <RangeColumnChart {...options} />;
}
```
按需使用
```js
import RangeColumnChart from 'bizcharts/lib/plots/RangeColumnChart'; // es 取 'bizcharts/es/plots/RangeColumnChart'
function APP() {
  return <RangeColumnChart {...options} />;
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

<RangeColumnChart
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
  xField="year"
  yField="value"
/>

```

### xField 
**必选**, _<string>_

功能描述： 柱形在 x 方向位置映射对应的数据字段名，一般对应一个分类字段。

默认配置： 无

### yField 
**必选**, _<string>_

功能描述： 柱形在 y 方向高度映射所对应的数据字段名，一般对应一个离散字段。

默认配置： 无

### colorField✨
**可选**, _<string>_

功能描述：柱形颜色映射对应的数据字段名。从基础柱状图的使用场景来说，我们不推荐对柱形进行额外的颜色映射。

默认配置： 无

## 图形样式

### color
**可选**, _<string>_ | _<string[]>_ | _<Function>_

功能描述： 指定柱形颜色，如没有配置colorField,指定一个单值即可。对colorFiled进行了配置的情况下，即可以指定一系列色值，也可以通过回调函数的方法根据对应数值进行设置。

默认配置：采用 theme 中的色板。

用法示例：

```js
// 指定单值
color: '#000000'
// 配合颜色映射，指定多值
colorField:'type',
color:['blue','yellow','green']
//配合颜色映射，使用回调函数指定色值
colorField:'type',
color:(d)=>{
    if(d==='a') return 'red';
    return 'blue';
}
```

### columnSize ✨
**可选**, _<number>_

功能描述： 设置柱形宽度。对于一般场景来说，柱形宽度会根据数据自行计算，不需特别指定。

默认配置： 无

### columnStyle ✨
**可选**, _<object>_

功能描述： 设置柱子样式。columnStyle中的`fill`会覆盖 `color` 的配置。columnStyle可以直接指定，也可以通过callback的方式，根据数据为每一根柱子指定单独的样式。

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

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*l7klQoZozsoAAAAAAAAAAABkARQnAQ" width="600">

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
    autoHide: false,
    autoRotate: false,
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
| label | object | 坐标轴标签<br />- visible: boolean 是否可见<br />- formatter: function 坐标轴标签格式化 DEMO<br />- suffix: string 后缀<br />- precision：number  标签精度，如配置为 2，则格式化为 2 位小数<br />- offsetX: number 位置在x方向上的偏移量<br />- offsetY：number 位置在y方向上的偏移量<br />- style：object 样<br />-autoHide: boolean 是否自动隐藏<br/>-autoRotate: boolean 是否自动旋转 |
| tickLine | object | 坐标轴刻度<br />- visible：boolean 是否可见<br />- style: object 样式<br /> |
| title | object | 坐标轴标题<br />- visible： boolean 是否可见<br />- text: string 标题文字<br />- offset: number 位置偏移量<br />- style：object 样式<br /> |

### legend
**可选**, _<object>_


功能描述：图例，配置colorField时显示，用于展示颜色分类信息

默认配置：
```js
visible: true,
position: 'top',
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
| marker | object | 图例 marker<br />- symbol: string marker符号，默认为 'circle'。可选类型：circle,square,diamond,triangle,triangleDown,hexagon,bowtie,cross,tick,plus,hyphen,line,hollowCircle,hollowSquare,hollowDiamond<br />- style: object marker样式，其中 `r` 配置marker的大小，其余样式参数参考绘图属性文档。<br /> |
| text | object | 图例文本<br />- style: object 配置图例文本样式<br />- formatter:(text,cfg)=>string 格式化图例文本<br /> |

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
| fields | string | 设置tooltip内容字段，默认为[ `xField`, `yField`, `colorField`] |
| formatter | object | 对tooltip items进行格式化，入参为tooltip fields对应数值，出参为格式为{name:'a',value:1} |

### label 

功能描述： 标签文本，与其他柱形图家族图表不同，区间柱状图的label为一对。


默认配置：
```js
visible: false
position: 'outer'
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
| position  | string | label的位置<br />- outter  位于柱子外侧，即上部和下部<br />- inner  位于柱子内侧，即顶部和底部<br /> |
| formatter | function | 对文本标签内容进行格式化 |
| style | object | 配置 label 的样式
| topStyle | object | 配置上侧 label 样式<br />如果同时配置了style和topStyle，上侧 label 的样式将以topStyle 为准。 |
| bottomStyle | object | 配置下侧 label 样式<br />如果同时配置了style和bottomStyle，下侧 label 样式将以bottomStyle为准。 |
| offsetX | number | 在 label 位置的基础上再往 x 方向的偏移量 |
| offsetY | number | 在 label 位置的基础上再往 y 方向的偏移量 |
| adjustColor | boolean | 文本标签是否自动适应图形颜色，position 为 inner 时生效 |
| adjustPosition | boolean | 当文本标签显示区域不够时，是否自动调整位置。 |


<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*TZIiT5EUl1AAAAAAAAAAAABkARQnAQ" width="600">


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
<RangeColumnChart
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