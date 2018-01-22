
# BizCharts
The global BizCharts namespace contain:

## 1、Component

### Chart
All BizCharts components should be added into Chart component, such as `<Axis> <Coord> ...`.
It controls the creation update and destruction of the chart.
Detail: [Chart api](chart.md)

### Coord
Coordinate component.
It was used to control Chart or View 's coordinate。
Detail: [Coord api](coord.md)

### Aixs
Coordinate's axis component.
It was uesed to control Chart or View 's coordinate axis。
Detail: [Axis api](axis.md)

### Geom
Geometry mark, the Geom and Coord are determines the type of chart.
Detail: [Geom api](geom.md)。

### Label
Geometry mark's Label Component.
Detail: [Label api](label.md)

### Legend
Legend Component.
Detail: [Legend api](legend.md)

### Guide
A container component to control chart's guids(Guide.Text Guide.Line ...) update.
Detail: [Guide api](guide.md)

### Facet
Facet component。
Detail: [Facet api](facet.md)

### View
View Component.
Defailt: [View api](view.md)

## 2、G2
The G2 namespace.
Detail: [G2](//antv.alipay.com/zh-cn/g2/3.x/index.html)

## 3、Animate
It's used to register custom animation.
Detail: [动画教程](../tutorial/animate.md)。

## 4、Shape
Chart's shapes, it's uesed to register custom shape.
Detail [Shape api](shape.md)。

## 5、setTheme
It's used to change theme.
Defail [theme tutorial](../tutorial/theme.md)。

## 6、track
It's used to monitor the usage of G2 version by G2, If you dont's want use to know it please set false.
```js
BizCharts.track(false);
```

## 7、PathUtil
From G2, it's used to 
来自 G2，some apis to manipulate graphic paths。

| 方法 | 参数说明 | 返回结果 |
| ---- | ---- | ---- |
| `getBoundingClientRect(node)` | `node`:HTMLElement，dom element | return the element's position in page. Data format: `{top: , bottom: , left: , right}` |
| `getStyle(dom, name)` | `dom`:HTMLElement，DOM element；`name`:String, style name | return the element's name style value. |
| `modifyCSS(dom, css)` | `dom`:HTMLElement，DOM element; `css`:Object，style | change the element's css style, then return the final style after changed。 |
| `createDom(str)` | `str`:String，Dom string | Create an dom element and return it. |
| `getRatio()` | -- | returns the screen pixel resolution。 |
| `getWidth(el)` | `el`:HTMLElement，dom element| return dom element's width, not contain padding border |
| `getHeight(el)` | `e`l:HTMLElement，dom element| return dom element's height, not contain padding border |
| `getOuterWidth(el)` | `el`:HTMLElement，dom element| return dom element's width, contain padding border |
| `getOuterHeight(el)` | `el`:HTMLElement，dom element| return dom element's height, contain padding border |
| `addEventListener(target, eventType, callback)` | `target`:HTMLElement，DOM element；`eventType`:String, event name；`callback`:Function | Add event listener. |
| `requestAnimationFrame(fn)` | `fn`:Function, callback function  | 。

## 8、Util
Util function, most come from lodash。
```js
// example
const Util = {
  each: require('lodash/each'),
  map: require('lodash/map'),
  isObject: require('lodash/isObject'),
  isNumber: require('lodash/isNumber'),
  isString: require('lodash/isString'),
  isFunction: require('lodash/isFunction'),
  ...
};
```

