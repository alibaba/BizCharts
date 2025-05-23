# Tooltip

提示信息(tooltip)组件，是指当鼠标悬停在图表上的某点时，以提示框的形式展示该点的数据，比如该点的值，数据单位等。

<img src="https://gw.alipayobjects.com/zos/rmsportal/VLNhkKRALafPtDCIZFqA.png" width="415px">

## 父组件
* [`<Chart />`](24)  
* [`<View />`](33)

## 子组件
无

## 使用

> BizCharts 默认不展示 `<Tooltip />`，只有当用户使用了该组件时，图表才会有 tooltip。

```js
<Chart width={600} height={400} data={data}>
  <Tooltip /> // 开启图表tooltip功能
  <Geom type="bar" position="genre*sold" color="genre" />
</Chart>
```

## 组成
![](https://zos.alipayobjects.com/skylark/750725d4-2e58-4420-b886-4abe1c0335c2/attach/2378/ad8fe2daa557ad62/image.png)

## API

### 通用属性

### useHtml
_<Boolean>_
* 描述: 是否使用html渲染，默认为true, false 时使用canvas渲染。


### type
_<string>_
* 描述: tooltip 类型，mini 则启动显示单个数据值的 miniTooltip。

### triggerOn
_<String>_
* 描述: tooltip 的触发方式,可配置的值为：'mousemove'、'click'、'none'，默认为 `mousemove`。
      * 'mousemove': 鼠标移动触发；
      * 'click': 鼠标点击出发；
      * 'none': 不触发 tooltip，用户通过 `chart.showTooltip()` 和 `chart.hideTooltip()` 来控制 tooltip 的显示和隐藏。

### inPlot
_<Boolean>_
* 描述: 设置是否将 tooltip 限定在绘图区域内，默认为 true，即限定在绘图区域内。

### position
_<string>_
* 描述：该属性设置之后，就会在固定位置展示 tooltip，可设置的值为：`left`、`right`、`top`、`bottom`。

### showTitle
_<Boolean>_
* 描述：是否展示提示信息的标题，默认为 true，即展示，通过设置为 false 来隐藏标题。

### title
_<string>_
* 描述：设置 tooltip 的标题展示的数据字段，设置该字段后，该标题即会展示该字段对应的数值。`showTitle` 为 false 时，该设置不生效。

### shared
_<Boolean>_
* 描述：是否展示多条 tooltip, 默认值:true;
false表示只展示单条 tooltip。

### follow
_<Boolean>_
* 描述：设置 tooltip 是否跟随鼠标移动。默认为 true，即跟随。

### offset
_<Number>_
* 描述：设置 tooltip 距离鼠标的偏移量。

### enterable
_<boolean>_
* 描述：用于控制是否允许鼠标进入 tooltip，默认为 false，即不允许进入。


### 辅助元素属性

### crosshairs
_<Object>_

* 描述：是一个对象类型，用于设置 tooltip 的辅助线或者辅助框。

  默认我们为 ‘line’, ‘area’, ‘path’, ‘areaStack’ 类型的几何图形开启了垂直辅助线；geom 为‘interval’ 默认会展示矩形背景框。如下图所示：

  <img src="https://gw.alipayobjects.com/zos/rmsportal/rCwHiXNfIVepGgMWKqdf.png" style="width: 100%;max-width:600px;">

该属性可支持的配置如下：
```js
//可配置值
//geom为 'line', 'area', 'path', 'areaStack 时默认会展示垂直辅助线
//geom为 'interval' 默认会展示矩形背景框
<Tooltip crosshairs={{
  //rect: 矩形框,x: 水平辅助线,y: 垂直辅助线,cross: 十字辅助线。
  type: 'rect' || 'x' || 'y' || 'cross',
  style: {
   // 图形样式
   fill: {string}, // 填充的颜色
   stroke: {string}, // 边框的颜色
   strokeOpacity: {number}, // 边框颜色的透明度，数值为 0 - 1 范围
   fillOpacity: {number}, // 填充的颜色透明度，数值为 0 - 1 范围
   lineWidth: {number}, // 边框的粗细
   lineDash: {number} | {array} // 线的虚线样式
}}/>

```

### markerGroup 属性

对于 line、area、path 这三种几何图形，G2在渲染 tooltip 时会自动渲染tooltipMarker![](https://img.alicdn.com/tfs/TB1jdEducbpK1RjSZFyXXX_qFXa-40-40.png)，tooltipMarker的样式可通过主题配置，参见[demo](https://bizcharts.net/gist/2IzkA0eESK7)。

### hideMarkers
_<boolean>_
* 描述: 该属性值为 true 来关闭 tooltipMarker。


### htmlTooltip 属性
以下配置项只有在useHtml为true的时候才能生效。

### htmlContent
_<Function>_
* 描述: 支持用户获取当前tooltip取值，并完全自定义tooltip，用户可以根据htmlContent方法返回的title和items两个参数定义tooltip dom节点的构成和显示方式。
> 注意：使用htmlContent时需要额外指定tooltip容器的css position属性为absolute

```js
<Chart height={400} data={data} scale={cols}>
  <Axis name="year" />
  <Axis name="value" />
  <Tooltip useHtml htmlContent={(title, items) => {
      return `<div class="g2-tooltip" style='position:absolute;'><div class="g2-tooltip-title">${title} </div><ul><li>${JSON.stringify(items)}</li></ul></div>`}}
  />
  <Geom type="line" position="year*value" size={2} />
  <Geom
    type="point"
    position="year*value"
    size={4}
    shape={"circle"}
  />
</Chart>
```

### containerTpl
_<String>_
* 描述: tooltip 默认的容器模板，默认值如下：
```js
containerTpl= '<div class="g2-tooltip">'
  + '<div class="g2-tooltip-title" style="margin-bottom: 4px;"></div>'
  + '<ul class="g2-tooltip-list"></ul>'
  + '</div>',
```
> 如默认结构不满足需求，可以自定义该模板，但是**自定义模板时必须包含各个 dom 节点的 class**，样式可以自定义。

<span id="itemTpl"></span>

### itemTpl
_<String>_
* 描述：tooltip 每项记录的模版，这个属性可以格式化 tooltip 的显示内容。
默认值:
```js
itemTpl= '<li data-index={index}>'
  + '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>'
  + '{name}: {value}'
  + '</li>'

```
> 如默认结构不满足需求，可以自定义该模板，但是**自定义模板时必须包含各个 dom 节点的 class**，样式可以自定义。

### g2-tooltip
设置 tooltip 容器的 CSS 样式。

### g2-tooltip-title
设置 tooltip 标题的 CSS 样式。

### g2-tooltip-list
设置 tooltip 列表容器的 CSS 样式。

### g2-tooltip-list-item
设置 tooltip 列表容器中每一项的 CSS 样式。

### g2-tooltip-marker
_<Object>_
* 描述：设置tooltip 列表容器中每一项 marker 的 CSS 样式。

### g2-tooltip-value
_<Object>_
* 描述：设置tooltip 列表容器中每一项 value 的 CSS 样式。

### enterable
_<Boolean>_
* 描述: 用于控制是否允许鼠标进入 tooltip，默认为 false，即不允许进入。

### canvasTooltip 属性
通过设置配置项useHtml:false可以切换为canvasTooltip，以下配置项只有在useHtml为false的时候才能生效。

### boardStyle
_<Object>_
* 描述: 用于控制tooltip背景板的显示样式，更详细见 [绘图属性](40)

### titleStyle
_<Object>_
* 描述: 用于控制tooltip标题的显示样式，更详细见 [绘图属性](40)

### nameStyle
_<Object>_
* 描述: 用于控制tooltip每一项 name 的显示样式，更详细见 [绘图属性](40)

### valueStyle
_<Object>_
* 描述: 用于控制tooltip每一项 value 的显示样式，更详细见 [绘图属性](40)

### itemGap
_<Number>_
* 描述: 用于控制tooltip每一项之间的间距

### miniTooltip 属性
* 描述:mini tooltip是一种极简的tooltip形式，只显示单个数据的数值。通过设置配置项type:mini切换为miniTooltip，以下配置项只有在type为'mini'的时候才能生效。

### boardStyle
_<Object>_
* 描述: 用于控制tooltip背景板的显示样式，更详细见 [绘图属性](40)

### valueStyle
_<Object>_
* 描述: 用于控制tooltip每一项 value 的显示样式，更详细见 [绘图属性](40)

### triangleWidth
_<Number>_
* 描述: 设置 tooltip 三角装饰的宽度

### triangleHeight
_<Number>_
* 描述: 设置 tooltip 三角装饰的高度



```js

    <Tooltip
      containerTpl='<div class="g2-tooltip"><p class="g2-tooltip-title"></p><table class="g2-tooltip-list"></table></div>'
      itemTpl='<tr class="g2-tooltip-list-item"><td style="color:{color}">{name}</td><td>{value}</td></tr>'
      offset={50}
      g2-tooltip={{
        position: 'absolute',
        visibility: 'hidden',
        border : '1px solid #efefef',
        backgroundColor: 'white',
        color: '#000',
        opacity: '0.8',
        padding: '5px 15px',
        transition: 'top 200ms,left 200ms'
      }}
      g2-tooltip-list={{
        margin: '10px'
      }}
    />
```

## 其他配置

<span id="format"></span>

### 格式化 tooltip 显示内容
1、通过 `<Geom />` 上的 *tooltip* 属性的回调函数来配置。

![](https://img.alicdn.com/tfs/TB1LognDoz1gK0jSZLeXXb9kVXa-1304-730.png)
附[格式化 tooltip Demo地址](/gist/2eVyoU1UIsd)

示例代码:
```js
<Chart>
  <Geom
    tooltip={['time*sold', (time, sold) => {
	  return {
	    //自定义 tooltip 上显示的 title 显示内容等。
		name: 'sold',
		title: 'dddd' + time,
		value: sold
	  };
	}]}
  />
</Chart>
```

2、通过 `<Tooltip />` 上的 itemTpl 来格式化显示内容，详见[itemTpl属性说明](#itemTpl)。

3、特别复杂的场景可以通过 `<Chart>` 上的 onTooltipChange  事件来格式化 `<Tooltip />` 显示内容;详见 [onTooltipChange](/product/bizcharts/category/7/page/66#示例-2：动态改变-tooltip-显示信息)

### 固定位置显示 tooltip
当然在任何触发方式下，用户都可以通过<Chart>组件的[onGetG2Instance](24#onGetG2Instance)方法获取到g2的chart实例，再调用 [chart.showTooltip(point)](https://g2.antv.vision/zh/docs/api/chart/#showtooltip) 可以控制在固定的位置显示提示信息，参数 point 为画布上的坐标点，格式如下：
```
const point = {
  x: 23,
  y: 30,
};
```

## 示例

### 样式配置

```html
// 略...
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

const data = [{ genre: 'Sports', sold: 275 } /* 略... */];
const cols = {sold: { alias: '销售量' }, genre: { alias: '游戏种类' }};

ReactDOM.render((
  <Chart width={600} height={400} data={data} cols={cols}>
    <Axis name="sold" />
    <Axis name="genre" />
    <Tooltip title={null} crossLine={{ stroke: '#f00' }} />
    <Geom type="line" position="genre*sold" shape="smooth" />
  </Chart>
), document.getElementById('mountNode'));
```

### 自定义

```html
// 略...
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

const data = [{ genre: 'Sports', sold: 275 } /* 略... */];
const tooltipCfg = {
  custom: true,
  containerTpl: '<div class="ac-tooltip" style="position:absolute;visibility: hidden;background: rgba(255, 44, 52, 0.5);color: #fff;border-radius: 50%;padding: 10px 20px;text-align: center;"><h4 class="ac-title" style="margin: 0;padding: 5px 0;border-bottom: 1px solid #fff;"></h4><table class="ac-list custom-table" style="padding: 5px 0;"></table></div>',
  itemTpl: '<tr><td style="display:none">{index}</td><td style="color:{color}">{name}</td><td>{value}k</td></tr>'
};

ReactDOM.render((
  <Chart width={600} height={400} data={data}>
    <Axis name="genre" />
    <Axis name="sold" />
    <Tooltip {...tooltipCfg} />
    <Geom type="line" position="genre*sold" shape="smooth" />
  </Chart>
), document.getElementById('mountNode'));
```

### 通过bx-tooltip插件自定义

为了满足更灵活多变的Tooltip自定义需求，提供[bx-tooltip插件](https://www.npmjs.com/package/bx-tooltip)来实现ReactNode渲染，摆脱HTML模板的繁琐和死板。[在线demo预览](https://codesandbox.io/s/cool-mahavira-6pw8d)
