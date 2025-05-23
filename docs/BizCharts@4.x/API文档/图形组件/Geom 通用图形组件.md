# Geom 通用图形组件



几何标记对象，决定创建图表的类型。  
普通使用方式
```js
import { Geom } from 'bizcharts';
```

按需使用的引入方式
```js
import Geom from 'bizcharts/lib/geometry'; // Geom 以type属性切换图形，所以将所有的图形组件都引入。
```

## 几何标记和图表类型
虽然 BizCharts 没有特定的图表类型概念，**但是仍基本支持所有传统图表类型的绘制**。

下表展示了 BizCharts 中的 geom 几何标记类型和传统图表的对应关系，更多的图表详见 BizCharts 官网的 [demo](../../../gallery)。

## API
+ 几何标记类型：type；
+ 数据映射相关的属性：position, color, shape, size；
+ 显示辅助信息的属性：style, tooltip；
+ 额外的控制属性：adjust, select, setSelect, active, hide。

### type 
_<string>_
* 描述：几何标记类型，目前 BizCharts 支持的几何标记类型如下：

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

当然几何标记和数据调整方式的组合不仅仅局限于上述几种，可以通过整合type和adjust来自由创建和组合图表：
```
<Geom
  type="area"
  adjust={['stack', 'symmetric']}
/>
```
> 关于数据调整和几何标记更详细的介绍请阅读 [几何标记和数据调整](https://bizcharts.alibaba-inc.com/product/bizcharts/category/12/page/57)

### adjust 
_<object>_
* 描述：声明几何标记对象的数据调整方式，可用于绘制层叠图、扰动图、分组图等。支持单一的数据调整方式也支持各种数据调整方式的组合。
支持的调整类型包括： 'stack', 'dodge', 'jitter', 'symmetric'。

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
  
  // adjust的type 为 "stack" 时支持的参数
  adjust={{ type:'stack',reverseOrder: false }} // reverseOrder 控制层叠的顺序，默认是 true
/>
```


### position 
_<string>_
* 描述：位置属性的映射；用于确定由数据中的哪几个字段来确定数据在平面坐标系的位置。通俗地解释，即确定 x 轴和 y 轴的数据字段。它是唯一一个可以用于编码分类又可用于编码定序或者定量的数据属性。

```js
<Geom position="x*y" />
<Geom position={['x', 'y']} />
```
使用 `*` 连接，position 属性会对多个字段进行数据的映射，如：cut*price，x*y 等，用于二维坐标系图表的绘制。

以 chart.point().position('x*y') 为例，point 代表图形，即最后需要生成点图，而 position 代表位置，position('x*y') 代表数据在图形中的位置由 x 和 y 这两个维度的变量决定，x * y 的数据处理结果可以理解为：

![image](https://gw.alipayobjects.com/zos/rmsportal/EcuDeyeTOsztVOuxmZPe.png)

(x1, y1) 这样的数值对，最后就会被转换为画布上对应的坐标点。

另外，也可以以数组格式传入：`chart.geom().position([ 'fieldA', 'fieldB' ])`

<span id="color"></span>

### color 
_<string>_ _<array>_
* 描述：将数据值映射到图形的颜色上的方法。

Demo实例效果体验 [Geom Color 线性渐变 类型 Demo](/gist/2eJZ5BMLrBD)
- ![Demo实例](https://img.alicdn.com/tfs/TB1Fe50C4z1gK0jSZSgXXavwpXa-1034-846.png)
- ![Demo实例](https://img.alicdn.com/tfs/TB1UTi1C9f2gK0jSZFPXXXsopXa-515-1048.png)



color 支持的映射值如下：
- *'field'*，field 为数据字段名，内部会使用主题中的默认颜色进行数据值到颜色值的映射；当需要映射多个字段时，通过*进行连接，[demo](https://bizcharts.net/product/bizcharts/demo/292)。

```js
//代码示例
// 单个字段
<Geom color='cut'/>
// 多个字段
<Geom color='type1*type2'/>
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
	    color 属性的回调函数也可以返回数组，数组中有多个颜色，但是这时候需要 shape 支持多颜色的解析，详细情况查看 [自定义shape](36)。

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
<Geom color='#ffffff'/>
```

- color('l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff')，支持线性渐变和放射渐变，具体参见[渐变色](https://bizcharts.net/product/bizcharts/category/7/page/40)


### shape 
_<string>_ _<array>_
* 描述：将数据值映射到图形的形状上的方法。

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

接收一个常量参数，指定几何图像对象绘制的形状。下表列出了不同的 geom 几何图形对象支持的 shape 形状：

| geom 类型 | shape 类型 | 解释 |
| --- | --- | --- |
| point | 'circle','square','bowtie','diamond',<br />'hexagon','triangle','triangle-down','hollowCircle',<br />'hollowSquare','hollowBowtie',<br />'hollowDiamond','hollowHexagon',<br />'hollowTriangle','hollowTriangle-down','cross','tick',<br />'plus','hyphen','line' | hollow 开头的图形都是空心的 |
| line | 'line', 'dot', 'dash', 'smooth',<br /> 'hv', 'vh', 'hvh', 'vhv', 'hv', 'vh', 'hvh', 'vhv' | dot ：点线，smooth： 平滑线，hv、vhv等用于绘制阶梯线图 |
| area | 'area','smooth','line','smooth-line' | [area] 和 [smooth] 是填充内容的区域图，其他图表是空心的线图 |
| interval | 'rect','hollow-rect','line',<br />'tick','funnel', 'pyramid' | [hollow-rect] 是空心的矩形， [line] 和 [tick] 都是线段，'funnel' 漏斗图；'pyramid' 金字塔图 |
| polygon | 'polygon' | polygon：多边形 |
| schema | 'box' | 目前仅支持箱须图、K 线图 |
| edge | 'line','vhv','smooth','arc' | vhv：直角折线，arc：弧线，分为笛卡尔坐标系、极坐标系、带权重和不带权重四种情况。 |

另外 BizCharts 提供了自定义 shape 的功能，用户可以自己绘制需要的 shape，详见[自定义 shape](36)。


### label 
_<string>_ _<array>_
- 描述：配置折线的标注  
- 基础用法
```js
// const data = [ {x: 1, y: 2, z: 'a'}, {x: 2, y: 2, z: 'b'} ]

// 在每个图形上显示 y 字段对应的数值
<Geom position="x*y" label="y" />
```
- 在每个图形上显示 x 字段对应的数值，同时配置文本颜色为红色
```js
<Geom type="line" position="x*y" label={["x", { style: { fill: 'red' } }]} />
```
- 渲染每个图形上显示 x 字段对应的数值，同时格式化文本内容,以及配置条件样式。
```js
<Geom
  type="line"
  position="x*y"
  label={[
    "x",
    (xValue) => {
    return {
        content: xValue + '%',
        style: {
          fill: 'red',
        }
      };
    }
  ]}
/>
```
详细属性配置及自定义label，请看[Label属性及自定义label](/product/BizCharts4/category/61/page/183)

### size 
_<string>_ _<array>_ _<number>_
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


### style 
_<object>_ _<number>_
* 描述：配置几何图形的样式。

当 style 的值是 Object 时，该 Object 中只能设置固定样式。

当 style 的值是 Array 时，可以通过回调函数根据具体的数据去动态配置样式。

style 的更详细的配置项 [绘图属性](/product/BizCharts4/category/61/page/114)
```js
//代码示例
<Geom
  style={{
    lineWidth:1
  }}
  //或者
  style={['sales*city', (sales,city)=>{
  const res = { lineWidth:1 };
  if(city === 'hangzhou' && sales > 1000) res.stroke = "#ff0000";
  else res.stroke = "#00ff00";
  return res;
   }]}
/>
```

### state
_<object>_
设置状态对应的样式，包括default/active/inactive/selected四种状态。

```js
<Geom
  state={{
    active: {
      style: {
	fill: 'red',
	stroke:"orange"
	}
   }
}}
/>
```

### tooltip 
_<string>_ _<boolean>_ _<array>_
* 描述：将数据值映射到 Tooltip 上。
- Boolean 该几何标记是否需要显示 tooltip，默认值 false；
- String 格式为 a * b * c，对应数据源的一个或者多个字段，每个字段将会显示为一行。
- Array 格式为 [a * b * c, callback],该几何标记上 tooltip 需要显示的数据字段,同时可以在 callback 中调整数据的显示格式。

```js
<Geom tooltip={false} /> // boolean
<Geom tooltip="gender*height*weight" /> // string
<Geom
  tooltip={['sales*city', (sales, city)=>{ // array
    return {
          title:'标题',
	  name:'xxx',
	  value:city + ':' + sales
	}
  }]}
/>
```
### animate 
_<boolean>_ _<object>_
* 描述：开启或者关闭动画， 传入object时进行动画配置，详细[配置动画](/product/BizCharts4/category/72/page/115)。