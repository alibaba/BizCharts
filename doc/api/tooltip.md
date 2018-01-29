
## Tooltip

提示信息(tooltip)组件，是指当鼠标悬停在图表上的某点时，以提示框的形式展示该点的数据，比如该点的值，数据单位等。
<img src="https://gw.alipayobjects.com/zos/rmsportal/VLNhkKRALafPtDCIZFqA.png" width="415px">

## 使用说明
- `<Tooltip />` 坐标系组件只可以作为 [`<Chart />`](chart.md) 组件 或者 [`<View />`](view.md) 组件的孩子，同时` <Tooltip /> `组件下不能嵌套其他图表组件。

- BizCharts 中将 Tooltip 抽离为一个单独的组件，不使用 Tooltip 组件则默认不显示所有提示信息，如下所示：

```html
// 不显示提示信息
<Chart width={600} height={400} data={data}>
  <Geom type="bar" position="genre*sold" color="genre" />
</Chart>
```

- 显示 Tooltip：

```html
<Chart width={600} height={400} data={data}>
  <Tooltip />
  <Geom type="bar" position="genre*sold" color="genre" />
</Chart>
```
## Tooltip 组成
![](https://zos.alipayobjects.com/skylark/750725d4-2e58-4420-b886-4abe1c0335c2/attach/2378/ad8fe2daa557ad62/image.png)

## 属性
> BizCharts 将 G2 中 *chart.tooltip(option)* 中 option 上最顶层的配置属性平坦到了 <Tooltip /> 组件属性上。

### 1、showTitle 	* Boolean *
是否展示 title。
默认值:true。

### 2、crosshairs 	* Object *
是否展示 crosshairs。
```jsx
//可配置值
//geom为 'line', 'area', 'path', 'areaStack 时默认会展示垂直辅助线
//geom为 'interval' 默认会展示矩形背景框
{
  //rect: 矩形框,x: 水平辅助线,y: 垂直辅助线,cross: 十字辅助线。
  type: 'rect' || 'x' || 'y' || 'cross',
  style: {
    lineWidth:2,
	stroke:"#ff0000",
  }
}
```

### 3、offset 	* Number *
tooltip 距离鼠标的偏移量。

<span id="containerTpl"></span>

### 4、containerTpl 	* String *
tooltip 容器模板 ，注意一定要包含以下 class。
```jsx
<div class="g2-tooltip">
  <!-- tooltip 标题 -->
  <div class="g2-tooltip-title" style="margin:10px 0;"></div>
  <!-- tooltip 内容列表容器 -->
  <ul class="g2-tooltip-list"></ul>
</div>
```

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
是否将 tooltip 展示在图表区域内。

### 8、follow 	* Boolean *
tooltip 是否跟随鼠标移动。

### 9、shared 	* Boolean *
是否展示多条 tooltip。
默认值:true，false 表示只展示单条 tooltip。

### 10、position 	* 'top'|'bottom'|'left'|'right' *
tooltip 展示位置。

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
