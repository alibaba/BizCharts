
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

```jsx
<Guide>
  <Line
    top={boolean} // 指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
    start= {object} | {function} | {array} // 辅助线起始位置，值为原始数据值，支持 callback
    end= {object} | {function} | {array} // 辅助线结束位置，值为原始数据值，支持 callback
    lineStyle= {{
      stroke: '#999', // 线的颜色
      lineDash: [ 0, 2, 2 ], // 虚线的设置
      lineWidth: 3 // 线的宽度
    }} // 图形样式配置
    text={{
      position: 'start' | 'center' | 'end' | '39%' | 0.5, // 文本的显示位置
      autoRotate: {boolean}, // 是否沿线的角度排布，默认为 true
      style: {object}, // 文本图形样式配置
      content: {string}, // 文本的内容
      offsetX: {number}, // x 方向的偏移量
      offsetY: {number} // y 方向的偏移量
    }}
  />
</Guide>
```

### 1、top 	*Boolean*
指定 giude 是否绘制在 canvas 最上层。
默认值:false, 即绘制在最下层。

### 2、start 	*Object | Function | Array*
指定辅助线的起始位置，该值的类型如下：

- object: 使用图表 x,y 对应的原始数据例如： { time: '2010-01-01', value: 200 }

 - array: 数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：
  - x，y 都是原始数据 [ '2010-01-01', 200 ];
  - x，y 可以使用原始数据的替代字符串 'min', 'max', 'median' , 例如：[ 'median', 200 ]
  - x, y 都是用百分比的形式，在绘图区域定位，字符串中存在 '%', 例如 [ '50%', '50%' ] 使得辅助元素居中
- function: 回调函数，可以动态的确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

### 4、end 	*Object | Function | Array*
指定辅助线的结束位置，使用同 start。

### 5、lineStyle 	*Object*
辅助线样式配置。
<span id = "text"></span>

### 6、text *Object*
辅助线可以带文本，该属性使用如下：
```jsx
<Guide>
  <Line
    text={{
      position: 'start' | 'center' | 'end' | '39%' | 0.5, // 文本的显示位置，值除了指定的常量外，还可以是百分比或者小数
      autoRotate: {boolean}, // 指定文本是否沿着线的方向排布，默认为 true，即沿着线排布
      // 设置文本的显示样式
      style: {
        fill: 'red'
      },
      content: {string}, // 文本的内容
      offsetX: {number}, // x 方向的偏移量
      offsetY: {number} // y 方向的偏移量
    }}
  />
</Guide>
```

<span id = "text"></span>

## Text

```jsx
<Guide>
  <Text
    top= {boolean} // 指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
    position= {object} | {function} | {array} // 文本的起始位置，值为原始数据值，支持 callback
    content= {string} // 显示的文本内容
    style= {{
      fill: '#666', // 文本颜色
      fontSize: '12', // 文本大小
      fontWeight: 'bold' // 文本粗细
      rotate: 30 // 旋转角度
    }} // 文本的图形样式属性
    offsetX= {number} // x 方向的偏移量
    offsetY= {number} // y 方向偏移量
  />
</Guide>
```
### 1、top 	*Boolean*
指定 giude 是否绘制在 canvas 最上层。
默认值:false, 即绘制在最下层。

### 2、position 	* Object|Function|Array *
指定辅助文本的显示位置，该值的类型如下：

- object: 使用图表 x,y 对应的原始数据例如： { time: '2010-01-01', value: 200 }

- array: 数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：

 - x，y 都是原始数据 [ '2010-01-01', 200 ];
 - x，y 可以使用原始数据的替代字符串 'min', 'max', 'median' , 例如：[ 'median', 200 ]
 - x, y 都是用百分比的形式，在绘图区域定位，字符串中存在 '%', 例如 [ '50%', '50%'] 使得辅助元素居中
- function: 回调函数，可以动态的确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

### 3、content 	*String*
显示文本内容。

### 4、style 	* Object *
辅助线样式配置。

### 5、offsetX 	* Number *
x 方向的偏移量。

### 6、offsetY 	* Number *
y 方向的偏移量。

<span id = "image"></span>

## Image

```jsx
<Guide>
  // 辅助图片 image，只是指定了 start，则该点表示图片左上角坐标
  <Image
    top = {boolean} // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
    start= {object} | {function} | {array} // 图片起始位置， 值为原始数据值，支持 callback
    src= {string} // 图片路径
    width= {number}
    height= {number}
    offsetX= {number} // x 方向的偏移量
    offsetY= {number} // y 方向偏移量
    />
    // 辅助图片 image，通过指定 start 和 end 确定图片的位置和宽高
    <Image
      top = {boolean} // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
      start= {object} | {function} | {array} // 图片起始位置， 值为原始数据值，支持 callback
      end= {array} | {function} | {array} // 图片结束位置， 值为原始数据值，支持 callback
      src= {string} // 图片路径
      width= {number}
      height= {number}
      offsetX= {number} // x 方向的偏移量
      offsetY= {number} // y 方向偏移量
    />
</Guide>
```

### 1、top 	*Boolean*
指定 giude 是否绘制在 canvas 最上层。
默认值:false, 即绘制在最下层。

### 2、start 	*Object|Function|Array*
指定辅助图片的起始位置，即图片的左上角，该值的类型如下：

- object: 使用图表 x,y 对应的原始数据例如： { time: '2010-01-01', value: 200 }

