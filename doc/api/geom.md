
# Geom 几何标记

几何标记对象，决定创建图表的类型，具体的概念介绍请参见 。


## 什么是几何标记

即我们所说的点、线、面这些几何图形。BizCharts 中并没有特定的图表类型（柱状图、散点图、折线图等）的概念，用户可以单独绘制某一种类型的图表，如饼图，也可以绘制混合图表，比如折线图和柱状图的组合。

BizCharts 生成的图表的类型，是由几何标记和坐标系共同决定的。可以通过下图直观得理解什么是几何标记：
<img src="https://gw.alipayobjects.com/zos/rmsportal/ffXoDNzwnXNHoaxtjbfY.png" style="width: 75%">


## 几何标记和图表类型
虽然 BizCharts 没有特定的图表类型概念，**但是仍基本支持所有传统图表类型的绘制**。

下表展示了 BizCharts 中的 geom 几何标记类型和传统图表的对应关系，更多的图表详见 BizCharts 官网的 [demo](https://alibaba.github.io/BizCharts/demo.html)。

geom 类型| 图表类型 | 备注
-------- | -------- | --------
point| 点图、折线图中的点| 点的形状有很多，也可以使用图片代表点[气泡图](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/point/bubble)，同时点也可以在不同坐标系下显示，所以可以扩展出非常多的图表类型。
path| [路径图](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/other/path)，地图上的路径 | 路径图是无序的线图。
line| 折线图、曲线图、[阶梯线图](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/line/step)| 在极坐标系下可以转换成雷达图。
area| 区域图（面积图）、层叠区域图、[区间区域图](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/area/range)|极坐标系下可用于绘制雷达区域图。
interval| 柱状图、直方图、南丁格尔玫瑰图、饼图、条形环图（玉缺图）、漏斗图等| 通过坐标系的转置、变化，可以生成各种常见的图表类型；所有的图表都可以进行层叠、分组。
polygon|[色块图（像素图）](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/heatmap/heatmap)、[热力图](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/heatmap/image)、[地图](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/map/china)| 多个点可以构成多边形。
schema| k 线图，箱型图 | 自定义的图表类型。
edge| 树图、流程图、关系图 | 与点一起构建关系图。
heatmap| 热力图 | --

## 父组件
- [`<Chart />`](chart.md)
- [`<View />`](view.md)

## 子组件
- [`<Label />`](label.md)

## 属性
> 更多[图形属性](graphic.md)
### 1、type    * String *
几何标记类型，目前 BizCharts 支持的几何标记类型如下：

type | 说明
--- | ---
`point` | 点，用于点图的构建。
`path` | 路径，无序的点连接而成的一条线。
`line` | 线，点按照 x 轴连接成一条线，构成线图。
`area` | 填充线图跟坐标系之间构成区域图，也可以指定上下范围。
`interval` | 使用矩形或者弧形，用面积来表示大小关系的图形，一般构成柱状图、饼图等图表。
`polygon` | 多边形，可以用于构建热力图、地图等图表类型。
`schema` | k线图，箱型图。
`edge` | 树图、流程图、关系图。
`heatmap` | 热力图。

同时 BizCharts 默认提供了如下 8 中几何标记和[数据调整](geom.md#adjust)的组合类型。

type | 描述
--- | ---
`pointStack` | 层叠点图
`pointJitter` | 扰动点图
`pointDodge` | 分组点图
`intervalStack` | 层叠柱状图
`intervalDodge` | 分组柱状图
`intervalSymmetric` | 对称柱状图
`areaStack` | 层叠区域图
`schemaDodge` | 分组箱型图

### 2、adjust    * Object *
声明几何标记对象的数据调整方式，可用于绘制层叠图、扰动图、分组图等。支持单一的数据调整方式也支持各种数据调整方式的组合。
支持的调整类型包括： 'stack', 'dodge', 'jitter', 'symmetric'。

```jsx
<Geom
  type= "point"
  adjust= {'stack'}
  // or
  adjust= {['dodge', 'stack']}
  // or
  adjust= {[
    {
      type: 'dodge',
      marginRatio: 0, // 数值范围为 0 至 1，用于调整分组中各个柱子的间距
      dodgeBy: 'xx', // 声明按照 xx 字段进行分组，一般不需要声明
    }
  ]}
/>
```

<span id="position"></span>

### 3、position    * String *
位置属性的映射；用于确定由数据中的哪几个字段来确定数据在平面坐标系的位置。通俗地解释，即确定 x 轴和 y 轴的数据字段。它是唯一一个可以用于编码分类又可用于编码定序或者定量的数据属性。

```jsx
<Geom position="x*y" />
<Geom position={['x', 'y']} />
```
使用 `*` 连接，position 属性会对多个字段进行数据的映射，如：cut*price，x*y 等，用于二维坐标系图表的绘制。

以 chart.point().position('x*y') 为例，point 代表图形，即最后需要生成点图，而 position 代表位置，position('x*y') 代表数据在图形中的位置由 x 和 y 这两个维度的变量决定，x * y 的数据处理结果可以理解为：

![image](https://gw.alipayobjects.com/zos/rmsportal/EcuDeyeTOsztVOuxmZPe.png)

(x1, y1) 这样的数值对，最后就会被转换为画布上对应的坐标点。

另外，也可以以数组格式传入：`chart.geom().position([ 'fieldA', 'fieldB' ])`

<span id="color"></span>

### 4、color    * String | Array *
将数据值映射到图形的颜色上的方法。

color 支持的映射值如下：
- *'field'*，field 为数据字段名，内部会使用主题中的默认颜色进行数据值到颜色值的映射；
```jsx
//代码示例
<Geom color='cut'/>
```
- ['field', colors]，将数据值映射至指定的颜色值 colors（可以是字符串也可以是数组），此时用于通常映射分类数据；
```jsx
//代码示例
<Geom color={['city', ['#ff0000', '#00ff00']]}/>
```
- ['field', 'color1-color2-colorN')]，指定颜色的渐变路径，用于映射连续的数据；
```jsx
//代码示例
<Geom color={['price', '#ff0000-#00ff00']}/>
```
- ['field', callback)]，使用回调函数进行颜色值的自定义；可以使用多个字段使用*号连接
	注意：
	    color 属性的回调函数一般返回的单个颜色，因为 G2 中所有的 shape 仅支持单个颜色
	    color 属性的回调函数也可以返回数组，数组中有多个颜色，但是这时候需要 shape 支持多颜色的解析，详细情况查看 [自定义shape](shape.md)。
```jsx
//代码示例
<Geom
  color={['cut', (cut)=>{
	//some code
	  if(cut < 1000)
	    return '#00ff00';
	  else
	    return '#ff0000';
	}]}
/>
```
- color('#ffffff')， 直接指定颜色常量，不进行数据映射。
```jsx
//代码示例
<Geom color='ffffff'/>
```

<span id="shape"></span>

### 5、shape    * String | Array*
将数据值映射到图形的形状上的方法。

shape 支持的映射值如下：
- 'field'，将指定的字段映射到内置的 shapes 数组中；
```jsx
//代码示例
<Geom shape='city'/>
```
- ['field', shapes]，用户自己提供 shapes 数据，来进行数据映射；
```jsx
//代码示例
<Geom shape={['city', ['circle', 'rect']]} />
```
- ['fields', callback]，使用回调函数获取 shape，用于个性化的 shape 定制，可以根据单个或者多个字段确定；
```jsx
//代码示例
<Geom
  shape={['city', (city)=>{
    if(city == 'hangzhou'){
	  return circle;
	}
	return 'rect';
  }]}
/>
```
- 'shapeType'，指定常量，将所有数据值映射到固定的 shape。
```jsx
//代码示例
<Geom shape='circle' />
```

另外 BizCharts 提供了自定义 shape 的功能，用户可以自己绘制需要的 shape，详见[自定义 shape](shape.md)。

注：使用几何标记实现各种图表类型时，对于每一种几何标记来说，图形在绘制的时候有不同的形状（shape)，在[几何标记](geom.md) 章节已列出了目前 BizCharts 提供的 Geom 默认支持的 shape。

