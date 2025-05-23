# BizCharts 3.x/G2 格式化指南

### 前言

自定义图表过程中，会有大量格式化需求，比如如何自定义数轴，如何格式化Tooltip等。为方便大家检索，给出常见图表格式化方案。

> 注：以BizCharts来演示，API和G2一致，可以互相转换。
> 注：BizCharts版本：v3.4.2 (基于G2 3.4.8)

---

首先，了解一下图表的组成:

![Components of Chart|center](https://zos.alipayobjects.com/skylark/313254aa-ff97-4396-9192-3c0f8fc16867/attach/2378/da07b27fb885206a/image.png)
<div style="text-align: center"><em>图一</em></div>

根据图示，一个图表大致可以分为：Chart容器、Axis数轴、Tooltip提示信息、Legend图例、（Guide辅助信息）。以上这些，G2都开放了接口，因此我们可以非常方便的拿到数据来定义绘制和渲染。下面分别介绍下不同组件的自定义方法。


### 1 Chart

> [Chart API](https://www.yuque.com/antv/g2-docs/api-chart)

#### 1.1 如何调整图表大小或者自适应（width、height、forceFit）

方案：
- width -> 图表宽度 （如果希望图表宽度自适应，设置`forceFit`为`true`，此时width失效）
- height -> 图表高度
- forceFit -> 宽度自适应

```jsx
// 显式制定宽高
<Chart height={400} width={400} />
// 宽度自适应
<Chart height={400} forceFit={true}/>
```

#### 1.2 内容显示不完整

很多时候，我们发现`数轴显示不完整`，`图例被盖住了`等问题，此时你可以选择调整内边距padding，因为图例数轴等部分是渲染在padding区域的（如图2所示）。

![Chart|center](https://gw.alipayobjects.com/zos/rmsportal/PfnvrCQRfuPmJIqfKNkS.png)
<div style="text-align: center"><em>图二</em></div>

方案：
- padding: 和CSS的padding设置类似，支持以下几种方式：
	- padding: [ 20, 30, 20, 30]  `ps: 顺序为[上，右，下，左]`
	- padding: 20
	- padding: { top: 20, right: 30, bottom: 20, left: 30 }
	- padding: 'auto' `ps: padding 中存在 'auto'，时会自动计算边框，目前仅考虑 axis 和 legend 占用的边框`
	- padding: [20, 'auto', 30, 'auto']
	- padding: [ '20%', '30%' ]

#### 1.3 forceFit之后，图表大小并没有自适应

原因：forceFit监听的是`window`的`resize`事件，有时候只是容器大小变化，forceFit无法感知到。
方案：

- 容器发生变更之后手动触发window的resize事件

#### 1.4 scale formatter格式化legend、axis、legend的文本

- scale formatter用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。

> 如果不希望同时生效，请参考下文各个组件格式化的方法

#### 1.5 修改主题

- 调用setTheme

#### 1.6 数据更新了，动画不生效
原因： React生命周期和图表的生命周期导致的问题

方案：
- 通过Chart上的onGetG2Instance获取到chart实例，然后通过命令式的方案调用chart.changeData来实现

### 2 Axis坐标轴

> [Axis API](https://www.yuque.com/antv/g2-docs/tutorial-axes)

![tick](https://gw.alipayobjects.com/zos/rmsportal/XyHrQpWKgHCCbctRzwVT.png)

上图是坐标轴的组成，下面列举几个重要的，其他详细的配置可以参考[Axis API](https://www.yuque.com/antv/g2-docs/tutorial-axes)。

#### 2.1 坐标轴展示不完整

- 参考1.2，修改padding

#### 2.2 修改坐标轴标题

- step 1. 开启Axis的title属性，注：这里的title接收一个对象，`不能指定显示的内容，只能指定显示的样式`。 关键词： axis -> title
- step 2. 在Chart的scale属性中设置对应field的alias。关键词：scale -> alias

```jsx
const scale = {
  height: {
  	alias: '身高'
  }
};

<Chart scale={scale}>
    {/* 隐藏title可以设置title={null} */}
	<Axis title={} />
</Chart>
```

#### 2.3 修改或格式化坐标轴刻度线（tick）

可以修改刻度线的样式、个数以及子刻度线（即主刻度线之间的刻度线）

- 主刻度线样式：tickLine属性。关键词：axis -> tickLine
- 主刻度线个数：`只能在scale上进行列定义`，可以设置min,max同时配合tickCount或者tickInterval，两者不同时生效。注意，如果设置了tickcount你会发现实际的个数不一定和设置的一样，这是为了更好的展示效果，引擎内部做的处理。如果想完全自定义展示的tick,你可以设置ticks。关键词：scale -> tickCount/tickInterval/ticks/min/max
- 子刻度线：subTickCount、subTickLine。关键词：axis -> subTickCount/subTickLine

#### 2.4 修改或格式化坐标轴文本(axis label)

方案：

- 格式化显示内容，可以通过label的formatter中设置。formatter是一个回调函数。 关键词：axis -> label -> formatter
- 高级自定义：支持富文本，各种icon，img等，可以使用htmlTemplate来自定义。关键词： axis -> label -> htmlTemplate
- 另外通过在scale中进行列定义时也可以进行formatter处理，不同的是，scale里的formatter会`同时作用于axis,tooltip,legend`,如果不希望同时生效，可以分别在组件里配置。

### 3 Tooltip提示信息

> [Tooltip API](https://www.yuque.com/antv/g2-docs/tutorial-tooltip)

![tooltip](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/9034/1546930954914-8901c6de-fb05-446f-a7de-61735e861c8e.png) 

#### 3.1 Tooltip展示不完整

- tooltip会跟随鼠标，可以通过设置tooltip和鼠标offset
- 参考1.2，合理设置padding

#### 3.2 如何自定义或格式化Tooltip内容

- 通过 `<Geom />` 上的 tooltip 属性的回调函数来配置，如上图，返回的对象属性可以为：title,name, value, color, index。关键词：geom -> tooltip
- 指定tooltip模板，可以设置containerTpl和itemTpl进行样式设置。tooltip -> containerTpl/itemTpl
- 用html形式来绘制tooltip，设置useHtml为true，然后设置htmlContent来自定义。关键词：tooltip -> useHtml/htmlContent
- 特别复杂的场景可以通过 Chart上的 onTooltipChange 事件来格式化 <Tooltip /> 显示内容
- 和Axis、Legend一起格式化可以选择在scale上进行列定义，关键词：chart -> scale -> formatter

### 4 Legend图例

> [Legend API](https://www.yuque.com/antv/g2-docs/tutorial-legend)

![legend](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/9034/1546932889499-77eda642-a792-4bff-81ec-3a562a873872.png) 

#### 4.1 图例展示不完整

- 参考1.2，修改padding
- 可以适当调整图例的位置，参考4.2

#### 4.2 修改图例位置

- 设置legend的position属性
- 设置legend的offsetX和offsetY

#### 4.3 如何格式化显示内容

- 格式化单项内容，可以设置itemFormatter，支持回调
- 高级自定义：设置useHtml为true，然后分别设置containerTpl和itemTpl
- 列定义scale中对字段进行formatter处理

#### 4.4 图例很长，如何翻页

- 设置useHtml为true，通过css设置legend的高度，设置filpPage为true

#### 4.5 图例很长，如何滚动

- 设置usehtml为true,通过css设置legend的高度，设置css的overflow属性，使其支持滚动

#### 4.6 设置图例初始状态，比如一些选项置灰

- 使用chart filter

### 5 Shape图形

#### 5.1 修改基础图形

是的，shape也是支持自定义的，如果遇到和常规图表不一样的展示形式，你都可以通过自定义shape来完成。具体可以参考G2文档[Shape篇](https://www.yuque.com/antv/g2-docs/api-shape)

#### 5.2 简单调整图形大小

- 调整Geom的size，支持callback


### 欢迎反馈

对于常见问题，会及时更新到目录中，欢迎反馈。

### 参考

- [G2 API文档](https://www.yuque.com/antv/g2-docs/api-g2)
- [BizCharts文档](https://bizcharts.net/products/bizCharts/api/bizcharts)
