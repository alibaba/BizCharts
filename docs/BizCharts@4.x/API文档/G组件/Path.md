# Path



## 组件使用
[两种使用方式](/product/BizCharts4/category/61/page/181#使用方式)

## attrs属性

使用方式
```js
<Path attrs={{  path: [
            ['M', 100, 100],
            ['L', 200, 200],
] }} />
```

### 通用属性
[绘图属性](./169)

### path
_<string ｜ array>_

- 路径，支持 `字符串`和 `数组` 两种形式，详情可以参考 [SVG path](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths)。
  - 字符串形式: `M 100,100 L 200,200`
  - 数组形式: `[ [ 'M', 100, 100 ], [ 'L', 200, 200 ] ]`
