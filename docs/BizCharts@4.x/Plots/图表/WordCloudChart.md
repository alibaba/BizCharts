# WordCloudChart

词云图

“词云”就是通过形成“关键词云层”或“关键词渲染”，对文本中出现频率较高的“关键词”的视觉上的突出。 词云图过滤掉大量的文本信息，使浏览者只要一眼扫过文本就可以领略文本的主旨

## 使用
解构使用
```js
import { WordCloudChart } from 'bizcharts';
function APP() {
  return <WordCloudChart {...options} />;
}
```
按需使用
```js
import WordCloudChart from 'bizcharts/lib/plots/WordCloudChart'; // es 取 'bizcharts/es/plots/WordCloudChart'
function APP() {
  return <WordCloudChart {...options} />;
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
**必选**, _<object[]>_

功能描述： 设置图表数据源

默认配置： 无

词云图的每一条数据都需要具备一下属性：

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| word | string | 词条内容 |
| weight | number | 该词条权重 |
| id | number | 该词条的unique id |

### maskImage✨
**可选**，_<string>_

功能描述： 遮罩图片(url 或者 base64 地址)
默认配置： 无

### random
自定义所使用的随机函数，其值可以是一个 [0, 1) 区间中的值，也可以是一个返回该值的函数，当该值是一个固定的值时，每次渲染相同数据的词云图时，其对应的每个单词的布局坐标一致。当值为0时，居左上角显示；当值为0.5时居中显示；当值为1时居右下角显示。
默认配置： 默认使用的是浏览器内置的 Math.random，也就是每次渲染，单词的位置都不一样。

## 图形样式

### color
_<string|>_ _<function>_
设置字体颜色。
- #f00,red,rgb(0,0,0)等。
- 回调函数动态设置颜色，({word}) => string) 

### backgroundColor✨
**可选**, _<string>_

功能描述： 设置背景颜色

默认配置： `#ffffff`


### selected✨
**可选**, _<number>_

功能描述：用于标记被选中 hover 的词云图文字，默认配置： -1，表示未选中任意文字
> 只有当值>=0的时候，词云click事件才会响应。


### wordStyle✨
**可选**, _<object>_

功能描述： 文字样式配置

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| fontFamily | string | 配置词云的字体。<br />参照：[通用 CSS 配置](!https://www.w3schools.com/jsref/prop_style_fontfamily.asp) |
| fontWeight | number | 设置字体粗细 |
| padding | number | 单词的网格大小，默认为 8。 越大单词之间的间隔越大 |
| fontSize | [number,number] | 设置字体字号的最大值和最小值。，默认浏览器支持的最小字号：60 |
| rotation | [number,number] | 旋转的最小角度和最大角度 默认 [-π/2,π/2] |
| rotationSteps | number | 旋转实际的步数,越大可能旋转角度越小 |
| rotateRatio | number | 旋转的比率[0,1] 默认是 0.5 也就是 50%可能发生旋转 |
| active | object | hover 下词云图文字是否高亮效果, 默认开启.<br />- shadowColor: string 字体高亮时的阴影颜色，默认从字体颜色获取<br />- shadowBlur: number 字体阴影的高斯系数，默认为10<br /> |

## 图表组件

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
| domStyles | object | 配置tooltip样式<br />- g2-tooltop: object 设置tooltip容器的CSS样式<br />- g2-tooltip-title: object 设置tooltip标题的CSS样式<br />- g2-tooltip-list: object 设置tooltip列表容器的CSS 样式<br />- g2-tooltip-marker: object 设置tooltip列表容器中每一项 marker的CSS样式<br />- g2-tooltip-value: object 设置tooltip 列表容器中每一项 value的CSS样式<br /> |


## 事件 events

使用说明：
```js
<WordCloudChart
    onWordCloudHover={(event) => console.log(event)} 
    onWordCloudClick={(event) => console.log(event)}
/>
```

### onWordCloudHover

功能描述：hover 的 action 回调

类型: `(item: WordCloudData, dimension: Dimension, evt: MouseEvent, start: InnerStartFunction) => {};`

- `item` 表示词云图对象
- `dimension` 表示坐标信息[x,y,width,height]等
- `evt` 表示触摸事件对象
- `start` 表示内部的刷新回调函数 `(hoveredId: number) => void;` 当`hoveredId`不为-1 表示刷新立即刷新该 ID 的文本


### onWordCloudClick

功能描述： click 词云的 action 回调

类型: `(item: WordCloudData, dimension: Dimension, evt: MouseEvent, start: InnerStartFunction) => {};`

- `item` 表示词云图对象
- `dimension` 表示坐标信息[x,y,width,height]等
- `evt` 表示触摸事件对象
- `start` 表示内部的刷新回调函数 `(hoveredId: number) => void;` 当`hoveredId`不为-1 表示刷新立即刷新该 ID 的文本
  > 基本同 onWordCloudHover

### 图表区域事件

| onPlotClick<br />图表区域点击事件 | onPlotDblClick<br />图表区域双击事件 | onPlotDblClick<br />图表区域双击事件 | onPlotMouseleave<br />图表区域鼠标离开事件 |
| --- | --- | --- | --- |
| onPlotMousemove<br />图表区域鼠标移动事件 | onPlotMousedown<br />图表区域鼠标按下事件 | onPlotMouseup<br />图表区域鼠标松开事件 | onPlotMouseenter<br />图表区域鼠标进入事件 |