<span id="size"></span>

### 6、size    * String | Array | Number *
对于不同的几何标记含义不完全一致：

- 对于 point 点来说，size 对应着点的半径；
- 对于 line 线来说，size 对应着线的粗细；
- 对于 interval 柱状图来说，size 对应着柱子的宽度。

size 支持映射值如下：
- 'field'，指定映射到 size 的字段，使用内置的默认大小范围为 [1, 10]；
```jsx
//代码示例
<Geom size='count'/>
```
- ['field', [ min, max ]]，指定映射到 size 字段外，还提供了 size 的最大值和最小值范围；
```jsx
//代码示例
<Geom size={['count', [1, 10]]}/>
```
- ['fields', callback)]，使用回调函数映射 size，用于个性化的 size 定制，可以使用多个字段进行映射；
```jsx
//代码示例
<Geom size={['count', (count)=>{
  if(count > 1000)
    return 10;
  else return 1;
}]}/>
```
- Number，直接指定像素大小。
```jsx
//代码示例
<Geom size={3}/>
```

<span id="opacity"></span>

### 7、opacity    * String | Array | Number *
将数据值映射到图形的透明度上的方法。

```jsx
//代码示例
<Geom opacity='field'/> // 使用字段映射到透明度
<Geom opacity={0.2}/> // 常量，但是数值范围为 0 - 1
<Geom opacity={['count', (count)=>{ // 回调函数
  if(count > 1000)
    return 0.6;
  return 0.1;
}]}/>
```

