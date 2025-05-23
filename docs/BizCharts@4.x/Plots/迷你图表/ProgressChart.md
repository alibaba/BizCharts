# ProgressChart

进度条

进度条是 g2plot 图表体系中，迷你图表的一种

## API

说明： _<required>_ 标签代表生成图表的必选配置项，_<optional>_ 标签代表生成图表的可选配置项。

### width

_<required>_, _<number>_

图表宽度

### height

_<required>_, _<number>_

图表高度

### percent

_<required>_, _<number>_

进度百分比，值域为 [0,1]。

### color

_<optional>_,  _<string>_ | _<string[]>_ | _<function>_

设置进度条颜色，该值的类型如下

- string    指定值为单值时，配置进度条已完成分段的颜色
- string[]    指定值为一个数组时，同时配置进度条已完成和未完成分段的颜色，顺序为 [ 已完成，未完成 ]
- function  指定值为一个回调函数时，入参为当前进度 (percent)，出参为一个数组，需要同时指定进度条已完成和未完成分段的颜色，顺序为 [ 已完成，未完成 ]

### size

_<optional>_, _<number>_

设置进度条高度

### progressStyle

_<optional>_, _<object>_ | _<function>_

设置进度条的样式。

`fill: string`  填充颜色<br />
`stroke: string`  描边颜色<br />
`lineWidth: number`  描边宽度<br />
`lineDash: number[]`  描边虚线显示<br />
`opacity: number`  透明度

另外还支持回调函数的配置方式，入参为当前进度 (percent)，出参为一个样式配置对象。

### marker

_<optional>_, _<object[]>_

为进度条添加数值标记，支持同时添加多条标记。

`value: number` 标记数值，取值范围为[0,1]<br />
`style: object` 标记样式，详情见 图形属性

用法：

```js
marker={[
  {
    value: 0.3,
    style: {
      stroke: 'red',
    },
  },
  {
    value: 0.5,
    style: {
      stroke: 'green',
    },
  },
]}
```

### 事件 events

使用说明：
```js
<ProgressChart
    events={{
        onProgressClick: (event) => console.log(event),
        onPlotClick: (event) => console.log(event),
    }}
/>
```

_<optional>_

- 图形事件：

  `onProgressClick: function`  折线点击事件<br />
  `onProgresDblClick: function`    折线双击事件<br />
  `onProgresMousemove: function`  折线鼠标移动事件<br />
  `onProgresContextmenu: function`    折线右键事件<br />

- 图表区域事件：

  `onPlotClick: function`    图表区域点击事件<br />
  `onPlotDblClick: function`  图表区域双击事件<br />
  `onPlotMousemove: function`    图表区域鼠标移动事件<br />
  `onPlotContextmenu: function`    图表区域右键事件

