
# 图表构成

## 组件构成
在 BizCharts 中，图表是由各个组件组合而成的。组件有两种类型，实体组件和抽象组件。
- 实体组件：在图表上有对应的图形、文本显示。
- 抽象组件：没有显示，是一种概念抽象组件。

图表组件有：

| 名称 | 类型 | 说明 |
| :- | :- | :- |
| [Chart](../api/chart.md) | 实体组件 |图表组件，所有的其他组件都必须由 `<Chart>` 包裹。|
| [Coord](../api/coord.md) | 抽象组件 |坐标系组件。用来描述 `<Chart/> <View />` 组件的坐标系，比如笛卡尔坐标系、极坐标系等。|
| [Axis](../api/axis.md) | 实体组件 | 坐标轴组件。通常包含两个坐标轴，在笛卡尔坐标系下，分别为 x 轴和 y 轴，在极坐标轴下，则分别由角度和半径 2 个维度构成。每个坐标轴由坐标轴线（line）、刻度线（tickLine）、刻度文本（label）、标题（title）以及网格线（grid）组成。|
| [Geom](../api/geom.md) | 实体组件|几何标记组件。即我们所说的点、线、面这些几何图形。|
| [Label](../api/label.md) | 实体组件| 几何标记的辅助文本组件。该组件必须作为`<Geom/>` 的孩子。|
| [Tooltip](../api/tooltip.md) |实体组件| 提示框组件。|
| [Guide](../api/guide.md) |实体组件| 辅助标记组件。|
| [Guide.Line](../api/guide.md#line) |实体组件| 辅助标记线组件。该组件处于 Guide 组件命名空间下，且必须作为 ``<Guide />`` 的孩子才会生效。|
| [Guide.Image](../api/guide.md#image) |实体组件| 辅助标记图片组件。该组件处于 Guide 组件命名空间下。且必须作为 ``<Guide />`` 的孩子才会生效|
| [Guide.Text](../api/guide.md#text) |实体组件| 辅助标记文本组件。该组件处于 Guide 组件命名空间下。且必须作为 ``<Guide />`` 的孩子才会生效|
| [Guide.Region](../api/guide.md#region) |实体组件| 辅助标记举行组件。该组件处于 Guide 组件命名空间下。且必须作为 ``<Guide />`` 的孩子才会生效|
| [Guide.Arc](../api/guide.md#arc) |实体组件| 辅助标记弧形组件。该组件处于 Guide 组件命名空间下。且必须作为 ``<Guide />`` 的孩子才会生效|
| [Guide.Html](../api/guide.md#html) |实体组件| 辅助标记html组件。该组件处于 Guide 组件命名空间下。且必须作为 ``<Guide />`` 的孩子才会生效|
| [Facet](../api/facet.md) |抽象组件| 分面组件。|
| [View](../api/view.md) |抽象组件| 视图组件。|


图表插件有:

| 名称 | 类型 | 说明 |
| :- | :- | :- |
| [Slider](https://github.com/alibaba/BizCharts/tree/slider/plugin/slider) | 图标插件 |使用前必须确定已经安装了Bizcarts。|

## 空间构成
下图所示为常用图表的各组件的空间构成。

![7df8bc11-09dc-4d8d-9832-54364f594501.png](https://img.alicdn.com/tfs/TB105z4efDH8KJjy1XcXXcpdXXa-2030-1480.png)
