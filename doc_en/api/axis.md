
# Axis

Axis Component.

## Elements of Axis
- title
- line
- label
- tickLine
- subTickLine
- grid

![image | center](https://zos.alipayobjects.com/skylark/89e9966f-3bd1-4ab1-a134-e3e4cb71867a/attach/3597/ded46c0aecb0e73a/image.png "")

Generally, one chart has one x-axis at bottom and one y-axis at left, also can show more than one y-axis in a chart. We can change the position of axis just set the position property.

> All properties of axis is from the elements in axis.


## Instruction

* `<Axis />` only can be nested in [`<Chart />`](chart.md) or [`<View />`](view.md) ,  and also child components nested in `<Axis />` is forbidden.

* BizCharts regards `<Axis />` as an indivisual component, if you didn't add `<Axis />` in your code and this axis won't be shown. as below:

```html
// hide axis
<Chart width={600} height={400} data={data}>
  <Geom type="interval" position="genre*sold" color="genre" />
</Chart>
```

* When use `<Axis />`, the value of name props must match the key name in source data.

```html
<Chart width={600} height={400} data={data}>
  <Axis name="sold" />
  <Geom type="interval" position="genre*sold" color="genre" />
</Chart>
```
* Once used `<Axis />`, all axis will be shown, if you want to hide some axis and its information, just set visible as false. as below:

```html
// only show one axis
<Chart width={600} height={400} data={data}>
  <Axis name="sold" />
  <Axis name="genre" visible={false} />
  <Geom type="interval" position="genre*sold" color="genre" />
</Chart>
```

## Properties

### 1、name		* String *

The value of name, which comes from the key name of source data(required).

### 2、visible 	* Boolean *
DEFAULT: true
Whether the axis is shown or not.

### 3、position 	*'top'|'bottom'|'left'|'right'*
The position of axis.

### 4、title 	*Object*
Text style for axis title.

- style

```javascript
{
  autoRotate: {Boolean} // DEFAULT: true
  offset: {Number},
  textStyle: {
    fontSize: '12',
    textAlign: 'center',
    fill: '#999',
    fontWeight: 'bold',
    rotate: {角度}
  },
  position: 'start' || 'center' || 'end',
}
```

- text content of title
If you want to set the axis title, you should set it in alias of scale. as below:

```jsx
const scale = {
  sales:{
    alias:'title'
  }
};

<Chart scale={scale} />
```

### 5、line 	*Object*
Line style of axis.

```javascript
{
  stroke: 'dddddd',
  fill: '#ffffff',
  lineDash: [2, 2, 3],
  lineWidth: 3
}
```

### 6、tickLine 	*Object*
TickLine style of axis.

```javascript
{
  lineWidth: 1,
  stroke: '#ccc',
  length: 5, // length of tickline, we can set this value to negative in order to change the diretion of tickline
}
```

- We can also set tickline's number, range, content in scale.

```jsx
const scale = {
  sales:{
    min:0,
    max:10000,
    ticks:[100, 1000, 2000, 3000],
    tickInterval:1000,
    tickCount:10,
  }
};

<Chart scale={scale} />
```

<span id="label"></span>

### 7、label 	*Object*
Text style of label in axis.

```javascript
{
  offset: {Number},
  textStyle: {
  textAlign: 'center',
  fill: '#404040',
  fontSize: '12',
  fontWeight: 'bold',
  rotate: 30,
  textBaseline: 'top'
  } || {Function},
  autoRotate: {Boolean},
  formatter: {Function},
  htmlTemplate: {Function},
}
```

- label also can be set through scale.

```jsx
const scale = {
  sales:{
    min:0,
    max:10000,
    ticks:[100, 1000, 2000, 3000],
    tickInterval:1000,
    tickCount:10,
  }
};

<Chart scale={scale} />
```

### 8、grid 	* Object | null*

Style of Grid. You can set `grid={null}` to hide grid.

```javascript
{
  align: 'center',
  type: 'line' || 'polygon',
  lineStyle: {
    stroke: '#d9d9d9',
    lineWidth: 1,
    lineDash: [4, 4]
  },
  alternateColor: '#ccc' || ['#f80', '#ccc'],
}
```

### 9、subTickCount 	*Number*
The count of sub tick in axis.

### 10、subTickLine 	*Object*
The style of sub tick in axis.
```javascript
{
  lineWidth: 1,
  stroke: '#ddd',
  length: 3,
}
```

## Other Properties
Axis has other properties only work in [scale](scale.md).
### 1、Axis Range
The minimum and maximum in axis.
```jsx
const scale = {
  sales:{
    type:"linear",
    min:0,
    max:1000,
  },
}
<Chart scale={scale}>
  <Geom type="line" position="city*sales" />
  <Axis name="sales"/>
</Chart>
```

### 2、Count of tickcount

```jsx
const scale = {
  sales:{
    type:"linear",
    tickCount:10,
  },
}
<Chart scale={scale}>
  <Geom type="line" position="city*sales" />
  <Axis name="sales"/>
</Chart>
```
### 3、Gap distance between tickline

```jsx
const scale = {
  sales:{
    type:"linear",
    tickInterval:100,
  },
}
<Chart scale={scale}>
  <Geom type="line" position="city*sales" />
  <Axis name="sales"/>
</Chart>
```

### 4、Blank space at both ends of axis

![坐标轴](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791895682958949d755f/attach/4080/900/image.png)

Default value of blank space at both ends of axis is `[ 1 / (count - 1), 1 - 1 / (count - 1) ]`, you can use range to reset it, as below:

```jsx
const scale = {
  city:{
    type:"cat",
    range: [ 0, 1 ]
  },
}
<Chart scale={scale}>
  <Geom type="line" position="city*sales" />
  <Axis name="sales"/>
</Chart>
```

### 5、Axis in different coordinates

In different coordinates, charts need different axis. There have some differences as below:

* In polar coordinates, there's no title in axis, and grid has two shapes(multi polygon and circle).
* theta、helix coordinates hide axis.
* polar coordinate will hide axis when transpose.