- array: 数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：
  - x，y 都是原始数据 [ '2010-01-01', 200 ];
  - x，y 可以使用原始数据的替代字符串 'min', 'max', 'median' , 例如：[ 'median', 200 ]
  - x, y 都是用百分比的形式，在绘图区域定位，字符串中存在 '%', 例如 [ '50%', '50%' ] 使得辅助元素居中
- function: 回调函数，可以动态的确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

### 3、end 	*Object|Function|Array*
可选，指定辅助图片的结束位置，即图片的右下角，该属性用法同 start。当 start 和 end 属性同时声明时，即指定了图片的宽度和高度。

### 4、src 	*String*
指定图片的地址，可以是路径，也可以是 base64 编码。

### 5、width 	*Number*
当仅指定了 start 属性时，用于设置图片的宽度。

### 6、height 	*Number*
当仅指定了 start 属性时，用于设置图片的高度。

### 7、offsetX 	*Number*
x 方向的偏移量。

### 8、offsetY 	*Number*
y 方向的偏移量。

<span id = "region"></span>

## Region

```jsx
<Guide>
  <Region
    top={boolean} // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
    start= {object} | {function} | {array} // 辅助框起始位置，值为原始数据值，支持 callback 
    end= {object} | {function} | {array}// 辅助框结束位置，值为原始数据值，支持 callback
    style= {{
      lineWidth: 0, // 辅助框的边框宽度
      fill: '#f80', // 辅助框填充的颜色
      fillOpacity: 0.1, // 辅助框的背景透明度
      stroke: '#ccc' // 辅助框的边框颜色设置
    }} // 辅助框的图形样式属性
    />
</Guide>
```
### 1、top 	*Boolean*
指定 giude 是否绘制在 canvas 最上层。
默认值:false, 即绘制在最下层。

### 2、start 	*Object|Function|Array*
指定辅助背景框的起始位置，即背景框的左上角，该值的类型如下：

- object: 使用图表 x,y 对应的原始数据例如： { time: '2010-01-01', value: 200 }

- array: 数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：
  - x，y 都是原始数据 [ '2010-01-01', 200 ];
  - x，y 可以使用原始数据的替代字符串 'min', 'max', 'median' , 例如：[ 'median', 200 ]
  - x, y 都是用百分比的形式，在绘图区域定位，字符串中存在 '%', 例如 [ '50%', '50%' ] 使得辅助元素居中
- function: 回调函数，可以动态的确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

### 3、end 	*Object|Function|Array*
指定辅助背景框的结束位置，即背景框的右下角，该属性用法同 start。

### 4、style 	*Object*
辅助框图形样式属性。

<span id = "html"></span>

## Html

```jsx
<Guide>
  <Html
    position={object} | {function} | {array} // html 的中心位置， 值为原始数据值，支持 callback
    alignX='left' | 'middle' | 'right'
    alignY='top' | 'middle' | 'bottom'
    offsetX={number}
    offsetY={number}
    html={string} // html 代码
    zIndex={number}
  />
</Guide>
```

### 1、position 	*Object | Function |Array*
设置 html 的显示位置，该值的类型如下：

- object: 使用图表 x,y 对应的原始数据例如： { time: '2010-01-01', value: 200 }

- array: 数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：
  - x，y 都是原始数据 [ '2010-01-01', 200 ];
  - x，y 可以使用原始数据的替代字符串 'min', 'max', 'median' , 例如：[ 'median', 200 ]
  - x, y 都是用百分比的形式，在绘图区域定位，字符串中存在 '%', 例如 [ '50%', '50%' ] 使得辅助元素居中
- function: 回调函数，可以动态的确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

### 2、zIndex 	*Number*
html 层级。

### 3、alignX 	*'left' | 'middle' | 'right'*
html 的水平对齐方式，可取值为： left、middle、right，默认值为 middle。

### 4、alignY 	*top' | 'middle' | 'bottom'*
html 的垂直对齐方式，可取值为： top、middle、bottom，默认值为 middle。

### 5、offsetX 	*Number*
x 方向的偏移量。

### 6、offsetY 	*Number*
y 方向的偏移量。

### 7、html 	*String | Function*
需要显示的 html 内容。

<span id = "arc"></span>

## Arc

```jsx
<Guide>
  <Arc
    top={object} // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
    start={object} | {function} | {array} // 辅助框起始位置，值为原始数据值，支持 callback 
    end={object} | {function} | {array}// 辅助框结束位置，值为原始数据值，支持 callback
    style={object} // 图形样式属性
  />
</Guide>
```

### 1、top 	*boolean*
指定 giude 是否绘制在 canvas 最上层。
默认值： false, 即绘制在最下层。

### 2、start 	*Object|Function|Array*
指定辅助圆弧的起始位置，该值的类型如下：

- object: 使用图表 x,y 对应的原始数据例如： { time: '2010-01-01', value: 200 }

- array: 数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：
  - x，y 都是原始数据 [ '2010-01-01', 200 ];
  - x，y 可以使用原始数据的替代字符串 'min', 'max', 'median' , 例如：[ 'median', 200 ]
  - x, y 都是用百分比的形式，在绘图区域定位，字符串中存在 '%', 例如 [ '50%', '50%' ] 使得辅助元素居中
- function: 回调函数，可以动态的确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景


### 3、end 	*Object|Function|Array*
指定辅助圆弧的结束位置，该属性用法同 start。

### 4、style 	*Object*
设置圆弧的显示样式。
