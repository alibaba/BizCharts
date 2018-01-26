# Chart Type

The core principles of data visualization is visual encoding.And the visual encoding principles consists of geometric shape and visual access. In the data visualization design we will be common * Geometric Shape * defined as chart-type.


According to graphical marks can expresses the data dimension to divide into：
* Zero-dimensional: Points are common zero-dimensional Geometry，it only has position information.
* One-dimensional: Line is a common one-dimensional Geometry.
* Two-dimensional: Like two-dimensional plane.
* Three-dimensional: Common cubes, cylinders are three-dimensional Geometry

![image](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791764763234581d755f/attach/4080/900/image.png)

## Degree of Freedom of The Geometry

[Coord](../api/coord.md) coordinate used to position a mark in a dimensional space, and 
the freedom of graphics space is a dimension that can be expanded freely without changing the nature of graphics. Degrees of Freedom = Space-Dimensional - Geometrical-Dimensional, as that：
* The point has two degree-of-freedom in two-dimensional space, which means it can be expanded along the x-axis and y-axis.
* The line has one degree-of-freedom in two-dimensional space, which means that the line can only increase the width but can not increase the length.
* The surface`s degree-of-freedom in two-dimensional space is zero.Let's take a polygon as an example. We can not increase the width or height of polygons without changing the data representing the polygons.
* But The surface has one degree-of-freedom in three-dimensional space, because we can change the thickness of the surface.

![image](https://zos.alipayobjects.com/rmsportal/UfRqvqQJZGiiwqY.png)

The degree of freedom of geometric labeling is related to the size of the visual channel through which the data can be mapped. From this perspective:
* 点可以映射两个数据字段字段到点的大小上（当然现实中我们仅仅映射一个）
* 线可以映射一个数据字段字段到线的宽度
* 柱状图的矩形可以映射一个数据字段到宽度上
* 封闭的多边形无法使用数据映射到大小

## 图表类型和几何标记

我们根据图形本身的维度和其自由度将几何标记在可视化框架中的实现进行了分类：
* point（点图）,虽然点的自由度是2，但是我们一般只映射一个字段到点的size上，x轴和y轴方向同时扩展大小；
* path(路径图)、line(线图)，x轴方向上无序的的线是path,x轴方向有序的线是线图，线图又分为折线图和曲线图；
* area(区域图)，填充折线和x轴闭合的区域，构建成为区域图，区域图是二维的，其自由度是0，无法进行size的扩展；
* interval(区间图）、常见的柱状图、玫瑰图、饼图都是区间图，其图形是以y轴方向的长度表示数据的大小，x轴方形可以自由扩展，其自由度是1；
* polygon(多边形），多个点构建的封闭的多边形，自由度是0，无法进行size的扩展；
* heatmap（热力图）,热力图使用颜色来代表数据分布，绘制的过程根据数据点在画布上的影响范围进行颜色的设置，其自由度是2，但是我们往往只指定一个常量字段，指定点的影响范围；
* schema （自定义），无法被上面覆盖的几何标记都放到这个分类下，常见的k线图，箱型图，其自由度与其表达的数据相关。

## 图表类型和图形形状

我们说图表类型是几何标记在可视化框架中的一种实现方式，这是一种非常粗粒度的划分，对于每一种图表类型来说，图形在绘制的时候有不同的形状，视觉通道跟图形属性的映射方式不一样也会生成不同的图形：

* 点图，可以使用圆点、三角形、正方形、十字符号等形状表示点
* 线图，可以有折线、曲线、点线等
* 多边形，可以是实心的多边形，也可以是空心的仅有边框的多边形

![image](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791771922383476d17d3/attach/4080/900/image.png)

这就产生了我们在前面提到的视觉通道中Shape（图形形状），图形形状决定了各个视觉通道和图形属性的映射，使用边框颜色还是填充颜色、使用点线还是实线，使用平滑线还是折线，都是由图形形状Shape决定的。

下图是各类型几何标记对应支持的shape：

geom 类型 | shape 类型 | 解释
-------|---------|----
point| 'circle','square','bowtie','diamond','hexagon','triangle','triangle-down',<br>'hollowCircle','hollowSquare','hollowBowtie','hollowDiamond',<br>'hollowHexagon','hollowTriangle','hollowTriangle-down',<br>'cross','tick','plus','hyphen','line'| hollow开头的图形都是空心的
line| 'line','smooth','dot','dash','dotSmooth','spline'| dot ：点线，smooth： 平滑线
area| 'area','smooth','line','dotLine','smoothLine','dotSmoothLine'| [area]和[smooth]是填充内容的区域图，其他图表是空心的线图
interval| 'rect','hollowRect','line','tick','stroke'| [hollowRect]是空心的矩形， [line]和 [tick] 都是线段,stroke：带边框的矩形
polygon|'polygon','hollow','stroke'| polygon：多边形、hollow：空心多边形和 stroke：带边框的多边形
schema| 'box','candle'| 目前仅支持箱须图、K线图

## 如何设计Shape

对于每个Shape的实现，我们需要确定以下内容：

* 支持的视觉通道
* 映射到各个视觉通道的数据格式
* 图形对应的数据条数
* 图形的点的个数

### 支持的视觉通道

不同的Shape支持的视觉通道不同，以G2实现的视觉通道为例：

* position(位置），所有的图表类型的Shape都支持这个属性
* color(颜色）， 所有的图表类型的Shape都支持这个属性，但是映射到图形的边框还是填充图形，由各个Shape自己决定
* size(大小），由上面介绍的几何标记的自由度决定
* opacity(透明度），跟颜色类似

### 接收的数据格式

对于G2来说，接收的数据都是标准的JSON数组，单条数据字段的格式支持2种类型：

* 数值、字符串等标量值
* 数组，多个标量值构成的数组

所以对于一个Shape来说需要定义好各个视觉通道支持的数据字段格式，下面的示例说明这个问题

#### 柱状图

柱状图是图表类型interval的一个Shape ‘rect’定义的，各个视觉通道支持的数据格式：

* position 支持3种数据类型：
   + x，y都是单个标量值，如 {name: '分类一',value: 100}
   + x是单个标量值，y是一个数组 ，如 {name: '分类一',range: [10, 100]}
   + x是数组，y是单个标量值，例如学生成绩分布 {score: [60,70],count: 30}

  ![image](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791772321173794d7553/attach/4080/900/image.png)

* color 仅支持一个标量值字段
* size 仅支持数字标量值
* opacity 支持数字标量值，范围 0-1

各个图形对数据格式的支持，我们在后面章节中一一介绍。

### 需要的数据条数

数据映射到图形时，数据跟图形的对应关系对于不同的图表类型（数据标记）来说各不相同：

* point(点图）， 点图的数据条数和图形的对应关系，可以是1：1,也可以是1:n。如果对应位置的映射字段x,y都是单个标量，那么就是1：1,如果y是数组，那么就是1:n。

  ```js
    // 1: 1的数据
    var data = [{month: '一月', temperature: 10} , {month: '二月', temperature: 15}]
    // 1: 2的数据
    var data = [{month: '一月', temperature: [0,10]} , {month: '二月', temperature: [5,15]}]
  ```
   ![image](
   https://zos.alipayobjects.com/basement/skylark/0ad680ae14791772516552748d17c0/attach/4080/900/image.png)

* line（线图）和path(路径图），如果对应位置的映射字段x,y都是单个标量多条记录对应一条线,对应关系是n:1。如果y是数组，那么会生成多条记录对应关系是 n: n。同上面point的数据：

  ![image](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791772666152763d17c0/attach/4080/900/image.png)

* interval 一条记录生成一个图形，1:1

  ![image](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791772797452741d17cd/attach/4080/900/image.png)

* area(区域图）， 多条数据生成一个图形，无论对应位置的对应字段的格式如何

  ![image](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791772949916082d17d9/attach/4080/900/image.png)

* polygon，一条数据对应一个图形, 1: 1。
* heatmap，多条记录生成一张图 n: 1
* contour, 多条记录生成多条等高线 m: n

### 需要的点的个数

绘制图形时，需要根据当前的数据生成图形的点，然后使用线或者弧连接起来，不同的图形需要点的个数不同:

* point，点图绘制时只需要一个点即可
* line,path，绘制折线图/路径图时需要折线图上的多个点
* area，绘制区域图时，需要代表数据的点与x轴上点
  ![image](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791773113276092d17d9/attach/4080/900/image.png)
* interval,绘制柱状图、玫瑰图、饼图时，需要知道四个顶点
 ![image](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791773251113852d7553/attach/4080/900/image.png)

* polygon，绘制多边形时，每个顶点都需要一个点
* heatmap，绘制热力图时需要多个点

## 如何自定义Shape
在 [Shape 的 api 文档](../api/shape.md)中详细介绍了用户如何自定义几何图形。