### 8、style    * Object | Array *
配置几何图形的样式。
当 style 的值是 Object 时，该 Object 中只能设置固定样式。
当 style 的值是 Array 时，可以通过回调函数根据具体的数据去动态配置样式。
```jsx
//代码示例
<Geom
  style={{
    lineWidth:1
  }}
  //或者
  style={['sales*city', {
    lineWidth:1,
	stroke:(sales, city)=>{
	  if(city === 'hangzhou' && sales > 1000)
		return "#ff0000";
	  return "#00ff00";
	}
   }]}
/>
```
<span id="tooltip"></span>

### 9、tooltip    * Boolean | String | Array *
将数据值映射到 Tooltip 上。
- Boolean 该几何标记是否需要显示 tooltip，默认值 false；
- String 格式为 a*b*c，该几何标记上 tooltip 需要显示的数据字段，每个地段将会显示为一行。
- Array 格式为 [a*b*c, callback],该几何标记上 tooltip 需要显示的数据字段,同时可以在 callback 中调整数据的显示格式。
```jsx
<Geom tooltip={false} />
<Geom
  tooltip={['sales*city', (sales, city)=>{
    return {
	  name:'xxx',
	  value:city + ':' + sales
	}
  }]}
/>
```

### 10、select    * Boolean | Array *
开启、关闭以及设置 shape 对于鼠标 click 事件的响应效果。BizCharts 默认仅为饼图开启了选中效果。

- Boolean，是否打开 对于鼠标 click 事件的响应效果。
- Array，[Boolean, configObject]。
```jsx
<Geom
  select={[true, {
    mode: 'single' || 'multiple', // 选中模式，单选、多选
	style: { }, // 选中后 shape 的样式
	cancelable: true | false, // 选中之后是否允许取消选中，默认允许取消选中
	animate: true | false // 选中是否执行动画，默认执行动画
  }]}
/>
```

### 11、Active    * Boolean *
图形激活交互开关。

### 12、animate    * Object *
定义几何标记上的动画效果，具体配置参数及使用参见[animate文档](../tutorial/animate.md)
