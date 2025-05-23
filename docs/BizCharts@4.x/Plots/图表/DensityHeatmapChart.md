# DensityHeatmapChart

密度热力图，连续热力图，热力地图

密度热力图是一种绘制在地图之上散点区域型热力图。

## 使用
解构使用
```js
import { DensityHeatmapChart } from 'bizcharts';
function APP() {
  return <DensityHeatmapChart {...options} />;
}
```
按需使用
```js
import DensityHeatmapChart from 'bizcharts/lib/plots/DensityHeatmapChart'; // es 取 'bizcharts/es/plots/DensityHeatmapChart'
function APP() {
  return <DensityHeatmapChart {...options} />;
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

<DensityHeatmapChart
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
/>

```

### xField 
**必选**, _<string>_

功能描述： heatmap数据点在 x 方向位置映射对应的数据字段名，一般对应一个连续字段。

默认配置： 无

### yField 
**必选**, _<string>_

功能描述： heatmap数据点在 y 方向位置映射所对应的数据字段名，一般对应一个连续字段。

默认配置： 无


### colorField ✨

**可选**, _<string>_

功能描述:  heatmap数据点颜色映射对应的数据字段名。


## 图形样式

### color
**可选**, _<string[]>_

功能描述： 指定heatmap渲染的色带颜色，数值中的值为色带节点的色值。。

默认配置：采用 theme 中的色板。

例如，下图的连续渐变色带是这样通过`color`配置项生成：

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*s4l-TZbuhmMAAAAAAAAAAABkARQnAQ" width="300">

```js
color: ['#295599', '#3e94c0', '#78c6d0', '#b4d9e4', '#fffef0', '#f9cdac', '#ec7d92', '#bc448c']
```

### radius ✨
**可选**, _<number>_

功能描述： 热力半径，决定一个原始数据点的大小，radius设置的越大，在最终的渲染效果中，靠近的数据点就更容易”融化“在一起，形成区块。

默认配置： 自动计算


### intensity ✨
**可选**, _<number>_

功能描述： 热力权重，决定一个原始数据点的对周边数据点的影响力

默认配置： 2

### point

**可选**, _<object>_

功能描述： 显示数据点。

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示数据点 |
| shape | string | 数据点形状 |
| size | number | 数据点大小 |
| style | object | 数据点样式 |

**注意：相对于具体的数值，热力图更加关注的是趋势和分布。因此不推荐在热力图上显示数据点，尤其当点密集时很难得到理想的视觉效果。**


## 图表组件

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*EMa-QbCul9YAAAAAAAAAAABkARQnAQ" width="600">

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
    visible: true,
    offset: 12,
},
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否可见 |
| tickCount | number | 坐标轴刻度数量 |
| tickInterval | number | 坐标轴刻度间隔 |
| line | object | 坐标轴轴线<br />- visible: boolean 是否可见<br />- style：object 轴线样式<br /> |
| grid | object | 网格线<br />- visible: boolean 是否可见<br />- style：object 网格线样式<br /> |
| label | object | 坐标轴标签<br />- visible: boolean 是否可见<br />- formatter: function 坐标轴标签格式化<br />- suffix: string 后缀<br />- precision：number  标签精度，如配置为 2，则格式化为 2 位小数<br />- mask: string 为日期文本添加格式化遮罩，当坐标轴type为time时生效<br />- offsetX: number 位置在x方向上的偏移量<br />- offsetY：number 位置在y方向上的偏移量<br />- style：object 样<br />  -autoHide: boolean 是否自动隐藏<br/>-autoRotate: boolean 是否自动旋转 |
| tickLine | object | 坐标轴刻度<br />- visible：boolean 是否可见<br />- style: object 样式<br /> |
| title | object | 坐标轴标题<br />- visible： boolean 是否可见<br />- text: string 标题文字<br />- offset: number 位置偏移量<br />- style：object 样式<br /> |

### yAxis
**可选**, _<object>_


功能描述： y方向上的坐标轴，用于展示yField对应的映射信息

