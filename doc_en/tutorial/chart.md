
# Chart Components

## Main Components
In BizCharts, charts are made up of the following components. In total, there are 2 kinds of components, concrete and abstract.
- Concrete Component: Components that will be rendered on the chart, such as text
- Abstract Component: Do not show up visually on the chart but will affect how it renders

The list of components are as follows:

| Name | Component Type | Description |
| :- | :- | :- |
| [Chart](../api/chart.md) | Concrete |Main chart component. All charts need to be wrapped by the `<Chart>` component.|
| [Coord](../api/coord.md) | Abstract | Describes the coordinate system of the chart (i.e. Cartesian, Polar) |
| [Axis](../api/axis.md) | Concrete | Charts typically have x and y axes. However in polar coordinates the axes become angle and radius. Each axis is made up of a line, tickline, label, title and grid. |
| [Geom](../api/geom.md) | Concrete| Base component that can be used to represent dots, lines and other shapes |
| [Label](../api/label.md) | Concrete| Component responsible for rendering text associated with the geometry component. Must be the child of a `<Geometry/>` component. |
| [Tooltip](../api/tooltip.md) |Concrete| Tooltip Component. |
| [Guide](../api/guide.md) |Concrete| Guide Component. Different from labels in that it's not attached to a data point. Can consist of lines, images, text etc |
| [Guide.Line](../api/guide.md#line) |Concrete| Guide Line component. Must be the child of the `<Guide/>` component. |
| [Guide.Image](../api/guide.md#image) |Concrete| Image Guide component. Must be the child of the `<Guide/>` component. |
| [Guide.Text](../api/guide.md#text) |Concrete| Text Guide component. Must be the child of the `<Guide/>` component. |
| [Guide.Region](../api/guide.md#region) |Concrete| Guide Region component. Must be the child of the `<Guide/>` component.|
| [Guide.Arc](../api/guide.md#arc) |Concrete| Arc Guide component. Must be the child of the `<Guide/>` component.|
| [Guide.Html](../api/guide.md#html) |Concrete| Html Guide component. Must be the child of the `<Guide/>` component.|
| [Facet](../api/facet.md) |Abstract| Facet Component |
| [View](../api/view.md) |Abstract| view Component |

## Layout
The following image demonstrates how to build a chart using the above components.

![7df8bc11-09dc-4d8d-9832-54364f594501.png](https://img.alicdn.com/tfs/TB105z4efDH8KJjy1XcXXcpdXXa-2030-1480.png)
