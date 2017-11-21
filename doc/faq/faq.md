
# 常见问题

<span id="ques"></span>

## 有问题怎么办
建议将所有问题相关的教程、api文档及相关的 demo 都看一遍，如果还有问题，欢迎提 issue。
[issue](https://github.com/alibaba/BizCharts/issues)

<span id="axisSpace"></span>

## 坐标轴空间不够
1、通过配置 `<Chart>` 组件的 [padding属性](../api/chart.md#padding) 调整图表的内边距给非图形区更多空间。
2、通过配置 `<Aixs>` 组件中 [content属性](../api/axis.md#content) 上的 formatter 或者 rotate 值，让 label 的文字占用更少的空间。

<span id="customLabel"></span>

## 坐标轴label自定义
通过配置 `<Aixs>` 组件中 [content属性](../api/axis.md#content) 上的 formatter 函数控制。

<span id="tooltipShow"></span>

## tooltip显示
1、通过 `<Geom>` 组件上的 [tooltip 属性](../api/geom.md#tooltip)控制 tooltip 中的显示内容
2、通过 `<Axis>` 组件上的 [itemTpl](../api/axis.md#itemtpl) 和 [containerTpl](../api/axis.md#containertpl) 两个属性用通过 HTML 去控制 tooltip 的显示。
3、特别复杂的场景可以通过 `<Chart>` 上的 [onTooltipChange](../api/chart.md#onTooltipChange)  事件来格式化 `<Tooltip />` 显示内容。

<span id="customTooltip"></span>

## tooltip自定义
通过 `<Axis>` 组件上的 [itemTpl](../api/axis.md#itemTpl) 和 [containerTpl](../api/axis.md#containerTpl) 两个属性用通过 HTML 去控制 tooltip 的显示。