默认配置：
```js
visible: true,
grid: {
    visible: false,
},
line: {
    visible: true,
},
tickLine: {
    visible: true,
},
label: {
    visible: true,
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

### legend
**可选**, _<object>_

功能描述：图例，用于展示颜色分类信息

默认配置：
```js
visible: true,
position: 'bottom-center',
flipPage: true
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否可见 |
| position | string | 位置，支持12方位布局<br />top-left, top-center,top-right<br />bottom-left,bottom-center,bottom-right<br />left-top,left-center,left-bottom<br />right-top,right-center,right-bottom |
| width | number | 图例宽度 |
| height | number | 图例高度 |
| text | object | 图例两端刻度值<br />- style: object 刻度值样式<br />- formatter: function 对刻度值进行格式化<br /> |
| gridStyle | object | 图例网格线样式 |
| triggerOn | string | 图例响应交互的事件，默认为click |

```js
legend:{
    visible: true,
    position:'right-center',
    width: 10,
    height: 50,
    text:{
        formatter:(v)=>{
            return parseFloat(v) / 100;
        },
        style:{
            fill:'grey',
            fontSize: 12
        }
    },
    gridStyle:{
        lineDash: [2,2]
    },
    triggerOn:'click'
}
```

### tooltip
**可选**, _<object>_

功能描述：信息提示框

默认配置：
```js
visible: true,
offset: 20,
showCrosshairs: true,
crosshairs: {
  type: 'xy'
}
```

| 细分属性 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| offset | number | 距离鼠标位置偏移值 |
| showCrosshairs | boolean | 是否显示辅助线 |
| crosshairs | object | 配置tooltip辅助线。<br/> -type: string crosshairs类型,可选项： x | y | xy <br/>-line: object 通过lineStyle配置辅助线样式 |
| domStyles | object | 配置tooltip样式<br />- g2-tooltip: object 设置tooltip容器的CSS样式<br />- g2-tooltip-title: object 设置tooltip标题的CSS样式<br />- g2-tooltip-list: object 设置tooltip列表容器的CSS 样式<br />- g2-tooltip-marker: object 设置tooltip列表容器中每一项 marker的CSS样式<br />- g2-tooltip-value: object 设置tooltip 列表容器中每一项 value的CSS样式<br /> |
| fields | string | 设置tooltip内容字段，默认为[ `xField`, `yField`, `colorField`] |
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
}
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| formatter | function | 对文本标签内容进行格式化 |
| offsetX | number | 在 label 位置的基础上再往 x 方向的偏移量 |
| offsetY | number | 在 label 位置的基础上再往 y 方向的偏移量 |
| style | object | 配置文本标签样式。 |

**注意：相对于具体的数值，热力图更加关注的是趋势和分布。因此不推荐在热力图上显示标签，尤其当数据点密集时很难得到理想的视觉效果。**


### background ✨
**可选**，_<object>_


功能描述：配置热力图显示背景，支持颜色填充、图片及 callback 三种方式。

* 颜色填充背景

指定 background `type` 为'color', 通过`value`配置项指定色值。

为热力图配置黑色填充背景：
```js
background:{
    type:'color',
    value:'#000000'
}
```
效果：
<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*aYLQQIlazB8AAAAAAAAAAABkARQnAQ" width="300">

* 图片背景

指定 background `type` 为'image', 通过`src`配置项指定图片资源链接。

为热力图配置图片背景：
```js
background:{
     type: 'image',
     src: 'https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*TU_aSrMV6KYAAAAAAAAAAABkARQnAQ',
}
```
效果：
<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*eFZySpX8E2gAAAAAAAAAAABkARQnAQ" width="300">

* callback

通过回调函数进行更加灵活的背景配置，例如在热力图下方叠加地图。

入参为：

`x: number` 热力图填充区域的 x 位置<br/>
`y: number` 热力图填充区域的 y 位置<br/>
`width: number` 热力图填充区域的宽度<br/>
`height: number` 热力图填充区域的高度<br/>
`container: G.Group` 热力图填充区域的绘图容器


## 事件 events

使用说明：
```js
<DensityHeatmapChart
    events={{
        onHeatmapClick: (event) => console.log(event),
        onPlotClick: (event) => console.log(event),
        onLegendClick: (event) => console.log(event),
    }}
/>
```

### 图形事件

| onHeatmapClick<br />图形点击事件 | onHeatmapDblClick<br />图形双击事件 | onHeatmapDblClick<br />图形双击事件 | onHeatmapMouseleave<br />图形鼠标离开事件 |
| --- | --- | --- | --- |
| onHeatmapMousemove<br />图形标移动事件 | onHeatmapMousedown<br />图形鼠标按下事件 | onHeatmapMouseup<br />图形鼠标松开事件 | onHeatmapMouseenter<br />图形鼠标进入事件 |


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

