# Facet

分面，将一份数据按照某个维度分隔成若干子集，然后创建一个图表的矩阵，将每一个数据子集绘制到图形矩阵的窗格中。

总结起来，分面其实提供了两个功能：

1. 按照指定的维度划分数据集；
1. 对图表进行排版。

对于探索型数据分析来说，分面是一个强大有力的工具，能帮你迅速地分析出数据各个子集模式的异同。

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*jfcgTIqwceMAAAAAAAAAAABkARQnAQ)

## API

### 通用属性

#### type
_<string>_

- 描述： 分面类型，类型列表如下表所示：

| **分面类型** |                       **说明**                        | 链接 |
| :----------: | :---------------------------------------------------: |:--:|
|     rect     | **默认类型**，指定 2 个维度作为行列，形成图表的矩阵。 | [参见rect](#rect)|
|     list     |   指定一个维度，可以指定一行有几列，超出自动换行。    |[参见list](#list)|
|    circle    |              指定一个维度，沿着圆分布。               |[参见circle](#circle)|
|     tree     |  指定多个维度，每个维度作为树的一级，展开多层图表。   |[参见tree](#tree)|
|    mirror    |             指定一个维度，形成镜像图表。              |[参见mirror](#mirror)|
|    matrix    |             指定一个维度，形成矩阵分面。              |[参见matrix](#matrix)|

#### fields
_<string[]>_
- 描述： facet 数据划分维度，设定数据划分的维度，是数据的字段名组成的数组。
```js
<Facet fields = {['cut','clarity']}／>
```

#### eachView
_<function>_
- 描述： 创建每个分面中的视图。
* @param  {object} view  视图对象，相当于一个G2的chart对象，可直接使用G2[实例对象](https://g2.antv.vision/zh/docs/api/chart/)的方法
* @param  {object} facet facet中有行列等信息，常见属性：data rows cols rowIndex colIndex rowField colField

```js
<Facet type='matrix' fields = {['cut','clarity']} eachView={(view, facet) => {
  view.point().position('carat*price');
}}／>
```

#### padding
_<number>_ _<number[]>_ _<'auto'>_
- 描述： 设置每个 view 之间的间距。padding 是view 的内部边距，所以不会影响布局。
```js
<Facet padding={12} />
<Facet padding={[10, 20]} />
<Facet padding={[10, 10, 20, 20]} />
<Facet padding="auto" />
```

#### showTitle
_<boolean>_
- 描述： 是否显示标题

## 分面类型及其特定属性

<span id="rect"></span>
### rect 矩形分面

- 描述： rect 矩形分面是 BizCharts 的默认分面类型。支持按照一个或者两个维度的数据划分，按照先列后行的顺序。

#### columnTitle
_<object>_
- 描述： 行标题的样式。

#### rowTitle
_<object>_
- 描述： 列标题的样式。

```js
<Facet
  type='rect'
  fields={['cut','clarity']}
  columnTitle={{
    offsetX?: number,    /** x 方向偏移。 */
    offsetY?: number,    /** y 方向偏移。 */
    style?: object    /** 文本样式。 */
  }}
  rowTitle={{
    offsetX?: number,    /** x 方向偏移。 */
    offsetY?: number,    /** y 方向偏移。 */
    style?: object    /** 文本样式。 */
  }}
  eachView={(view, facet)=>{
    view.point().position('carat*price').color('cut');
  }}/>
```
分面矩阵每列按照 `cut` 字段划分，每行按照 `clarity` 字段划分。
![image](https://cdn.nlark.com/yuque/0/2018/png/100996/1539841212578-0df8809e-9e26-4860-b171-88ecb7b645a7.png)
* 设置 `fields` 字段表示行和列的字段名时，可以设置行或者列为 null,会变成单行或者单列的分面

<span id="list"></span>
### list 水平列表分面

#### cols
_<number>_
- 描述： 指定每行可显示分面的个数，超出时会自动换行。

#### title
_<object>_
- 描述： 每个分面标题配置。

```js
<Facet
  type='list'
  fields={['cut']}
  cols={3} // 超过3个换行
  title={{
    offsetX?: number,    /** x 方向偏移。 */
    offsetY?: number,    /** y 方向偏移。 */
    style?: object    /** 文本样式。 */
  }}
  eachView={(view, facet)=>{
    view.point().position('carat*price').color('cut').shape('circle').style({ opacity: 0.3 }).size(3);
  }}/>
```

该类型分面可以通过设置 `scale` 属性来指定每行可显示分面的个数，超出时会自动换行。
![image](https://img.alicdn.com/tfs/TB1pcizQpT7gK0jSZFpXXaTkpXa-1456-764.png)

<span id="circle"></span>
### circle 圆形分面

#### title
_<object>_
- 描述： 每个分面标题配置。

```js
<Facet
  type='circle'
  fields={['clarity']}
  title={{
    offsetX?: number,    /** x 方向偏移。 */
    offsetY?: number,    /** y 方向偏移。 */
    style?: object    /** 文本样式。 */
  }}
  eachView={(view, facet)=>{
    view
      .interval()
      .position('cut*mean')
      .color('cut');
  }}/>
```

![image](https://cdn.nlark.com/yuque/0/2018/png/100996/1539841293253-3bb3c7c1-7278-4fc2-83fb-019c587ccde9.png)

<span id="tree"></span>
### tree 树形分面

#### line
_<object>_
- 描述： 用于配置线的显示属性。

#### title
_<object>_
- 描述： 每个分面标题配置。

```js
<Facet
  type='tree'
  fields={['grade', 'class']}
  line={{
     style?: ShapeAttrs,
     smooth?: boolean; // 各个树节点的连接线是否是平滑的曲线
  }}
  title={{
    offsetX?: number,    /** x 方向偏移。 */
    offsetY?: number,    /** y 方向偏移。 */
    style?: object    /** 文本样式。 */
  }}
  eachView={(view, facet)=>{
      view
      .interval()
      .position('percent')
      .color('gender')
      .adjust('stack');
  }}/>
```

下图展示了树形多层级的分面。
![](https://cdn.nlark.com/yuque/0/2018/png/100996/1539841321561-6d0b227b-f6d0-41b9-bf6d-54e66f8c5928.png)

<span id="mirror"></span>
### mirror 镜像分面

#### transpose
_<boolean>_
- 描述： 是否转置。

#### title
_<object>_
- 描述： 每个分面标题配置。

```js
<Facet
  type='mirror'
  padding={[0, 48, 0, 0]}
  fields={['gender']}
  transpose
  title={{
    offsetX?: number,    /** x 方向偏移。 */
    offsetY?: number,    /** y 方向偏移。 */
    style?: object    /** 文本样式。 */
  }}
  eachView={(view, facet)=>{
      view
      .interval()
      .position('age*total_percentage')
      .color('gender', ['#1890ff', '#f04864']);
  }}/>
```


镜像分面一般用于对比两类数据的场景，例如 男女的比例、正确错误的对比等

通过配置 `transpose` 属性为 true，可以将镜像分面翻转。
![](https://cdn.nlark.com/yuque/0/2018/png/100996/1539841360041-fd9983ef-05ff-4576-99a5-428b0d6cf61a.png)

<span id="matrix"></span>
### matrix 矩阵分面

#### columnTitle
_<object>_
- 描述： 行标题的样式。

#### rowTitle
_<object>_
- 描述： 列标题的样式。

```js
<Facet
  type='matrix'
  fields={['SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth']}
  columnTitle={{
    offsetX?: number,    /** x 方向偏移。 */
    offsetY?: number,    /** y 方向偏移。 */
    style?: object    /** 文本样式。 */
  }}
  rowTitle={{
    offsetX?: number,    /** x 方向偏移。 */
    offsetY?: number,    /** y 方向偏移。 */
    style?: object    /** 文本样式。 */
  }}
  eachView={(view, facet)=>{}}/>
```

矩阵分面主要对比数据中多个字段之间的关系，例如常见的散点矩阵图

![](https://cdn.nlark.com/yuque/0/2018/png/100996/1539841390750-797e948c-e603-4f44-a64e-38898989b792.png)
