
## Tooltip

The tooltip component means that when the mouse hovers over a point on the chart, the data of the point is displayed in the form of a prompt box, such as the value of the point, the unit of data, and the like.
<img src="https://gw.alipayobjects.com/zos/rmsportal/VLNhkKRALafPtDCIZFqA.png" width="415px">

## Instruction
- `<Tooltip />` can only be a Child Component of a  [`<Chart />`](chart.md) or [`<View />`](view.md).The `<Tooltip />`component can not nest other chart components.

- In BizCharts, the Tooltip is stripped as a single component, and without the Tooltip component all the hints are not displayed by default, as shown below:

```html
// Do not show the message
<Chart width={600} height={400} data={data}>
  <Geom type="bar" position="genre*sold" color="genre" />
</Chart>
```

- Show Tooltip：

```html
<Chart width={600} height={400} data={data}>
  <Tooltip />
  <Geom type="bar" position="genre*sold" color="genre" />
</Chart>
```
## The composition of Tooltip
![](https://zos.alipayobjects.com/skylark/750725d4-2e58-4420-b886-4abe1c0335c2/attach/2378/ad8fe2daa557ad62/image.png)

## Properties
> BizCharts flattens the top-level configuration properties of the option in * chart.tooltip (option) * in G2 to the <Tooltip /> component properties.

### 1、showTitle 	* Boolean *
Whether to show title.
default: true。

### 2、crosshairs 	* Object *
Whether to show crosshairs。
```jsx
// Configurable values
// When `Geom` is one of 'line', 'area', 'path', 'areaStack', vertical guides(`y`) are displayed by default
// When `Geom` is 'interval', rectangular frame(`rect`) are displayed by default.
{
  //rect: rectangular frame,x: horizontal guides, y: vertical guides, cross: cross guides
  type: 'rect' || 'x' || 'y' || 'cross',
  style: {
    lineWidth:2,
	stroke:"#ff0000",
  }
}
```

### 3、offset 	* Number *
Offset from the mouse.

<span id="containerTpl"></span>

### 4、containerTpl 	* String *
Tooltip container template, be sure to include the following class name.
```jsx
<div class="g2-tooltip">
  <!-- title -->
  <div class="g2-tooltip-title" style="margin:10px 0;"></div>
  <!-- content list container -->
  <ul class="g2-tooltip-list"></ul>
</div>
```

<span id="itemTpl"></span>

### 5、itemTpl 	*String*
 Each record template of Tooltip, this attribute can format the display of tooltip.
Default:
```jsx
<li data-index={index}>
  <!-- The marker for each record -->
  <span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
  {name}: {value}
</li>
```
### 6、 g2-tooltip | g2-tooltip-title | g2-tooltip-list | g2-tooltip-list-item | g2-tooltip-marker  *Object*
You can set the above properties to customize the style of the tooltip
```jsx

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
        opacity: "0.8",
        padding: '5px 15px',
        'transition': 'top 200ms,left 200ms'
      }}  
      g2-tooltip-list={{
        margin: '10px'
      }}
    />
```
For more details, please [click here](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/other/cutomize-tooltip)

### 7、inPlot 	* Boolean *
Whether to show the tooltip in the chart area.

### 8、follow 	* Boolean *
Whether the tooltip follows the mouse movement.

### 9、shared 	* Boolean *
Whether to show multiple tooltips.
Default: `true`, `false` means that only a single tooltip is displayed.

### 10、position 	* 'top'|'bottom'|'left'|'right' *
tooltip placement.

## Other configuration

<span id="format"></span>

### Formatted tooltip display content
1, configured via the callback function of the * tooltip * property on `<Geom />`.

Sample code:
```jsx
<Chart>
  <Geom
    tooltip={['time*sold', (time, sold) => {
	  return {
	    // Custom tooltip on the title display and so on.
		name: 'sold',
		title: 'dddd' + time,
		value: sold
	  };
	}]}
  />
</Chart>
```

2, formatted by the itemTpl `<Tooltip /> `, see [itemTpl attribute description] (#itemTpl).

3, In particularly complex scene `<Tooltip />` can be formatted by the `onTooltipChange` event on `<Chart>`; see [onTooltipChange](chart.md#onTooltipChange)

### Fixed position shows tooltip
The showTooltip property on the `<Chart />` component controls the display of prompts at a fixed location, as described in [chart showTooltip Property Description](chart.md#showTooltip)。

# Example

## Style configuration

```html
// Omitted...
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

const data = [{ genre: 'Sports', sold: 275 } /* Omitted... */];
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

## Customize

```html
// Omitted...
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

const data = [{ genre: 'Sports', sold: 275 } /* Omitted... */];
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
