
# Chart

图表组件，内部生成了一个 G2 chart 实例，同时控制着其他子组件的加载和更新。

## 子组件
- [`<Coord/>`](coord.md) 坐标系组件
- [`<Axis/>`](axis.md) 坐标轴组件
- [`<Geom/>`](geom.md) 几何标记组件
- [`<Legend/>`](legend.md) 图例组件
- [`<Tooltip/>`](tooltip.md) 提示框组件
- [`<Guide/>`](guide.md) 辅助标记组件
- [`<Facet/>`](facet.md) 分面组件
- [`<View/>`](view.md) 视图组件
```jsx
<Chart height={400} data={dv} scale={cols} forceFit>
  <Axis name="month" />
  <Axis name="temperature" label={{formatter: val => `${val}°C`}}/>
  <Tooltip crosshairs={{type : "y"}}/>
  <Geom type="line" position="month*temperature" size={2} color={'city'} />
  <Geom type='point' position="month*temperature" size={4} shape={'circle'} color={'city'} style={{ stroke: '#fff', lineWidth: 1}} />
</Chart>
```

[在线编辑](https://alibaba.github.io/BizCharts/demo-detail.html?code=/demo/line/series)

## 图表布局
![e9d103b3-1707-446e-b5fe-b535f7048c8b.png](https://img.alicdn.com/tfs/TB1G7_0bOqAXuNjy1XdXXaYcVXa-1148-542.png)
``有时候坐标轴、图例等绘图区域外的组件显示不全时，可以通过调整图表各个方向的 padding 来调整最终效果``

## API
### 1、forceFit		* Boolean *
图表的宽度自适应开关，默认为 false，设置为 true 时表示自动取 dom（实例容器）的宽度。

### 2、width		* Number *
指定图表的宽度，默认单位为 'px'，当 *forceFit: true* 是宽度不生效。

### 3、height		* Number(必填) *
指定图表的高度，单位为 'px'。

> 宽和高未指定时，默认为 500px

<span id="data"></span>

### 4、data	* Array/DataSet *
设置图表的数据源，`data` 是一个包含 JSON 对象的数组或者 DataSet.View 对象。
具体参见 [数据](../tutorial/data.md)

<span id="scale"></span>

### 5、scale		* Object *
配置数据比例尺，该配置会影响数据在图表中的展示方式。
```jsx
const scale = {
  'sales': {
    type: 'identity' | 'linear' | 'cat' | 'time' | 'timeCat' | 'log' | 'pow', // 指定数据类型
    alias: string, // 数据字段的别名
    formatter: () => {}, // 格式化文本内容
    range: array, // 输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
    tickCount: number, // 设置坐标轴上刻度点的个数
    ticks: array, // 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示
    sync: boolean // 当 chart 存在不同数据源的 view 时，用于统一相同数据属性的值域范围
  }
};
<Chart data={data} scale={scale} />
```
> !注意：除了以上属性外，不同的 type 还对应有各自的可配置属性，详见 [Scale 度量 API](./scale.md);

### 6、placeholder		* string *
图表source为空时显示的内容，未设置该属性时为G2 默认样式。`<Chart placeholder />` 则为Bizcharts 定义的无数据提示。
默认值:  `<div style={{ position: 'relative', top: '48%', textAlign: 'center' }}>暂无数据</div>` ;会在图表区域的中间显示 "暂无数据" 。

<span id="padding"></span>

### 7、padding		* Object | Number | Array *
图表内边距。
有如下配置格式。
```jsx
//有时候坐标轴、图例等绘图区域外的组件显示不全时，可以通过调整图表各个方向的 padding 来调整最终效果
<Chart padding={[ 20, 30, 20, 30]} />
<Chart padding={20} />
<Chart padding={{ top: 20, right: 30, bottom: 20, left: 30 }} />
<Chart padding="auto" />
<Chart padding={[20, 'auto', 30, 'auto']} />
<Chart padding={['20%', '30%']} />
```
- padding 为数字以及数组类型时使用方法同 CSS 盒模型。
- padding 中存在 'auto'，时会自动计算边框，目前仅考虑 axis 和 legend 占用的边框。

- 另外也支持设置百分比，如 padding: [ '20%', '30%' ]，该百分比相对于整个图表的宽高。
- padding 为数字以及数组类型时使用方法同 CSS 盒模型。
- padding 中存在 'auto'，时会自动计算边框，目前仅考虑 axis 和 legend 占用的边框。

### 8、animate		* Boolean *
图表动画开关，默认为 true，即开启动画。

### 9、background		* Object *
设置图表整体的边框和背景样式，是一个对象，包含如下属性：
```javascript
//可配置样式有
{
  fill: string, // 图表背景色
  fillOpacity: number, // 图表背景透明度
  stroke: string, // 图表边框颜色
  strokeOpacity: number, // 图表边框透明度
  opacity: number, // 图表整体透明度
  lineWidth: number, // 图表边框粗度
  radius: number // 图表圆角大小
}
```

### 10、plotBackground		* Object *
图表绘图区域的边框和背景样式，是一个对象，包含如下属性：
```javascript
//可配置样式有
{
  fill: string, // 图表背景色
  fillOpacity: number, // 图表背景透明度
  stroke: string, // 图表边框颜色
  strokeOpacity: number, // 图表边框透明度
  opacity: number, // 图表整体透明度
  lineWidth: number, // 图表边框粗度
  radius: number // 图表圆角大小
}
```

### 11、pixelRatio   * Number *

设置设备像素比，默认取浏览器的值 *window.devicePixelRatio*。

<span id="filter"></span>

### 12、filter   *Array*
过滤数据，如果存在对应的图例，则过滤掉的字段置灰。
Array:[[fieldString1, callback1], [fieldString2, callback2]]
``` jsx
<Chart filter={[['x', (val) => {return val > 20;}]]}/>
```
### 13、className   *String*
设置图表最外层div的类名。
``` jsx
<Chart className="chart1" />
```
### 14、style   *Object*
设置图表最外层div的样式。
``` jsx
const style={fontSize: '12'}
<Chart style={style} />
```

## 事件属性
`<chart/>`组件提供了各种事件，方便用户扩展交互。基本的事件用法如下：

```jsx
<chart
  onEvent={e => {
    //do something
  }}
/>
```

更新属性时，如果某事件不指定监听函数，表示删除该事件。

下面列出了 `<chart/> `支持的所有事件属性。

### 1、onGetG2Instance
获取 chart 实例的回调。每当生成一个新 chart 时就会调用该函数，并以新生成的 chart 作为回调参数。
```jsx
<chart
  onGetG2Instance={g2Chart => {
	g2Chart.animate(false);
	console.log(g2Chart);
  }}
/>
```

### 2、onPlotMove
鼠标在绘图区域移动时触发，在图表的绘图区域外不触发。

* *ev* 表示事件触发时返回的对象，包含以下属性
  + x：当前鼠标所在的画布上的 x 坐标；
  + y：当前鼠标所在的画布上的 y 坐标；
  + target：canvas 对象；
  + toElement：当前 dom 元素；
  + shape: 当前鼠标所在的 shape 对象；
  + views: Array，当前鼠标所在的视图。

```jsx
<chart
  onPlotMove={ev => {
	var point = {
	  x: ev.x,
	  y: ev.y
	};
	var items = chart.getTooltipItems(point);
	console.log(items);
  }}
/>
```

### 3、onPlotEnter
鼠标进入绘图区域时触发。

* *ev* 表示事件触发时返回的对象，包含以下属性
  + x：当前鼠标所在的画布上的 x 坐标；
  + y：当前鼠标所在的画布上的 y 坐标；
  + target：canvas 对象；
  + toElement：当前 dom 元素；
  + views: Array，当前鼠标所在的视图。

```jsx
<chart
  onPlotEnter={ev => {
	var point = {
	  x: ev.x,
	  y: ev.y
	};
	var items = chart.getTooltipItems(point);
	console.log(items);
  }}
/>
```

### 4、onPlotLeave
当鼠标移出绘图区域时触发。

* *ev* 表示事件触发时返回的对象，包含以下属性
  + x：当前鼠标所在的画布上的 x 坐标；
  + y：当前鼠标所在的画布上的 y 坐标；
  + target：canvas 对象；
  + toElement：当前 dom 元素；
  + views: Array，当前鼠标所在的视图。

```jsx
<chart
  onPlotEnter={ev => {
	var point = {
	  x: ev.x,
	  y: ev.y
	};
	var items = chart.getTooltipItems(point);
	console.log(items);
  }}
/>
```

### 5、onPlotClick
鼠标点击绘图区域时触发的事件。

* *ev* 表示事件触发时返回的对象，包含以下属性
  + x：当前鼠标所在的画布上的 x 坐标；
  + y：当前鼠标所在的画布上的 y 坐标；
  + target：canvas 对象；
  + toElement：当前 dom 元素；
  + views: Array，当前鼠标所在的视图；
  + shape：点击的图表 shape，可能为空；
  + data：选中图形代表的数据，可能为空；
  + geom：选中的图形，可能为空。

### 6、onPlotDblClick
鼠标双击绘图区域时触发的事件。

* *ev*: 事件触发时返回的对象，包含以下属性
  + x：当前鼠标所在的画布上的 x 坐标；
  + y：当前鼠标所在的画布上的 y 坐标；
  + target：canvas 对象；
  + toElement：当前 dom 元素；
  + views: Array，当前鼠标所在的视图；
  + shape：点击的图表 shape，可能为空；
  + data：选中图形代表的数据，可能为空；
  + geom：选中的图形，可能为空。

<span id="onTooltipChange"></span>
### 7、onTooltipChange

tooltip 信息更新改变的时候触发。

* ev：事件触发时返回的对象，包含以下属性：
  + tooltip: 当前生成的 tooltip 对象；
  + x: 画布上的 x 坐标；
  + y: 画布上的 y 坐标；
  + items: 当前 tooltip 中的数据项。

可以通过该事件回调函数，改变 items 中的内容来动态调整 tooltip 的显示内容。
示例代码:
```jsx
<Chart
  onTooltipChange={(ev)=>{
    var items = ev.items; // tooltip显示的项
	var origin = items[0]; // 将一条数据改成多条数据
	var range = origin.point._origin.range;
	items.splice(0); // 清空
	items.push({
	  name: '开始值',
	  title: origin.title,
	  marker: true,
	  color: origin.color,
	  value: range[0]
	});
	items.push({
	  name: '结束值',
	  marker: true,
	  title: origin.title,
	  color: origin.color,
	  value: range[1]
	});
  }}
/>
```

### 8、onTooltipShow

tooltip 显示时触发。

* ev：事件触发时返回的对象，包含以下属性：
  + tooltip: 当前生成的 tooltip 对象；
  + x: 画布上的 x 坐标；
  + y: 画布上的 y 坐标。

### 9、onTooltipHide

tooltip 隐藏或者消失时触发。

* ev：事件触发时返回的对象，包含以下属性：
  + tooltip: 当前生成的 tooltip 对象。

### 10、图形元素事件
图形元素事件属性名 = on + 图形元素名称 + 基础事件名。

- 图形元素名称有：
```
Point, Area, Line, Path, Interval, Schema, Polygon, Edge, AxisTitle, AxisLabel, AxisTicks, AxisLine, AxisGrid, LegendTitle, LegendItem, LegendMarker, LegendText, GuideText, GuideLine, GuideRegion, GuideImage, Label
```
- 基础事件名有:
```
Mouseenter, Mousemove, Mouseleave, Click, Dblclick, Mousedown, Mouseup, Touchstart, Touchmove, Touchend
```
代码示例：
```jsx
<Chart onPointMouseenter={function(ev){//some code}}/>
```

> [在线DEMO](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/line/series)
