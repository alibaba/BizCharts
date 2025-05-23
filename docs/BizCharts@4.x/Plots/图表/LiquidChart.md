# LiquidChart

水波球、进度球

水波图是一种用球形容器和其中的水平线位置来表示进度的示意图

## 使用
解构使用
```js
import { LiquidChart } from 'bizcharts';
function APP() {
  return <LiquidChart {...options} />;
}
```
按需使用
```js
import LiquidChart from 'bizcharts/lib/plots/LiquidChart'; // es 取 'bizcharts/es/plots/LiquidChart'
function APP() {
  return <LiquidChart {...options} />;
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

### value 
**必选**, _<number>_

功能描述： 设置水波图的当前值

默认配置： 无

### max ✨
**必选**, _<number>_

功能描述： 设置水波图的最大值

默认配置： 无


### min ✨
**必选**, _<number>_

功能描述： 设置水波图的最小值

默认配置： 无


## 图形样式

### color
**可选**， _<string>_

功能描述： 配置水波图的颜色

默认配置： 使用默认色板的颜色

### liquidStyle ✨
**可选**, _<object>_

功能描述： 配置水波图的样式

默认配置： 
```js
lineWidth: 4
strokeOpacity: 1
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| stroke | string | 配置边框颜色 |
| lineWidth | number | 配置边框宽度 |
| lineDash | [number,number] | 配置边框虚线样式 |
| strokeOpacity | number | 配置边框透明度 |
| fill | string | 配置填充颜色 |

示例代码：

```js
liquidStyle:{
    lineWidth: 10,
    strokeOpacity: 0.7,
    lineDash:[3,5],
    fill:'#1C11FE',
    stroke:'#FA342C',
}
```
效果：<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*DKvMTrrWdAQAAAAAAAAAAABkARQnAQ" width="300">



## 图表组件

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*Sni0SqiOz1wAAAAAAAAAAABkARQnAQ" width="400">

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


### statistic ✨

**可选**, _<object>_

功能描述：统计内容组件。当内半径(innerRadius) 大于 0 时才生效，默认展示汇总值，可以通过 formatter 格式化展示内容，也可以通过 customHtml 自定义更多的内容。

| 配置项 | 类型 | 描述 |
| --- | --- | --- |
| title | false 或者 StatisticText | 标题|
| content | false 或者 StatisticText | 主体内容 | - |

StatisticText
| 配置项 | 类型 | 
| --- | --- | 
| style | CSSStyleDeclaration |
| customHtml | (container: HTMLElement, view: View, datum: object, data: object[]) => string; | 
| formatter | Function |
| rotate | number |
| offsetX | number |
| offsetY | number |

## 事件 events

使用说明：
```js
<LiquidChart
    events={{
        onLiquidClick: (event) => console.log(event),
        onPlotClick: (event) => console.log(event),
        onStatisticClick: (event) => console.log(event),
    }}
/>
```

### 图形事件

| onLiquidClick<br />图形点击事件 | onLiquidDblClick<br />图形双击事件 | onLiquidDblClick<br />图形双击事件 | onLiquidMouseleave<br />图形鼠标离开事件 |
| --- | --- | --- | --- |
| onLiquidMousemove<br />图形鼠标移动事件 | onLiquidMousedown<br />图形鼠标按下事件 | onLiquidMouseup<br />图形鼠标松开事件 | onLiquidMouseenter<br />图形鼠标进入事件 |

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
