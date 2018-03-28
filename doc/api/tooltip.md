# Tooltip

提示信息(tooltip)组件，是指当鼠标悬停在图表上的某点时，以提示框的形式展示该点的数据，比如该点的值，数据单位等。
<img src="https://gw.alipayobjects.com/zos/rmsportal/VLNhkKRALafPtDCIZFqA.png" width="415px">

## 使用说明
- `<Tooltip />` 坐标系组件只可以作为 [`<Chart />`](chart.md) 或 [`<View />`](view.md) 组件的子组件，同时` <Tooltip /> `组件下不能嵌套其他图表组件。

- BizCharts 当且仅当`<Tooltip />`存在时图表才展示tooltip，如下所示：

```jsx
<Chart width={600} height={400} data={data}>
  <Tooltip /> // 开启图表tooltip功能
  <Geom type="bar" position="genre*sold" color="genre" />
</Chart>
```

## Tooltip 组成
![](https://zos.alipayobjects.com/skylark/750725d4-2e58-4420-b886-4abe1c0335c2/attach/2378/ad8fe2daa557ad62/image.png)

# API
> BizCharts 将 G2 中 *chart.tooltip(option)* 中 option 上最顶层的配置属性平坦到了 <Tooltip /> 组件属性上。

### 1、showTitle 	* Boolean *
是否展示提示信息的标题，默认为 true，即展示，通过设置为 false 来隐藏标题。

### 2、crosshairs 	* Object *

是一个对象类型，用于设置 tooltip 的辅助线或者辅助框。

  默认我们为 geom 为 ‘line’, ‘area’, ‘path’, ‘areaStack’ 开启了垂直辅助线；geom 为‘interval’ 默认会展示矩形背景框。如下图所示：

  <img src="https://gw.alipayobjects.com/zos/rmsportal/rCwHiXNfIVepGgMWKqdf.png" style="width: 100%;max-width:600px;">

  该属性可支持的配置如下：
```jsx
//可配置值
//geom为 'line', 'area', 'path', 'areaStack 时默认会展示垂直辅助线
//geom为 'interval' 默认会展示矩形背景框
<Tooltip crosshairs={{
  //rect: 矩形框,x: 水平辅助线,y: 垂直辅助线,cross: 十字辅助线。
  type: 'rect' || 'x' || 'y' || 'cross',
  style: {
    lineWidth:2,
	  stroke:"#ff0000",
  }
}}/> 

```

### 3、offset 	* Number *
  设置 tooltip 距离鼠标的偏移量。

<span id="containerTpl"></span>
### 4、containerTpl 	* String *

tooltip 默认的容器模板，默认值如下：
```html
<div class="g2-tooltip">
  <!-- tooltip 标题 -->
  <div class="g2-tooltip-title" style="margin:10px 0;"></div>
  <!-- tooltip 内容列表容器 -->
  <ul class="g2-tooltip-list"></ul>
</div>
```
> 如默认结构不满足需求，可以自定义该模板，但是**自定义模板时必须包含各个 dom 节点的 class**，样式可以自定义。

<span id="itemTpl"></span>

### 5、itemTpl 	*String*
tooltip 每项记录的模版，这个属性可以格式化 tooltip 的显示内容。
默认值:
```jsx
<li data-index={index}>
  <!-- 每项记录的 marker -->
  <span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
  {name}: {value}
</li>
```
> 如默认结构不满足需求，可以自定义该模板，但是**自定义模板时必须包含各个 dom 节点的 class**，样式可以自定义。

### 6、 g2-tooltip | g2-tooltip-title | g2-tooltip-list | g2-tooltip-list-item | g2-tooltip-marker  *Object*
可以设置以上属性来自定义tooltip的样式
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
预知详情如何，请[点击这里](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/other/cutomize-tooltip)

### 7、inPlot 	* Boolean *
设置是否将 tooltip 限定在绘图区域内，默认为 true，即限定在绘图区域内。

### 8、follow 	* Boolean *
设置 tooltip 是否跟随鼠标移动。默认为 true，即跟随。

### 9、shared 	* Boolean *
是否展示多条 tooltip。
默认值:true，false 表示只展示单条 tooltip。

### 10、position 	* 'top'|'bottom'|'left'|'right' *
  该属性设置之后，就会在固定位置展示 tooltip，可设置的值为：`left`、`right`、`top`、`bottom`。


### 11. triggerOn * String:['mousemove'|'click'|'none'] *
tooltip 的触发方式，可配置的值为：'mousemove'、'click'、'none'，默认为 `mousemove`。 

  * 'mousemove': 鼠标移动触发；
  * 'click': 鼠标点击出发；
  * 'none': 不触发 tooltip，用户通过 `chart.showTooltip()` 和 `chart.hideTooltip()` 来控制 tooltip 的显示和隐藏。

### 12、 title * string *

设置 tooltip 的标题展示的数据字段，设置该字段后，该标题即会展示该字段对应的数值。`showTitle` 为 false 时，该设置不生效。

### 13、 enterable * boolean *

用于控制是否允许鼠标进入 tooltip，默认为 false，即不允许进入。


## 其他配置

<span id="format"></span>

### 格式化 tooltip 显示内容
1、通过 `<Geom />` 上的 *tooltip* 属性的回调函数来配置。

示例代码:
```jsx
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

3、特别复杂的场景可以通过 `<Chart>` 上的 onTooltipChange  事件来格式化 `<Tooltip />` 显示内容;详见 [onTooltipChange](chart.md#onTooltipChange)

### 固定位置显示 tooltip
可以通过` <Chart /> `组件上的 showTooltip 属性来控制在固定的位置显示提示信息，详见[chart showTooltip 属性说明](chart.md#showTooltip)。

# 示例

## 样式配置

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

## 自定义

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
