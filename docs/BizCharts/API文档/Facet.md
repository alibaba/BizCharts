# Facet

分面组件，将一份数据按照某个维度分隔成若干子集，然后创建一个图表的矩阵，将每一个数据子集绘制到图形矩阵的窗格中，所有子图采用相同的图表类型，并进行了一定的设计，使得它们之间方便进行比较。

总结起来，分面其实提供了两个功能：
- 按照指定的维度划分数据集；
- 对图表进行排版。


对于探索型数据分析来说，分面是一个强大有力的工具，能帮你迅速地分析对比出数据各个子集模式的异同。

![e68863a6-f139-444f-a800-75613046dcc4.png](https://gw.alipayobjects.com/zos/rmsportal/HlUJdjfYCEeeOKsBREnp.png)

<span id="shuoming"></span>
## 使用说明
### 父组件
[`<Chart />`](24)

### 子组件
[`<View />`](33)

```js
<Facet>
  <View>
    <Geom />
  </View>
</Facet>
```

## API

> 以下是 `<Facet/>` 组件的通用属性，不同的类型可配置的属性有略微差别，具体见各个类型的分面说明。

### type
_<String>_
* 描述：分面类型，'rect' | 'list' | 'circle' | 'tree' | 'mirror'。

|类型	|说明| 链接|
|  :--  |  :--  | :--|
|rect	|默认类型，指定 2 个维度作为行列，形成图表的矩阵。| [参见rect](#rect) |
|list	|指定一个维度，可以指定一行有几列，超出自动换行。| [参见list](#list) |
|circle	|指定一个维度，沿着圆分布。| [参见circle](#circle) |
|tree	|指定多个维度，每个维度作为树的一级，展开多层图表。| [参见tree](#tree) |
|mirror	|指定一个维度，形成镜像图表。| [参见mirror](#mirror) |
|matrix	|指定 2 个维度，形成矩阵分面图表。| [参见matrix](#matrix) |

### fields
_<String>_ _<Array>_
* 描述：设定数据划分的维度，是数据的字段名，包含多个维度时使用数组传入。不同 `type` 的分面可传入字段个数不同，详见[分面类型说明](#facetType)。

### padding
_<Number>_
* 描述：设置每个 view 之间的间距。`padding` 是view 的内部边距，所以不会影响布局。

<span id="showTitle"></span>
### showTitle
_<Boolean>_
* 描述：是否显示分面的标题，默认为 `true`，即展示。

<span id="autoSetAxis"></span>
### autoSetAxis
_<Boolean>_
* 描述：是否自动设置坐标轴的文本，避免重复和遮挡，默认为 `true`，即自动设置。

<span id="colTitle"></span>
### colTitle
_<Object>_ _<null>_
* 描述：分面列标题设置，可设置属性如下，如果属性值为 `null`，表示不展示列标题。

```js
<Facet
  colTitle={{
    offsetY: -15, // 列标题垂直方向的偏移
    style: {
      fontSize: 14,
      textAlign: 'center',
      fill: '#444'
    } // 标题文本样式
  }}
/>
```

<span id="rowTitle"></span>
### rowTitle
_<Object>_ _<null>_
* 描述：分面行标题设置，可设置属性如下，如果属性值为 `null`，表示不展示列标题

```js
<Facet
  rowTitle={{
  	offsetX: -15,
  	style: {
    	fontSize: 14,
    	textAlign: 'center',
    	fill: '#444'
    }
  }}
/>
```

<span id="eachView"></span>
### eachView
_<Function>_
* 描述：该属性比较特殊，可以直接等于一个函数，或者作为一个返回 View 的匿名函数嵌套在 `<Facet> Function <Facet>` 组件中使用。
* @param  {object} view  视图对象，相当于一个G2的chart对象，可直接使用G2[实例对象](https://g2.antv.vision/zh/docs/api/chart/)的方法
* @param  {object} facet facet中有行列等信息，常见属性：data rows cols rowIndex colIndex rowField colField

```js
<Facet type='matrix' fields = {['cut','clarity']} eachView={(view, facet) => {
  view.point().position('carat*price');
}}／>
```

!注意：`showTitle` 和 `autoSetAxis` 用于控制分面的默认行为；`colTitle` 和 `rowTitle` 是通过 `[chart.guild().text()](https://g2.antv.vision/zh/docs/api/chart/#chartguidetextcfg)` 来实现的，所以所有 `chart.guild().text()` 的参数都生效。

<span id="facetType"></span>

## 分面类型

[tutorial-facet G2详细文档 参考](https://www.yuque.com/antv/g2-docs/tutorial-facet)

<span id="rect"></span>
### rect 矩形分面

rect 矩形分面是 BizCharts 的默认分面类型。支持按照一个或者两个维度的数据划分，按照先列后行的顺序。

```js
<Facet type='rect' fields = {['cut','clarity']}>
  //该匿名函数会转为 `eachView:function` 属性
  {(view, facet)=>{
    view.point().position('carat*price').color('cut');
  }}
</Facet>
```
分面矩阵每列按照 `cut` 字段划分，每行按照 `clarity` 字段划分。
![image](https://cdn.nlark.com/yuque/0/2018/png/100996/1539841212578-0df8809e-9e26-4860-b171-88ecb7b645a7.png)
* 设置 `fields` 字段表示行和列的字段名时，可以设置行或者列为 null,会变成单行或者单列的分面

<span id="list"></span>
### list 水平列表分面

该类型分面可以通过设置 `scale` 属性来指定每行可显示分面的个数，超出时会自动换行。
![image](https://cdn.nlark.com/yuque/0/2018/png/100996/1539841260411-db2c30cd-8de0-4f1a-b6af-3d70ac8f413c.png)

<span id="circle"></span>
### circle 圆形分面

![image](https://cdn.nlark.com/yuque/0/2018/png/100996/1539841293253-3bb3c7c1-7278-4fc2-83fb-019c587ccde9.png)

<span id="tree"></span>
### tree 树形分面
提供了 `line` 和 `lineSmooth` 两个属性，用于配置连接各个分面的线的样式，其中：

- line，用于配置线的显示属性。
- lineSmooth，各个树节点的连接线是否是平滑的曲线，默认为 false。

下图展示了树形多层级的分面。
![](https://cdn.nlark.com/yuque/0/2018/png/100996/1539841321561-6d0b227b-f6d0-41b9-bf6d-54e66f8c5928.png)

<span id="mirror"></span>
### mirror 镜像分面
镜像分面一般用于对比两类数据的场景，例如 男女的比例、正确错误的对比等

通过配置 `transpose` 属性为 true，可以将镜像分面翻转。
![](https://cdn.nlark.com/yuque/0/2018/png/100996/1539841360041-fd9983ef-05ff-4576-99a5-428b0d6cf61a.png)

<span id="matrix"></span>
### matrix 矩阵分面
矩阵分面主要对比数据中多个字段之间的关系，例如常见的散点矩阵图

![](https://cdn.nlark.com/yuque/0/2018/png/100996/1539841390750-797e948c-e603-4f44-a64e-38898989b792.png)
