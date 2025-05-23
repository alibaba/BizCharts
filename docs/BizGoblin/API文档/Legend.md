# Legend





图例的生成是由图形语法中的图形属性决定的，我们会根据图形属性映射以及数据的类型自动生成不同类型的图例： color, size 这三个图形属性如果判断接收的参数是数据源的字段时，会自动生成不同的图例：

* color, 会赋予不同的图例项不同的颜色来区分图形
* size, 在图例上显示图形的大小 （**暂未支持**）

## 使用说明

### 父组件
- [`<Chart />`](47)

### 子组件
- none

**BizGoblin 默认情况下，展示图例，当且仅当`<Legend show={false}/>`时图表才隐藏legend**，如下所示：

```js
<Chart width={320} height={240} data={data} defs={defs}>
  <Legend show={false} /> // 关闭图表legend功能
  <Geom type="bar" position="genre*sold" color="genre" />
</Chart>
```

## API

### dataKey
* 类型：String
* 描述：当前图例对应数据源中的字段名
```js
  <Legend dataKey="bar" />
```

###  show
* 类型：boolean
* 描述：不显示所有的图例，或者不显示 dataKey 字段对应的图例，默认值true。
```js
  // 不显示 bar 字段对应的图例
  <Legend dataKey='bar' show={false} />

  // 不显示所有的图例
  <Legend show={false} />
```

### position
* 类型：String
* 描述：设置图例的显示位置，可设置的值为：`top`、`bottom`、`left`、`right`，默认为 `top`。

### align
* 类型：String
* 描述：当 `position` 为 `top`、`bottom` 时生效，用于设置水平方向上图例的对齐方式，可设置的值为： `left`、`center`、`right` ，默认为 `left` ，左对齐。

### verticalAlign
* 类型：String
* 描述： 当 `position` 为 `left`、`right` 时生效，用于设置垂直方向上图例的对齐方式，可设置的值为：`top` `middle` `bottom`，默认为 `middle`，居中对齐。
 
### itemWidth
* 类型：Number | 'auto'
* 描述：用于设置每个图例项的宽度，默认为 'auto'。

### showTitle
* 类型：Boolean
* 描述：是否显示图例标题，默认值为 false，即不展示。

### titleStyle
* 类型：Object
* 描述：图例标题的显示样式设置
```js
titleStyle: {
  textAlign: 'center', // 文本对齐方向，可取值为： start middle end
  fill: '#404040', // 文本的颜色
  fontSize: 12, // 文本大小
  fontWeight: 'bold', // 文本粗细
  textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
}
```

### offsetX
* 类型：Number
* 描述：图例 x 方向的整体偏移值，数值类型，数值单位为 `px`，默认值为 0。

### offsetY
* 类型：Number
* 描述：图例 Y 方向的整体偏移值，数值类型，数值单位为 `px`，默认值为 0。

### titleGap
* 类型：Number
* 描述：标题距离图例项的间距，默认为 12px，如果不展示标题，不生效。

### itemGap
* 类型：Number
* 描述：每个图例项水平方向上的间距，默认值为 12px。

### itemMarginBottom
* 类型：Number
* 描述：每个图例项下方留白间距，默认值为 12px。

### wordSpace
* 类型：Number
* 描述：marker 和文本之间的间距，默认值为 6px。

### unCheckColor
* 类型：String
* 描述：用于取消选中的图例 marker 以及文本的颜色。

### itemFormatter
* 类型：Function
* 描述：回调函数，用于格式化图例每项的文本显示。
```js
  itemFormatter(val) {
    return val; // val 为每个图例项的文本值
  }
```

### marker
* 类型：String | Function | Object
* 描述：用于设置图例的 marker 样式，默认为 circle 即圆形。
1. String 类型
  当为 String 类型时，即表示使用底层踢动的类型，支持类型如下：

    | marker 类型 |  样式  |
    |------------|--------|
    | 'cycle'    | <img src="https://gw.alipayobjects.com/zos/skylark/6d0db90e-1f44-4d4b-a8b3-b93764805f76/2018/png/7ee5f664-b82b-4e28-be69-775b36123da9.png" width="80px">   |
    | 'square'   | <img src="https://gw.alipayobjects.com/zos/skylark/a5cda407-2e21-4cef-a508-0c40b82c7550/2018/png/32a382fb-da6c-4e3c-8f18-f0ec56fc2690.png" width="80px">      |

2. Object 类型
  marker 为 Object 时，可以配置 symbol、radius 以及一些绘图属性。
    ```js
    marker: {
      symbol: 'circle', // marker 的形状
      radius: 5 // 半径大小
    }
    ```
