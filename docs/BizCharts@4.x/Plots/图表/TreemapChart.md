# TreemapChart

矩形树图

## 使用
解构使用
```js
import { TreemapChart } from 'bizcharts';
function APP() {
  return <TreemapChart {...options} />;
}
```
按需使用
```js
import TreemapChart from 'bizcharts/lib/plots/TreemapChart'; // es 取 'bizcharts/es/plots/TreemapChart'
function APP() {
  return <TreemapChart {...options} />;
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

**必选**, _<object>_

功能描述： 设置图表数据源

矩形树图的数据源为json格式的层级嵌套数据，除叶子节点之外，每一层级的数据都需要具备三个属性：

| 细分配置 | 类型 | 定义 |
| --- | --- | --- |
| name | string | 该层级数据的名称 |
| value | number | 该层级数据的数值 |
| children | object [] | 该层级数据的子级 |

当某一层级的数据没有子级(children)时，该层级即为叶子节点。

示例：

```js
{
    name:'root',
    value:100,
    children:[
        {
            name:'a',
            value:10,
            children:[]
        },
        {
            name:'b',
            value:5,
            children:[]
        }
    ]
}
```

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

<TreemapChart
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
  colorField="value"

/>

```

### maxLevel ✨
**可选**, _<number>_

功能描述： 矩阵树图的最大嵌套层级

默认配置： 2


### colorField ✨
**必选**, _<string>_

功能描述:  矩形颜色映射对应的数据字段名，一般对应一个连续字段或一个分类字段。


## 图形样式

### color
**可选**, _<string[]>_

功能描述： 指定矩形颜色。如不进行配置则采用 theme 中的配色。

默认配置：采用 theme 中的色板。

```js
color: ['#295599', '#3e94c0', '#78c6d0', '#b4d9e4', '#fffef0', '#f9cdac', '#ec7d92', '#bc448c']
```

### rectStyle ✨
**可选**, _<object>_

功能描述： 设置treemap中的矩形样式。rectStyle中的`fill`会覆盖 `color` 的配置。pointtyle可以直接指定，也可以通过callback的方式，根据数据指定单独的样式。

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| fill | string | 填充颜色 |
| stroke | string | 描边颜色 |
| lineWidth | number | 线宽 |
| lineDash | number | 虚线显示 |
| opacity | number | 透明度 |
| fillOpacity | number | 填充透明度 |
| strokeOpacity | number | 描边透明度 |


## 图表组件

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
| fields | string | 设置tooltip内容字段，默认为[ name, value ] |
| formatter | object | 对tooltip items进行格式化，入参为tooltip fields对应数值，出参为格式为{name:'a',value:1} |

### label
**可选**, _<object>_


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


## 事件 events

使用说明：
```js
<TreemapChart
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


### 面包屑事件 

(如配置了drilldown交互)

| onBreadcrumbClick<br />面包屑点击事件 | onBreadcrumbDblClick<br />面包屑双击事件 | onBreadcrumbDblClick<br />面包屑双击事件 | onBreadcrumbMouseleave<br />面包屑鼠标离开事件 |
| --- | --- | --- | --- |
| onBreadcrumbMousemove<br />面包屑标移动事件 | onBreadcrumbMousedown<br />面包屑鼠标按下事件 | onBreadcrumbMouseup<br />面包屑鼠标松开事件 | onBreadcrumbMouseenter<br />面包屑鼠标进入事件 |


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

### drilldown ✨
**可选**, _<object>_


数据钻取交互，通过矩形的点击事件及面包屑组件完成数据的上卷下钻。点击矩形下钻至该分类的子级数据，而点击面包屑各节点则可以跳转至当前层级的任一上级节点。

简单使用：

```js
interactions: [
    {
        type: 'drilldown',
    },
],
```

在钻取过程中，支持配置不同层级的映射。例如在上文的DEMO中，当钻取到第三个层级（某品类所有商品名录）时，数据量非常大，此时再采用分类颜色映射已经失去了认知信息有效性。因此例子中第一层及第二层使用了不同值域的分类映射，而第三层则根据数值大小采用了连续映射。

| 细分配置 | 类型 | 定义 |
| --- | --- | --- |
| key | number | 层级的深度(depth)，从1开始 |
| field | string | 必选，映射字段 |
| values | string [] | function | 可选，映射颜色，如不配置则默认采用theme中的色板。<br/><br />当使用回调函数`function`的方式配置映射颜色时，入参为上一层级的数据及当期等级的数据，出参为一个色值。下图中第三层级的连续映射就是通过callback，根据上一层级的分类颜色产生渐变色指定的，保证了在钻取过程中映射变更时的认知连续性。 |

```js
interactions={[
    {
        type: 'drilldown',
        cfg: {
            mapping: {
              1: {
                field: 'name',
              },
              2: {
                field: 'name',
                values: ['#f5bc32', '#e66557', '#71c8ea', '#9362b7', '#fd984f', '#279493', '#fd9bc3'],
              },
              3: {
                field: 'value',
                values: (parent) => {
                  const parentColor = parent.shape.attr('fill');
                  return ['#ffffff', parentColor];
                },
              },
            },
        },
    },
]}
```
