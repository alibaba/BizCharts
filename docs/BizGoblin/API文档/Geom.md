# Geom





几何标记对象，决定创建图表的类型。

## 几何标记和图表类型

下表展示了 BizGoblin 中的 geom 几何标记类型和传统图表的对应关系。

geom 类型| 图表类型 | 备注
-------- | -------- | --------
point| 点图、折线图中的点| 点的形状有很多，同时点也可以在不同坐标系下显示，所以可以扩展出非常多的图表类型。
path| 路径图 | 路径图是无序的线图。
line| 折线图、曲线图 | 在极坐标系下可以转换成雷达图。
area| 区域图（面积图）、层叠区域图、区间区域图 |极坐标系下可用于绘制雷达区域图。
interval| 柱状图、直方图、南丁格尔玫瑰图、饼图、条形环图（玉缺图）、漏斗图等| 通过坐标系的转置、变化，可以生成各种常见的图表类型；所有的图表都可以进行层叠、分组。
polygon| 色块图（像素图）、热力图 | 多个点可以构成多边形。
schema| k 线图，箱型图 | 自定义的图表类型。

## 父组件
- [`<Chart />`](47)

## 子组件
- none

## API

Geom 支持的接口可以分为四大类：

- 数据映射相关的属性函数：`position`, `color`, `shape`, `size`
- 显示辅助信息的函数：`style`
- 额外的控制函数：`adjust`
- 动画配置函数：`animate`

###  type
* 类型：String
* 描述：几何标记类型，目前 BizGoblin 支持的几何标记类型如下：

type | 说明
--- | ---
`point` | 点，用于点图的构建。
`path` | 路径，无序的点连接而成的一条线。
`line` | 线，点按照 x 轴连接成一条线，构成线图。
`area` | 填充线图跟坐标系之间构成区域图，也可以指定上下范围。
`interval` | 使用矩形或者弧形，用面积来表示大小关系的图形，一般构成柱状图、饼图等图表。
`polygon` | 多边形，可以用于构建热力图、地图等图表类型。
`schema` | k线图，箱型图。

###  generatePoints
* 类型：String
* 描述：是否生成多个点来绘制图形，true 时会生成多个点。line、path 默认为 false，其他 geom 类型均为 true。

###  sortable
* 类型：String
* 描述：是否对数据按照 x 轴对应字段进行排序，true 时会进行排序。默认 area 和 line 类型会进行排序（即值为 true），其他类型均为 false。

> 在绘制折线图或者区域图时，如果您的数据已经经过排序，可以将该属性设置为 false，以提高处理性能。

###  sstartOnZero
* 类型：String
* 描述：用于设置图形的 Y 轴基线是否从 0 开始，默认为 true，以 0 为基线。默认值为true。

###  position
* 类型：String
* 描述：位置属性的映射；用于确定由数据中的哪几个字段来确定数据在平面坐标系的位置。通俗地解释，即确定 x 轴和 y 轴的数据字段。它是唯一一个可以用于编码分类又可用于编码定序或者定量的数据属性。

```js
<Geom position="x*y" />
<Geom position={['x', 'y']} />
```

使用 `*` 连接，position 属性会对多个字段进行数据的映射，如：cut*price，x*y 等，用于二维坐标系图表的绘制。

###  color
* 类型：String | Array
* 描述：将数据值映射到图形的颜色上的方法。

color 支持的映射值如下：
- *'field'*，field 为数据字段名，内部会使用主题中的默认颜色进行数据值到颜色值的映射；

```js
//代码示例
<Geom color='cut'/>
```
- ['field', colors]，将数据值映射至指定的颜色值 colors（可以是字符串也可以是数组），此时用于通常映射分类数据；

```js
//代码示例
<Geom color={['city', ['#ff0000', '#00ff00']]}/>
```
- ['field', 'color1-color2-colorN')]，指定颜色的渐变路径，用于映射连续的数据；

```js
//代码示例
<Geom color={['price', '#ff0000-#00ff00']}/>
```

- ['field', callback)]，使用回调函数进行颜色值的自定义；可以使用多个字段使用*号连接
	注意：
	    color 属性的回调函数一般返回的单个颜色，因为 G2 中所有的 shape 仅支持单个颜色
	    color 属性的回调函数也可以返回数组，数组中有多个颜色，但是这时候需要 shape 支持多颜色的解析，详细情况查看 [自定义shape](https://bizcharts.alibaba-inc.com/product/bizcharts/category/7/page/36)。

```js
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
```js
//代码示例
<Geom color='ffffff'/>
```

###  shape
* 类型：  String | Array
* 描述：将数据值映射到图形的形状上的方法。

只支持接收一个参数，指定几何图像对象绘制的形状。下表列出了不同的 geom 几何图形对象支持的 shape 形状：

|geom 类型|	shape 类型|	解释|
|----|----|----|
|point|	'circle', 'hollowCircle', 'rect'	|默认为 'circle'|
|line	|'line', 'smooth', 'dash'	|dash：虚线，smooth： 平滑线|
|area	|'area', 'smooth'	|填充内容的区域图|
|interval	|'rect'	|矩形|
|polygon|	'polygon'	|多边形|
|schema	|'candle'	|目前仅 K 线图|

shape 支持的映射值如下：
- 'field'，将指定的字段映射到内置的 shapes 数组中；
```js
//代码示例
<Geom shape='city'/>
```

- ['field', shapes]，用户自己提供 shapes 数据，来进行数据映射；
```js
//代码示例
<Geom shape={['city', ['circle', 'rect']]} />
```

- ['fields', callback]，使用回调函数获取 shape，用于个性化的 shape 定制，可以根据单个或者多个字段确定；
```js
//代码示例
<Geom
  shape={['city', (city)=>{
    if(city == 'hangzhou'){
	  return 'circle';
	}
	return 'rect';
  }]}
/>

```
- 'shapeType'，指定常量，将所有数据值映射到固定的 shape。
```js
//代码示例
<Geom shape='circle' />
```

###  size
* 类型： String | Array | Number
* 描述：对于不同的几何标记含义不完全一致：

- 对于 point 点来说，size 对应着点的半径；
- 对于 line 线来说，size 对应着线的粗细；
- 对于 interval 柱状图来说，size 对应着柱子的宽度。

size 支持映射值如下：
- 'field'，指定映射到 size 的字段，使用内置的默认大小范围为 [1, 10]；
```js
//代码示例
<Geom size='count'/>
```

- ['field', [ min, max ]]，指定映射到 size 字段外，还提供了 size 的最大值和最小值范围；
```js
//代码示例
<Geom size={['count', [1, 10]]}/>
```

- ['fields', callback)]，使用回调函数映射 size，用于个性化的 size 定制，可以使用多个字段进行映射；
```js
//代码示例
<Geom size={['count', (count)=>{
  if(count > 1000)
    return 10;
  else return 1;
}]}/>
```

- Number，直接指定像素大小。
```js
//代码示例
<Geom size={3}/>
```

###  adjust
* 类型：Object
* 描述：声明几何标记对象的数据调整方式，可用于绘制层叠图、扰动图、分组图等。支持单一的数据调整方式也支持各种数据调整方式的组合。支持的调整类型包括： 'stack', 'dodge'。

```js
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

###  style
* 类型：Object | Array
* 描述：配置几何图形的样式。当 style 的值是 Object 时，该 Object 中只能设置固定样式。当 style 的值是 Array 时，可以通过回调函数根据具体的数据去动态配置样式。

```js
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
