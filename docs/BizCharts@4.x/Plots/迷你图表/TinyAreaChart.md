# TinyAreaChart

迷你面积图

## API

说明： _<required>_ 标签代表生成图表的必选配置项，_<optional>_ 标签代表生成图表的可选配置项。

### width

_<reuired>_, _<number>_

图表宽度

### height

_<reuired>_, _<number>_


图表高度

### data

_<required>_

数据源为对象集合，例如：`[{ segment: 分类一，value: 20 }, { segment: 分类二，value: 20 }]`。

### xField

_<required>_, _<string>_

面积图在 x 方向（横向延伸）对应的数据字段名，一般对应一个连续字段。

### yField

_<required>_, _<string>_

面积图在 y 方向对应的数据字段名，一般对应一个离散字段。

### smooth

_<optional>_, _<boolean>_

面积图是否曲线展示。

### color

_<optional>_, _<string>_ | _<function>_

指定面积图颜色。如不进行配置则采用 theme 中的配色。

### lineStyle

_<optional>_, _<object>_ | _<function>_

指定面积图上部折线的样式。

`lineWidth: number`  折线宽度<br />
`lineDash: number[]`    虚线样式

### guideLine

_<optional>_, _<object[]>_

为图表添加辅助线，可以同时添加多条辅助线。

`type: string`    含有统计意义的辅助线类型，可选类型为  `'max'` | `'min'` | `'median'` |  `'mean'`。如指定了辅助线类型，则不需要配置辅助线的 `start` 和 `end`。

`start: array | function | object`  指定辅助线起始位置，如不配置`type`，则该辅助线为自定义辅助线，`start`是必选项。

支持两种数据形式，两者不能混用：

- 原始数据值，如 ['2010-01-01', 100]
- 绘图区域百分比位置，如 ['50%', '50%']

`end: array | function | object`  指定辅助线终点位置，如不配置`type`，则该辅助线为自定义辅助线，`end`是必选项。

支持两种数据形式，两者不能混用：

- 原始数据值，如 ['2010-01-01', 100]
- 绘图区域百分比位置，如 ['50%', '50%']

`lineStyle: object`    设置辅助线样式。<br />

- `stroke: string`    辅助线颜色<br />
- `lineWidth: number`  辅助线宽度<br />
- `lineDash: number[]`    辅助线虚线显示<br />
- `opacity: number`    辅助线透明度

`text: object`  设置辅助线文本。<br />

- `position: 'start' | 'center' | 'end' | '50%' | 0.5`  设置辅助线文本样式。<br />
- `content: string`    辅助线文本内容。<br />
- `offsetX: number`  辅助线文本位置在 x 方向上的偏移量。<br />
- `offsetY: number`  辅助线文本位置在 y 方向上的偏移量。<br />
- `style: object`    辅助线文本样式。

  - `fontSize: number`    字号<br />
  - `fill: string`    文字颜色<br />
  - `opacity: number`  文字透明度<br />
  - `textAlign: 'start' | 'end' | 'center'`    对齐方式<br />
  - `textBaselin: 'top' | 'bottom' | 'middle'`  文字基线

配置统计辅助线示例代码：

```js

  guideLine={[
    {
      type: 'mean',
      lineStyle: {},
      text: {},
    },
  ]}

```

配置自定义辅助线示例代码：

```js

  guideLine={[
    {
      start: ['2010-01-01', 100] || ['0%', '50%'],
      end: ['2010-01-10', 50] || ['100%', '80%'],
      lineStyle: {},
      text: {},
    },
  ]}

```

### 事件 events

使用说明：
```js
<TinyAreaChart
    events={{
        onAreaClick: (event) => console.log(event),
        onPlotClick: (event) => console.log(event),
    }}
/>
```

_<optional>_

图形事件：

`onAreaClick: function`  面积形状点击事件<br />
`onAreaDblClick: function`    面积形状双击事件<br />
`onAreaMousemove: function`  面积形状鼠标移动事件<br />
`onAreaContextmenu: function`    面积形状右键事件<br />
`onLineClick: function`  折线形状点击事件<br />
`onLineDblClick: function`    折线形状双击事件<br />
`onLineMousemove: function`  折线形状鼠标移动事件<br />
`onLineContextmenu: function`    折线形状右键事件<br />

图表区域事件：

`onPlotClick: function`    图表区域点击事件<br />
`onPlotDblClick: function`  图表区域双击事件<br />
`onPlotMousemove: function`    图表区域鼠标移动事件<br />
`onPlotContextmenu: function`    图表区域右键事件
