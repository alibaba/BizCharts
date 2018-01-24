
# Chart

The bizcharts components's top parent component.


## Child Components
- [`<Coord/>`](coord.md)
- [`<Axis/>`](axis.md)
- [`<Geom/>`](geom.md)
- [`<Legend/>`](legend.md)
- [`<Tooltip/>`](tooltip.md)
- [`<Guide/>`](guide.md)
- [`<Facet/>`](facet.md)
- [`<View/>`](view.md)

```jsx
<Chart height={400} data={dv} scale={cols} forceFit>
  <Axis name="month" />
  <Axis name="temperature" label={{formatter: val => `${val}°C`}}/>
  <Tooltip crosshairs={{type : "y"}}/>
  <Geom type="line" position="month*temperature" size={2} color={'city'} />
  <Geom type='point' position="month*temperature" size={4} shape={'circle'} color={'city'} style={{ stroke: '#fff', lineWidth: 1}} />
</Chart>
```

[edit inline](https://alibaba.github.io/BizCharts/demo-detail.html?code=/demo/line/series)

## The chart's layout
![e9d103b3-1707-446e-b5fe-b535f7048c8b.png](https://img.alicdn.com/tfs/TB1G7_0bOqAXuNjy1XdXXaYcVXa-1148-542.png)
``Sometimes axis、legend and other elements which are out of plot area can not be full showed, You can adjust chart's padding property to resolve it.``

## Properties
### 1、forceFit		* Boolean *
Whether the chart's width should be adaptive, if true, chart's width will inherit parent's width, Even if chart's width is be seted that's will be no take effect.
default: false

### 2、width		* Number *
The pixel value of chart's width, when chart's forceFit is true that's will be no take effect。

### 3、height		* Number *    required
The pixel value of chart's width.

<span id="data"></span>

### 4、data	* Array/DataSet *
The chart's source data, in which each element is an object or an DataView object。
more info about [data](../tutorial/data.md)

<span id="scale"></span>

### 5、scale		* Object *
> (fieldName: string, scaleConfig: object) | (scaleConfig: object)
The scale info of chart's source data.
```jsx
scale={{
  fieldName:'sales',
  //scaleConfig
  {
	type: 'identity' | 'linear' | 'cat' | 'time' | 'timeCat' | 'log' | 'pow', // data type
	alias: string, // alias name of data filed name
	formatter: function, // used to fomate the data
	range: array, // range of data, the default value is [0, 1] and the formate is [min, max], min and max value are both [>=0 value <=1]。
	tickCount: number, //axis tick count
	ticks: array, // axis tick values
	sync: boolean //when chart's have more then one data srouce,  sync is be used to sync the range of the data sources.
  }
}}
```

! Except these properties, different type of scale may have different properties, see detail [Scale API](./scale.md);

### 6、placeholder		* string  | boolean*
When chart's data is null, placeholder will be showed.
default:  `<div style={{ position: 'relative', top: '48%', textAlign: 'center' }}>have no data</div>`。
! When chart's data is null and placeholder is false, empty axis will be showed.

<span id="padding"></span>

### 7、padding		* Object／Number／Array *
The padding of the chart.
```jsx
//Sometimes axis、legend and other elements which are out of plot area can not be full showed, You can adjust chart's padding property to resolve it.
padding={[ 20, 30, 20, 30]}
padding={20}
padding={{ top: 20, right: 30, bottom: 20, left: 30 }}
```

### 8、animate		* Boolean *
Whether to show the animation of chart。
default: true

### 9、background		* Object *
The background style of chart.
```javascript
//detail
{
  fill: string, // background color
  fillOpacity: number, // background color opacity
  stroke: string, // background border color
  strokeOpacity: number, // background border opacity
  opacity: number, // the chart's opacity
  lineWidth: number, // the lineWidth of border
  radius: number // the radius of border
}
```

### 10、plotBackground		* Object *
The background style of chart's plot area.
```javascript
//detail
{
  fill: string, // background color
  fillOpacity: number, // background color opacity
  stroke: string, // background border color
  strokeOpacity: number, // background border opacity
  opacity: number, // the area's opacity
  lineWidth: number, // the lineWidth of border
  radius: number // the radius of border
}
```

### 11、pixelRatio   * Number *

The device pixel ratio. 
default: *window.devicePixelRatio*。

<span id="filter"></span>

### 12、filter   *Array*
Filter data, filter data's legend will be set gray.
Array:[[fieldString1, callback1], [fieldString2, callback2]]
``` jsx
<Chart filter={[['x', (val) => {return val > 20;}]]}/>
```
### 13、className   *String*
The chart cotainer's className.
``` jsx
<Chart className="chart1" />
```
### 14、style   *Object*
The chart cotainer's style.
``` jsx
const style={fontSize: '12'}
<Chart style={style} />
```

## Event properties
### 1、onGetG2Instance
Used to get the chart instance. 
```jsx
<chart
  onGetG2Instance={g2Chart => {
	  //some code
  }}
/>
```

### 2、Basic canvas events
Events:
*onMouseDown, onMouseMove, onMouseLeave, onMouseUp, onClick, onDblClick,
onTouchStart, onTouchMove, onTouchEnd*
```jsx
<chart
  onMouseDown={ev => {
	  // some code
  }}
/>
```
* *defail of ev*
  + x: x position
  + y: y position
  + target: canvas element
  + toElement: current dom element
  + shape: current shape
  + views: Array, the views which of the current position in

### 3、Plot events
Events:
*onPlotMove,  onPlotEnter, onPlotLeave, onPlotClick, onPlotDblClick*

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
* defail of ev*
  + x: x position
  + y: y position
  + target: canvas element
  + toElement: current dom element
  + shape: current shape
  + views: Array, the views which of the current position in
  + data: the data of the selected shape, maybe it's null
  + geom: the selected shape, maybe it's null

### 4、onItemSelected
The customized event handler of chart's shape is be selected.

* detail of ev*:
  + shape: selected shape
  + data: the data of selected shape
  + geom：selected chart's layer

### 5、onItemUnselected
The customized event handler of chart's shape is be unselected.

* detail of ev*:
  + shape: unselected shape
  + data: the data of unselected shape
  + geom: unselected chart's layer

### 6、onItemSelectedChange
The customized event handler of chart's selected shape is changes.

* detail of ev:
  + shape: selected shape
  + data: the data of selected shape
  + preShape: previous selected shape
  + preData: the data of previous selected shape
  + geom: selected chart's layer

<span id="onTooltipChange"></span>
### 7、onTooltipChange
The customized event handler of chart's tooltip changes.

* detail of ev:
  + tooltip: current tooltip
  + x: canvas x position
  + y: canvas y position
  + items: the origin data items of tooltip

It's often used to change the content data of the tooltip.
```jsx
<Chart
  onTooltipChange={(ev)=>{
    var items = ev.items;
    var origin = items[0];
    var range = origin.point._origin.range;
    items.splice(0);
    items.push({
      name: 'begin value',
      title: origin.title,
      marker: true,
      color: origin.color,
      value: range[0]
    });
    items.push({
      name: 'end value',
      marker: true,
      title: origin.title,
      color: origin.color,
      value: range[1]
    });
  }}
/>
```

### 11、onTooltipShow
The customized event handler of chart's tooltip show.

* detail of ev:
  + tooltip: current tooltip;
  + x: canvas x position;
  + y: canvas y position;

### 12、onTooltipHide
The customized event handler of chart's tooltip hide.

* detail of ev:
  + tooltip: current tooltip;

### 13、geometry events
geometryEventName = 'on' + shapeName + baseEvent

- shapeName:
```
Point, Area, Line, Path, Interval, Schema, Polygon, Edage, AxisTitle, AxisLabel, AxisTicks, AxisLine, AxisGrid, LegendTitle, LegendItem, LegendMarker, LegendText, GuideText, GuideLine, GuideRegion, GuideImage, Label
```
- baseEvent:
```
Mouseenter, Mousemove, Mouseleave, Click, Dblclick, Mousedown, Mouseup, Touchstart, Touchmove, Touchend
```
```jsx
<Chart onPointMouseenter={function(ev){//some code}}/>
```