3. Function 类型
  用于自定义 shape，使用方式如下，
    ```js
    /**
    * 自定义 marker 形状
    * @param  {number} x   该 marker 的横轴坐标
    * @param  {number} y   该 marker 的纵轴坐标
    * @param  {number} r   该 marker 的半径大小
    * @param  {object} ctx canvas 的上下文对象
    * @return {null}     
    */
    marker(x, y, r, ctx) {}
    ```
    以下代码绘制了如图所示的 marker：<img src="https://gw.alipayobjects.com/zos/skylark/aa207f9d-fdef-4c23-96e0-f2931907766b/2018/png/da7ec105-ffa9-484e-94dd-285743d42f66.png" width="81">

    ```js
    chart.legend('city', {
      marker(x, y, r, ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = ctx.fillStyle;
        ctx.moveTo(x - r - 3, y);
        ctx.lineTo(x + r + 3, y);
        ctx.stroke();
        ctx.arc(x, y, r - 1, 0, Math.PI * 2, false);
        ctx.fill();
      }
    });
    ```

### nameStyle
* 类型：Object
* 描述：用于设置图例项的文本样式，详见[绘图属性](https://bizcharts.alibaba-inc.com/product/bizcharts/category/7/page/40)。
<img src="https://gw.alipayobjects.com/zos/skylark/519b406c-f6c6-4f6b-adda-7f25a927aa53/2018/png/2ac06b01-85ec-45fa-9c53-aa742108df9e.png" width="118">
```js
nameStyle: {
  textAlign: 'center', // 文本对齐方向，可取值为： start middle end
  fill: '#404040', // 文本的颜色
  fontSize: '12', // 文本大小
  fontWeight: 'bold', // 文本粗细
  textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
}
```

### valueStyle
* 类型：Object
* 描述：用于设置图例项的文本样式，详见[绘图属性](https://bizcharts.alibaba-inc.com/product/bizcharts/category/7/page/40)。
<img src="https://gw.alipayobjects.com/zos/skylark/519b406c-f6c6-4f6b-adda-7f25a927aa53/2018/png/2ac06b01-85ec-45fa-9c53-aa742108df9e.png" width="118">
```js
valueStyle: {
  textAlign: 'center', // 文本对齐方向，可取值为： start middle end
  fill: '#404040', // 文本的颜色
  fontSize: '12', // 文本大小
  fontWeight: 'bold', // 文本粗细
  textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
}
```
### triggerOn
* 类型：String|Function
* 描述：图例筛选行为的触发事件，默认为 `click`。
1. String 类型
  自定义别的事件类型
2. Function 类型
  当不处于 html5 环境时，用于方便用户自己去绑定事件。
    ```js
    /**
    * 用户自己去绑定或者解绑事件
    * @param {Function} method 该事件的处理函数
    * @param {String} type 'bind' 表示绑定 'unbind' 表示解绑
    triggerOn(method, type) {
      // user's code
    }
    ```

### clickable
* 类型：Boolean
* 描述：设置图例项是否允许点击，默认为 true，即允许点击。

### onClick
* 类型：Function
* 描述：用于自定义鼠标点击图例项的交互，当 `clickable` 为 `false` 不生效。
```js
/**
 * 自定义图例项点击事件， clickable 为 false 不生效
 * @param  {object} ev 事件对象
 * @return {null}
 */
onClick: ev => {}
```

### custom
* 类型：Boolean
* 描述：默认为 `false`，当 `custom` 为 `true`，表示不使用默认生成的图例，允许用户自定义图例，包括具体的图例项以及 click 交互。

自定义图例时需要用户自己声明具体的图例项 `items` (该属性是一个对象数组，数组中每一项为一个对象类型，结构为：`{ value: '', marker:{fill: 'red'}}`)以及图例项的 `onClick` 事件。

`marker` 的格式可以为数组或者字符串。
```js
chart.legend({ custom: true, items: [], onClick(){} });
chart.legend('field', { custom: true, items: [], onClick(){} });
```

具体使用如下：
```js
chart.legend('city', {
  custom: true,
  position: 'left',
  items: [
    { value: 'a1', marker: 'triangle', fill: 'red'},
    { value: 'a2', marker: 'triangle', fill: 'blue'},
    { value: 'a3', marker: 'triangle', fill: 'green'}
  ]
});
chart.legend('city', {
  custom: true,
  position: 'left',
  items: [
    { value: 'a1', marker: { symbol: 'triangle', stroke: 'red', radius: 8 }},
    { value: 'a2', marker: { symbol: 'triangle', stroke: 'green', radius: 8 }},
    { value: 'a3', marker: { symbol: 'triangle', stroke: 'blue', radius: 8 }}
  ]
});
chart.legend({
  custom: true,
  position: 'left',
  items: [
    { value: 'a1', marker: 'triangle', fill: 'red'},
    { value: 'a2', marker: 'triangle', fill: 'blue'},
    { value: 'a3', marker: 'triangle', fill: 'green'}
  ]
});
```
