
# Legend

Legend Component.

## What's Legend?

> Legend is an assistant element in chart, we always use color/size/shape to distinguish different data type and help to filter data in chart. G2 will produce the most fitable lenged according to the config and data type.
> When legend satisfy the condition, which value of name property in `<Legend>` macth one of props(shape, color, size) value in `<Geom />`, it will show.

* once set shape，chart will produce legend according to different shape;
* once set color, legend will show different colors to distinguish data;
* once set size, legend will show different size to distinguish data;


![image | center](https://zos.alipayobjects.com/skylark/9f146402-1e62-4029-b3b8-3d32029af1d6/attach/2378/eb826d75a0bb34cb/image.png "")


## Instructions
* `<Legend />` component only can be nested in [`<Chart />`](chart.md) , and also child components nested in ` <Legend /> ` is forbidden.

* Legend exists as an indivisual component in BizCharts, default hidden unless you add `<Legend />`, show as below:

```html
// legend hidden
<Chart width={600} height={400} data={data}>
	<Geom type="bar" position="genre*sold" color="genre" />
</Chart>
```

* when use `<Legend />`, chart will show show all legends unless there's specified key name match the one key in source data.


```html
// specified legend name
<Chart width={600} height={400} data={data}>
   // When legend satisfy the condition, which value of name property in `<Legend>` macth one of props(shape, color, size) value in `<Geom />`, it will show.
	<Legend name="genre" position="right" title={null} dx={20} />
	<Geom type="bar" position="genre*sold" color="genre" />
</Chart>

// unspecified legend name
<Chart width={600} height={400} data={data}>
	<Legend position="right" title={null} dx={20} />
	<Geom type="bar" position="genre*sold" color="genre" />
</Chart>
```

* Once used `<Legend />`, all legends will show. If you want to hide one legend, confirm to set visible false, show as below:

```html
<Chart width={600} height={400} data={data}>
	<Legend name="genre" visible={false} />
	<Geom type="bar" position="genre*sold" color="genre" />
</Chart>
```

# Properties

There are two legend types, one is classification type and another is continous type. The config is a little different between these two types.

## Classification Legend

![image | center](https://img.alicdn.com/tfs/TB1roBwhrYI8KJjy0FaXXbAiVXa-450-232.png "")

### 1、name		*String*
match the key name in source data.

### 2、visible		*Boolean*

DEFAULT: true.
Whether this legend will show or not.


### 3、position		*‘top’|‘left’|‘right’|‘bottom’*

DEFAULT: 'right'
The position of legend.

### 4、title		*Boolean*
DEFAULT: true, when the position is 'top'/'bottom', it is false

### 5、offsetX		*Number*

DEFAULT: 0
The offset distance of legend in x-axis. Unit is 'px'.

### 6、offsetY 	*Number*

DEFAULT: 0
The offset distance of legend in y-axis. Unit is 'px'.

### 7、itemGap 	*Number*
This property only works for .Gap distance of each item in legend.

### 8、itemMarginBottom 	*Number*
The distance of each legend.

### 9、itemWidth 	*Number*
The width of legend.

### 10、unCheckedColor 	*String*
The color of text when the legend item is unchecked.

### 11、background 	*Object*
Background config for legend.
```jsx
{
  fill:"#ff0000",
  fillOpacity:0.5,
}
```

### 12、allowAllCanceled 	*Boolean*
DEFAULT: false.
Allow all legend cancled, what means must confirm at least one item is checked.

### 13、itemFormatter 	*Function*
Used for formatting text.

### 14、marker 	*String*
Marker style can be used for legend:`'circle', 'square', 'bowtie', 'diamond', 'hexagon', 'triangle', 'triangle-down', 'hollowCircle', 'hollowSquare', 'hollowBowtie', 'hollowDiamond', 'hollowHexagon', 'hollowTriangle', 'hollowTriangle-down', 'cross', 'tick', 'plus', 'hyphen', 'line'`

### 15、textStyle 	*Object*
Style for legend text.
```jsx
{
  fill:"#ff0000",
  stroke:"#dddddd",
}
```

### 16、clickable 	*Boolean*
DEFAULT: true.

### 17、hoverable *Boolean*
DEFAULT: true.

### 18、selectedMode 	*‘single’ | ‘multiple’*
Only works when clickable is true.

### 19、onHover 	*Function*
Custom hover event. You can disable this event just set hoverable false.

### 20、onClick 	*Function*
Custom click event. You can disable this event just set clickable false.

## Classification Legend with custom html
Most properties are the same as normal classification legend, some extra properties show as below:

### 1、useHtml *Boolean | Function*
whether enable custom html template to show legend.

### 2、containerTpl *String*
The specified template for custom legend.
```html
<!-- outside container for legend -->
<div class="g2-legend" style="position:absolute;top:20px;right:60px;width:auto;">
  <!-- legeng title -->
  <h4 class="g2-legend-title"></h4>
  <!-- legeng container -->
  <ul class="g2-legend-item-list" style="list-style-type:none;margin:0;padding:0;"></ul>
</div>
```
### 3、itemTpl *String | Function*
Specified template for each legend item.
```html
<!-- outside container for legend item -->
<li class="g2-legend-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}" style="cursor: pointer;font-size: 14px;">
  <!-- marker -->
  <i class="g2-legend-marker" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px;background-color: {color};"></i>
  <!-- text of each item -->
  <span class="g2-legend-text">{value}</span>
</li>
```
### 4、g2-legend | g2-legend-item | g2-legend-list-item | g2-legend-marker | g2-legend-text |  *Object*
You can set the legend style as below:
```jsx
<Legend position='bottom'
  useHtml={true} 
  g2-legend = {{
    marginLeft: '100px',
    marginTop: '-107px'
  }}
  g2-legend-list={{
    border: 'none'
  }}
/>
```
[More Details](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/other/cutomize-legend)

### 3、scroll *Boolean*
When use custom html template, BizCharts will wrap automatically.

## Continous Legend
Most properties of continous legend are the same as classification(name, position, offsetX, offsetY, title), some extra properties show as below:

### 1、slidable 	*Boolean*
DEFAULT: true.
Whether the legend can slide or not.

### 2、width 	*Number*
Width of Legend.

### 2、height *Number*
Height of legend.

## Custom Mixed Legend
Here just show some extra properties which are different normal legend.

### 1、custom 	*Boolean*
DEFAULT: false.
Whether it is a custom legend.

### 1、items 	*Array:[Object]*
User should set legend by oneself including content and events, the structure of each item like this `{ value: '', fill: '', marker: '' }`.

```jsx
<Legend
  custom={true},
  items={[
    { value: 'waiting', fill: '#3182bd', marker: 'shape' },
    { value: 'call', fill: '#99d8c9', marker: 'shape' },
    { value: 'people', fill: '#fdae6b', marker: 'shape' },
  ]}
  onHover={ev => {}} // custom hover event
  onClick={ev => {}} // custom click event
/>
```

## [示例](https://alibaba.github.io/BizCharts/demo-detail.html?code=/demo/bar/grouped-column)


```html
<Chart height={400} data={dv} scale={cols} forceFit>
  <Axis name="month" />
  <Axis name="temperature" label={{formatter: val => `${val}°C`}}/>
  <Legend />
  <Tooltip crosshairs={{type : "y"}}/>
  <Geom type="line" position="month*temperature" size={2} color={'city'} />
  <Geom type='point' position="month*temperature" size={4} shape={'circle'} color={'city'} style={{ stroke: '#fff', lineWidth: 1}} />
</Chart>
```
![image | left ](https://img.alicdn.com/tfs/TB1..5Ma8fH8KJjy1XbXXbLdXXa-1600-856.png)