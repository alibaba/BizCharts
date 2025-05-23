# Canvas



G组件的最外层必要组件，控制整个图表组件的渲染方式和画布容器大小。

## 使用方法
解构使用
```js
import { GComponents } from 'bizcharts';
const { Canvas, Ellipse, Rect } = GComponents;
...
<Canvas width={800} height={400} renderer="canvas">
...
</Canvas>
```
也可按需使用
```js
import Canvas from "bizcharts/g-components/Canvas";
...
<Canvas width={800} height={400} renderer="canvas">
...
</Canvas>
```


## API

### renderer 
_<string>_

可选择当前使用的渲染引擎，根据选择绘制不同的渲染组件，可选值为 'canvas' | 'svg'，默认选择canvas。

### width
_<number>_

宽度

### height
_<number>_

高度

### container
_<string | HTMLElement>_

画布容器,可以是容器 id 或者 DOM 元素

### cursor
_<Cursor>_
画布的 cursor 样式，其中 `Cursor` 为样式类型，可参考 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor)。