# Interaction

图表交互组件

## 内置交互

- tooltip：鼠标在 chart 上移动时显示提示信息
- legend-active：鼠标移动到图例选项时，图例项高亮，对应的图形高亮
- legend-filter：分类图例的勾选
- continuous-filter: 连续图例的过滤


<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*UMsFRZwIDvMAAAAAAAAAAABkARQnAQ" style="width: 339px;">
<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*fjkTR70h9YAAAAAAAAAAAABkARQnAQ" style="width: 339px;">
<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*qKwJTbpJLyUAAAAAAAAAAABkARQnAQ" style="width: 339px;">
<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*pe97RKJM_XAAAAAAAAAAAABkARQnAQ" style="width: 339px;">

可以通过 Chart 上的配置项 defaultInteractions 更改内置的交互
```js
 <Chart
  scale={scale}
  height={500}
  data={source}
  autoFit
  defaultInteractions={['tooltip']} // 仅保留 tooltip
>
</Chart>
```

## 配置交互

### 添加交互
- 在Chart组件上添加[交互属性](77#interactions)
- 使用Interaction组件添加交互
  ```js
    <Interaction type="active-region"/>
  ```
- chart.interaction(name, [cfg]) 

### 移除交互
- chart.removeInteraction(name) 移除交互
```js
<Effects>
  {
    chart => chart.removeInteraction('legend-active')
  }
</Effects>


## API

### type
_<string>_

- 描述： 交互名称，所有的交互名称列表如下表。

| 交互名称 | 说明 | 效果 |
| --- | --- | --- |
| active-region | 鼠标在画布上移动时对应位置的分类出现背景框 | <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*aSJMTYFmTvUAAAAAAAAAAABkARQnAQ" style="width: 339px;"> |
| view-zoom |鼠标滚动时，图表内部缩放 | <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*EqXmQJENnpQAAAAAAAAAAABkARQnAQ" style="width: 339px"/>|
| element-active | 鼠标移入图表元素（柱状图的柱子、点图的点等）时触发 active|<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*qAjhQ5jwuOYAAAAAAAAAAABkARQnAQ" style="width: 339px;">|
| element-selected | 点击选中图表元素、再次点击取消，允许多选 | <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*yRjfQaYtF-0AAAAAAAAAAABkARQnAQ" style="width: 339px;"> |
| element-single-selected | 单选图表元素，下次点击允许取消 | <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*DDoLT5_cCTQAAAAAAAAAAABkARQnAQ" style="width: 339px;"> |
| element-highlight | 图表元素的高亮，是一部分图表元素高亮，另一部分变暗 | <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*wr2XTJmoHfkAAAAAAAAAAABkARQnAQ" style="width: 339px;">|
| element-highlight-by-x | 高亮 x 值相同的 element，适用于分组的场景 | <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*7eKNRrht53EAAAAAAAAAAABkARQnAQ" style="width: 339px;"> |
| element-highlight-by-color | 高亮所有同颜色的 element，适用于层叠的场景 | <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*SbLVQpbiiKsAAAAAAAAAAABkARQnAQ" style="width: 339px;" /><img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*Hv3yTJ7QD5kAAAAAAAAAAABkARQnAQ" style="width: 339px;"/> |
| legend-filter | 分类图例的数据过滤 | <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*6RfZTr4ytVYAAAAAAAAAAABkARQnAQ" style="width: 339px;"> |
| legend-visible-filter | 分类图例的图形过滤，点击图例对应的图形隐藏/显示，这个交互不会引起坐标轴的变化 <br/>(注意：由于内置了 legend-filter 交互，所以使用该交互时移[除掉 legend-filter 交互](112#内置交互)) | <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*QH0LR42VJiYAAAAAAAAAAABkARQnAQ" style="width: 339px;"/>|
| continuous-filter | 连续图例的数据过滤，数据过滤会导致坐标轴的变化 | <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*FUwdSJGCL-oAAAAAAAAAAABkARQnAQ" style="width: 339px;"> |
| continuous-visible-filter | 仅仅过滤图形，而不引起坐标轴的变化 <br/>(注意：由于内置了 continuous-filter 交互，所以使用该交互时移[除掉  continuous-filter  交互](112#内置交互) )| <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*SC02SJHZ_BYAAAAAAAAAAABkARQnAQ" style="width: 339px;"/>|
| legend-active | 图例项 active，对应的图表元素也 active | <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*D1VMTYFFPTcAAAAAAAAAAABkARQnAQ" style="width: 339px;"> |
| legend-highlight | 图例项高亮，对应的图表元素也高亮 | <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*k_HTQa-iszoAAAAAAAAAAABkARQnAQ" style="width: 339px;"> |
| axis-label-highlight | 坐标轴文本高亮，对应的图表元素也高亮 | <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*_JebQZWT-40AAAAAAAAAAABkARQnAQ" style="width: 339px;">|
| element-list-highlight | 鼠标触发图表元素高亮，同时对应的列表组件（图例、坐标轴文本）都高亮 | <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*7MrDT5qjPAgAAAAAAAAAAABkARQnAQ" style="width: 339px;"> |
| brush | 框选过滤图形 | <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*tKSkR6peM2MAAAAAAAAAAABkARQnAQ" style="width: 339px;"> |
| brush-x | 把上面 brush Action 换成 brush-x 即成为新的交互，仅框选 x 轴相关的数据 |  |
| brush-y | 把上面 brush Action 换成 brush-y 即成为新的交互，仅框选 y 轴相关的数据 |  |
| brush-visible | 框选过滤时仅仅是过滤图形，而不是过滤数据|  |

### config
_<object>_

- 描述： 交互配置项，用于修改交互动作。
```js
  <Interaction
    type="tooltip"
    config={{ // 修改了原有的tooltip交互，改为点击时展示。
      start: [{ trigger: 'plot:click', action: 'tooltip:show' }],
    }}
  />
```
在交互语法中一个交互可以由多个交互环节组成，每个交互环节可以有多个触发和反馈，所以在配置交互时可以配置每个环节，每个环节都是数组，都有 trigger 和 action

#### 交互环节：
- showEnable：标识交互可以发生
- start: 交互开始
- processing: 交互持续
- end: 交互结束
- rollback: 回滚


#### 交互环节配置项：
- trigger 触发一个交互环节的事件名，是所有 Chart 支持的事件
- action 触发的反馈，可以是字符串也可以是数组，是所有内置和用户自定义的 Action。
  - 字符串由 ’actionName:method‘ 组成
  - 列表时可以使用相同的 action ，也可以使用不同的 action ，例如: ['element-active:clear', 'element-active:active', 'mask:clear']

**除了 trigger 和 action 之外还有其他几个可选属性：**

- isEnable(context): 是否可以触发
- callback(context): 触发后执行完所有 action 的方法后会调用回调函数
- once: boolean， 是否在一个环节内仅能执行一次
- debounce: 延迟执行，有两个参数：
  - wait: 等待时间
  - immediate: 是否马上执行
- throttle 增加阈值，控制执行的频率
  - wait: 等待时间
  - leading: 是否马上执行
  - trailing: 执行完毕后再执行一次
    debounce 和 throttle 的机制参考：https://css-tricks.com/debouncing-throttling-explained-examples/

