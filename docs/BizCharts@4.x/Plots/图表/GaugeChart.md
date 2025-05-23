# GaugeChart


#### ⚠️ 4.1 升级后的api请参考g2 文档：
https://antv-g2plot.gitee.io/zh/docs/api/plots/gauge


仪表盘 (Gauge) 是一种拟物化的图表，刻度表示度量，指针表示维度，指针角度表示数值。仪表盘图表就像汽车的速度表一样，有一个圆形的表盘及相应的刻度，有一个指针指向当前数值。目前很多的管理报表或报告上都是用这种图表，以直观的表现出某个指标的进度或实际情况。

仪表盘的好处在于它能跟人们的常识结合，使大家马上能理解看什么、怎么看。拟物化的方式使图标变得更友好更人性化，正确使用可以提升用户体验。仪表盘的圆形结构，可以更有效的利用空间。

为了视觉上的不拥挤且符合常识，我们建议指针的数量不超过 3 根。

## 使用
解构使用
```js
import { GaugeChart } from 'bizcharts';
function APP() {
  return <GaugeChart {...options} />;
}
```
按需使用
```js
import GaugeChart from 'bizcharts/lib/plots/GaugeChart'; // es 取 'bizcharts/es/plots/GaugeChart'
function APP() {
  return <GaugeChart {...options} />;
}
```

## 4.0 版本的API


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

### value 

**必选**, _<number>_

功能描述： 配置仪表盘当前数值。

默认配置： 无

### min ✨

**可选**, _<number>_

功能描述： 仪表盘刻度最小值

默认配置： 0

### max ✨

**可选**, _<number>_

功能描述： 仪表盘刻度最大值。

默认配置： 1

### range ✨

**必选**, _<number[]>_

功能描述： 仪表盘的色条范围区间，数组的前后两项组成的元组将对应一个颜色区间，例如：[0, 40, 60, 100]。

默认配置： 无


## 图形样式

### color

**可选**, _<string[]>_

功能描述：配置仪表盘色条颜色

默认配置： 采用 theme 中的默认色板

### rangeSize ✨

**可选**, _<number>_

功能描述： 配置仪表盘色条宽度。

默认配置：Gauge（基础仪表盘）24，MeterGauge（刻度仪表盘）24，FanGauge（扇形仪表盘）70

### rangeStyle ✨

**可选**, _<object>_

功能描述： 配置仪表盘色条样式，详细配置请参考绘图属性文档。

默认配置：无

### rangeBackgroundStyle ✨

**可选**, _<object>_

功能描述：配置仪表盘色条背景(空白区域)样式，详细配置请参考绘图属性文档。

默认配置：

```js
{
  fill: '#f0f0f0',
}
```

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*io3ZQbTuSmwAAAAAAAAAAABkARQnAQ" width="400">


## 组件

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*TsK5Rb6u9V8AAAAAAAAAAABkARQnAQ" width="400">

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


### axis ✨

**可选**, _<object>_

功能描述：配置仪表盘刻度轴

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| offset  | number | 刻度偏移值，可以设正负值。正直显示在色条外圈，负值显示在色条内圈。Gauge、MeterGauge默认-10，FanGauge默认5。 |
| tickCount | number | 刻度数。Gauge默认21，MeterGauge默认25，FanGauge默认10。 |
| subTickCount | number | 副刻度数。默认4。 |
| tickLine | object | 配置刻度线<br />- visible:boolean 是否可见，默认true<br />- length:number 刻度线长度，默认2<br />- style:object 刻度线样式<br /> |
| label | object | 配置刻度标签<br />- visible: boolean 是否可见，默认true<br />- style: object 配置标签样式<br /> |


### pivot ✨

功能描述： 配置仪表盘指针

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*QaXnSLpAYbcAAAAAAAAAAABkARQnAQ" width="400">

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示，默认true |
| thickness | number | 指针宽度，默认6 |
| pointer | object | 配置指针针头<br />- visible:boolean 是否显示，默认true<br />- style: object 针头样式<br /> |
| base | object | 配置指针基座<br />- visible:boolean 是否显示，默认true<br />- size:number 基座大小，默认不配置，自动计算<br />- style: objecy 基座样式<br /> |
| pin | object | 配置指针旋钮<br />- visible:boolean 是否显示，默认true<br />- size:number 旋钮大小，默认不配置，自动计算<br />- style: objecy 旋钮样式<br /> |


### statistic ✨

**可选**, _<object>_

功能描述： 配置仪表盘指标卡

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| position | [string, string] | 指标卡的位置。以百分比的形式进行配置，分别对应[x-position, y-position] |
| text | string | 指标卡文字内容 |
| color | string | 指标卡文字颜色 |

## 事件 events

使用说明：
```js
<GaugeChart
    events={{
        onRangeClick: (event) => console.log(event),
        onPlotClick: (event) => console.log(event),
        onLegendClick: (event) => console.log(event),
    }}
/>
```

### 仪表盘色带事件

| onRangeClick<br />色带点击事件 | onRangeDblClick<br />色带双击事件 | onRangeDblClick<br />色带双击事件 | onRangeMouseleave<br />色带鼠标离开事件 |
| --- | --- | --- | --- |
| onRangeMousemove<br />色带鼠标移动事件 | onRangeMousedown<br />色带鼠标按下事件 | onRangeMouseup<br />色带鼠标松开事件 | onRangeMouseenter<br />色带鼠标进入事件 |

### 指标卡事件

| onStatisticClick<br />指标卡点击事件 | onStatisticDblClick<br />指标卡双击事件 | onStatisticDblClick<br />指标卡双击事件 | onStatisticMouseleave<br />指标卡鼠标离开事件 |
| --- | --- | --- | --- |
| onStatisticMousemove<br />指标卡鼠标移动事件 | onStatisticMousedown<br />指标卡鼠标按下事件 | onStatisticMouseup<br />指标卡鼠标松开事件 | onStatisticMouseenter<br />指标卡鼠标进入事件 |


### 图表区域事件

| onPlotClick<br />图表区域点击事件 | onPlotDblClick<br />图表区域双击事件 | onPlotDblClick<br />图表区域双击事件 | onPlotMouseleave<br />图表区域鼠标离开事件 |
| --- | --- | --- | --- |
| onPlotMousemove<br />图表区域鼠标移动事件 | onPlotMousedown<br />图表区域鼠标按下事件 | onPlotMouseup<br />图表区域鼠标松开事件 | onPlotMouseenter<br />图表区域鼠标进入事件 |


### 标题事件

| onTitleClick<br />标题点击事件 | onTitleDblClick<br />标题双击事件 | onTitleDblClick<br />标题双击事件 | onTitleMouseleave<br />标题鼠标离开事件 |
| --- | --- | --- | --- |
| onTitleMousemove<br />标题鼠标移动事件 | onTitleMousedown<br />标题鼠标按下事件 | onTitleMouseup<br />标题鼠标松开事件 | onTitleMouseenter<br />标题鼠标进入事件 |


### 描述事件

| onDescriptionClick<br />标题点击事件 | onDescriptionDblClick<br />标题双击事件 | onDescriptionDblClick<br />标题双击事件 | onDescriptionMouseleave<br />标题鼠标离开事件 |
| --- | --- | --- | --- |
| onDescriptionMousemove<br />标题鼠标移动事件 | onDescriptionMousedown<br />标题鼠标按下事件 | onDescriptionMouseup<br />标题鼠标松开事件 | onDescriptionMouseenter<br />标题鼠标进入事件 |
