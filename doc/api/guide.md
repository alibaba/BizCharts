
# Guide
辅助元素组件，主要用于在图表上标识额外的标记注解。

<img src="https://gw.alipayobjects.com/zos/rmsportal/ekrHtCkdfMttjnAXqApH.png" width="500px">

## 使用说明
- `<Guide />` 组件只可以作为 [`<Chart />`](chart.md) 组件 或者 [`<View />`](view.md) 组件的孩子，同时 `<Guide />` 组件下只能嵌套以下其他图表组件。

| 组件 | 说明 | 属性 |
| :- | :-| :- |
| Line |辅助线（可带文本），例如表示平均值或者预期分布的直线。| [参见Line](#line) |
| Image | 辅助图片，在图表上添加辅助图片。| [参见Image](#image) |
| Text | 辅助文本，指定位置添加文本说明。| [参见Text](#text) |
| Region | 辅助框，框选一段图区，设置背景、边框等。| [参见Region](#region) |
| Html | 辅助 html，指定位置添加自定义 html，显示自定义信息。| [参见Html](#html) |
| Arc | 辅助弧线。| [参见Arc](#arc) |


- 不同辅助标记组件所支持的配置属性也不一样，主要差异为坐标位置属性差异:
  - Text, Html 中使用 position
  - Line, Region, Image, Arc 中使用 start、end 字段

**位置值说明**
- Object 使用图表 x,y 对应的原始数据例如： {time: ‘2010-01-01’, value: 200}
- Array 数组来配置位置 [x, y]，根据数组中的值的存在以下几种形式：
	- x，y 都是原始数据 [‘2010-01-01’]
	- x，y 可以使用原始数据的替代字符串 ‘min’, ‘max’, ‘median’ , 例如：[‘median’, 200]
	- x, y 都是用百分比的形式，在绘图区域定位，字符串中存在 ‘%’, 例如[‘50%’, ‘50%’] 使得辅助元素居中
- Function 回调函数，可以动态的确定辅助元素的位置
```jsx
// 应用于数据动态更新，辅助元素的位置根据数据变化
<Guide>
  <Text
    type="text"
    content='最大值'
    position={(xScale, yScale)=>{
      return []; //位置信息
    }}
  />
</Guide>
```

## 使用示例
![e051f3e7-35ab-4895-8aa6-89fba3045da9.png](https://img.alicdn.com/tfs/TB16XZ8bOqAXuNjy1XdXXaYcVXa-1186-510.png)
```jsx
<Chart width={600} height={400} data={data}>
  <Guide>
	<Region start={[-1, 0]} end={[1, ranges[0]]} style={{fill: '#e96e33',
	fillOpacity: 0.5}}/>
	<Region start={[-1, ranges[0]]} end={[1, ranges[1]]} style={{fill: '#f9ca47',
	fillOpacity: 0.5}}/>
	<Region start={[-1, ranges[1]]} end={[1, ranges[2]]} style={{fill: '#88bb34',
	fillOpacity: 0.5}}/>
  </Guide>
</Chart>
```
[demo链接](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/other/bullet-graph)

## Guide 组件属性
`<Guide>` 组件主要是用来管理他下面孩子组件的渲染、属性更新的，本身并没有属性需要配置。

<span id = "line"></span>

## Line

### 1、top 	* Boolean *
指定 giude 是否绘制在 canvas 最上层。
默认值:false, 即绘制在最下层。

### 2、zIndex 	* Number *
指定 giude 的 z 坐标。

### 3、start 	* Object | Function | Array *
辅助线起始位置，值为原始数据值。[具体参见位置值说明](#position)

### 4、end 	* Object | Function | Array *
辅助线结束位置，值为原始数据值。[具体参见位置值说明](#position)

### 5、lineStyle 	* Object *
辅助线样式配置。
```jsx
<Guide
  type='line'
  lineStyle={{
    stroke:'#999',//线的颜色
	lineDash:[0, 2, 2]//虚线的设置
	lineWidth:2,//线的宽度
  }}
/>
```
<span id = "text"></span>

### 6、Text
辅助线上说明文本的配置。
具体参见:
```jsx
<Guide
  type='line'
  text={{
    position:{'start'|'center'|'end'|'39%'|0.5} //文本的显示位置
	autoRotate={Boolean} // 是否沿线的角度排布，默认为 true
	style={{
      //文本图形样式配置
	  fill:"#ddd",
	  fontSize:'12'//字体大小
    }}
	content={String}//文本的内容
	offsetX={Number}//x 方向的偏移量
    offsetY={Number}//y 方向的偏移量
  }}
/>
```

<span id = "text"></span>

## text
### 1、top 	* Boolean *
指定 giude 是否绘制在 canvas 最上层。
默认值:false, 即绘制在最下层。

### 2、zIndex 	* Number *
指定 giude 的 z 坐标。

### 3、position 	* Object|Function|Array *
文本的起始位置，值为原始数据值。[具体参见位置值说明](#position)

### 4、content 	* String *
显示文本内容。

### 5、style 	* Object *
辅助线样式配置。
```jsx
<Guide
  type='line'
  style={{
    fill:'#999',//文本颜色
	fontSize:'12'//字体大小
	rotate:30,//旋转角度
  }}
/>
```

### 6、offsetX 	* Number *
x 方向的偏移量。

### 7、offsetY 	* Number *
y 方向的偏移量。

<span id = "image"></span>

## image
### 1、top 	* Boolean *
指定 giude 是否绘制在 canvas 最上层。
默认值:false, 即绘制在最下层。

### 2、zIndex 	* Number *
指定 giude 的 z 坐标。

### 3、start 	* Object|Function|Array *
图片起始位置，值为原始数据值。[具体参见位置值说明](#position)

### 4、end 	* Object|Function|Array *
图片结束位置，值为原始数据值。[具体参见位置值说明](#position)
> 如果同时设置 `start、end` 属性，那么图片的宽高由 `start、end` 确定。

### 5、src 	* String *
图片路径。

### 6、width 	* Number *
图片宽度。

### 7、height 	* Number *
图片高度。

### 8、offsetX 	* Number *
x 方向的偏移量。

### 7、offsetY 	* Number *
y 方向的偏移量。

<span id = "region"></span>

## region
### 1、top 	* Boolean *
指定 giude 是否绘制在 canvas 最上层。
默认值:false, 即绘制在最下层。

### 2、zIndex 	* Number *
指定 giude 的 z 坐标。

### 3、start 	* Object|Function|Array *
辅助框起始位置，值为原始数据值。[具体参见位置值说明](#position)

### 4、end 	* Object|Function|Array *
辅助框结束位置，值为原始数据值。[具体参见位置值说明](#position)

### 5、style 	* Object *
辅助框图形样式属性。
```jsx
<Guide
  type='line'
  style={{
    lineWidth: 0, // 辅助框的边框宽度
    fill: '#f80', // 辅助框填充的颜色
    fillOpacity: 0.1, // 辅助框的背景透明度
    stroke: '#ccc' // 辅助框的边框颜色设置
  }}
/>
```

<span id = "html"></span>

## html
### 1、position 	* Object | Function |Array *
html 的中心位置， 值为原始数据值，[具体参见位置值说明](#position)

### 2、zIndex 	* Number *
指定 giude 的 z 坐标。

### 3、alignX 	* 'left' | 'middle' | 'right' *
x 方向对齐方式。

### 4、alignY 	* top' | 'middle' | 'bottom' *
y 方向对齐方式。

### 5、offsetX 	* Number *
x 方向的偏移量。

### 6、offsetY 	* Number *
y 方向的偏移量。

### 7、html 	* String | Function*
html 代码，也支持callback,可能是最大值、最小值之类的判定

<span id = "arc"></span>

## arc
### 1、top 	* boolean *
指定 giude 是否绘制在 canvas 最上层。
默认值： false, 即绘制在最下层。

### 2、start 	* Object|Function|Array *
辅助框起始位置，值为原始数据值。[具体参见位置值说明](#position)

### 3、end 	* Object|Function|Array *
辅助框结束位置，值为原始数据值。[具体参见位置值说明](#position)

### 4、style 	* Object *
辅助框图形样式属性。
```jsx
<Guide
  type='line'
  style={{
    lineWidth: 0, // 辅助框的边框宽度
    fill: '#f80', // 辅助框填充的颜色
    fillOpacity: 0.1, // 辅助框的背景透明度
    stroke: '#ccc' // 辅助框的边框颜色设置
  }}
/>
```
