
# Facet
分面组件，将一份数据按照某个维度分隔成若干子集，然后创建一个图表的矩阵，将每一个数据子集绘制到图形矩阵的窗格中，所有子图采用相同的图表类型，并进行了一定的设计，使得它们之间方便进行比较。

总结起来，分面其实提供了两个功能：
- 按照指定的维度划分数据集；
- 对图表进行排版。


对于探索型数据分析来说，分面是一个强大有力的工具，能帮你迅速地分析对比出数据各个子集模式的异同。

![e68863a6-f139-444f-a800-75613046dcc4.png](https://gw.alipayobjects.com/zos/rmsportal/HlUJdjfYCEeeOKsBREnp.png)

<span id="shuoming"></span>

## 父组件
[`<Chart />`](chart.md) 

## 子组件
- 3.1.x 版本开始*不支持* `<Facet />`组件下嵌套函数。
正式版将会支持如下写法(3.1.0-beta.1暂不支持)：
```jsx
<Facet>
  <View>
    <Geom />
  </View>
</Facet>
```
- 3.0.x 版本允许 `<Facet />` 组件下嵌套一个返回组件的匿名函数。参见如下
```jsx
<Facet type='matrix' fields = {['cut','clarity']}>
  //该匿名函数会转为 `eachView:function`
  {(view, facet)=>{
    if(facet.colIndex == 0){
	  return
	  <View data={facet.data}>
		<Axis visible={false} name='carat' />
		<Axis  name='price' />
		<Geom type="point" position='carat*price' color='cut' />
	  </View>;
	} else
	{
	return
	  <View data={facet.data}>
	    <Geom type="point" position='carat*price' color='cut' />
	  </View>;
	}
  }}
</Facet>
```

## 属性
>以下是 `<Facet/>` 组件的通用属性，不同的类型可配置的属性有略微差别，具体见各个类型的分面说明。

### 1、type 	* 'rect' | 'list' | 'circle' | 'tree' | 'mirror' *
分面类型。

|类型	|说明| 链接|
|  :--  |  :--  | :--|
|rect	|默认类型，指定 2 个维度作为行列，形成图表的矩阵。| [参见rect](#rect) |
|list	|指定一个维度，可以指定一行有几列，超出自动换行。| [参见list](#list) |
|circle	|指定一个维度，沿着圆分布。| [参见circle](#circle) |
|tree	|指定多个维度，每个维度作为树的一级，展开多层图表。| [参见tree](#tree) |
|mirror	|指定一个维度，形成镜像图表。| [参见mirror](#mirror) |
|matrix	|指定 2 个维度，形成矩阵分面图表。| [参见matrix](#matrix) |

### 2、fields 	* String | Array *
设定数据划分的维度，是数据的字段名，包含多个维度时使用数组传入。不同 `type` 的分面可传入字段个数不同，详见[分面类型说明](#facetType)。

### 3、margin 	* Number *
各个分面之间的距离，同 CSS 盒模型中的 margin。

### 4、padding 	* Number *
每个view 之间的间距。

### 5、showTitle 	* Boolean *
是否显示标题。

### 6、autoSetAxis 	* Boolean *
自动设置坐标轴的文本，避免重复和遮挡。

### 7、colTitle 	* Object *
列标题样式配置。
```jsx
<Facet
  rowTitle={{
	offsetY: -15,
	style: {
	fontSize: 14,
	textAlign: 'center',
	fill: '#444'
  }}
/>
```

### 8、rowTitle 	* Object *
行标题样式配置。
```jsx
<Facet
  rowTitle={{
	offsetX: -15,
	style: {
	fontSize: 14,
	textAlign: 'center',
	fill: '#444'
  }}
/>
```

### 9、eachView 	* Function *
facet 中每个 view 的配置。该属性比较特殊，可以直接等于一个函数，或者作为一个返回 View 的匿名函数嵌套在 `<Facet> Function <Facet>` 组件中使用。
代码如下，也可参见[使用说明](#shuoming)。
```jsx
<Facet type='matrix' fields = {['cut','clarity']} eachView={(view, facet) => {
  view.point().position('carat*price');
}}／>
```

<span id="facetType"></span>
# [分面类型](#facetType)

<span id="rect"></span>
## rect 矩形分面
rect 矩形分面是 BizCharts 的默认分面类型。支持按照一个或者两个维度的数据划分，按照先列后行的顺序。
```jsx
<Facet type='rect' fields = {['cut','clarity']}>
  //该匿名函数会转为 `eachView:function` 属性
  {(view, facet)=>{
    view.point().position('carat*price').color('cut');
  }}
</Facet>
```
分面矩阵每列按照 `cut` 字段划分，每行按照 `clarity` 字段划分。

<span id="list"></span>
## list 水平列表分面
该类型分面可以通过设置 `scale` 属性来指定每行可显示分面的个数，超出时会自动换行。

<span id="circle"></span>
## circle 圆形分面

<span id="tree"></span>
## tree 树形分面
提供了 `line` 和 `lineSmooth` 两个属性，用于配置连接各个分面的线的样式，其中：

- line，用于配置线的显示属性。
- lineSmooth，各个树节点的连接线是否是平滑的曲线，默认为 false。

下图展示了树形多层级的分面。

<span id="mirror"></span>
## mirror 镜像分面
通过配置 `transpose` 属性为 true，可以将镜像分面翻转。

<span id="matrix"></span>
## matrix 矩阵分面
