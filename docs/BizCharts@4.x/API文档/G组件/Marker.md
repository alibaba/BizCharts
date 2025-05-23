# Marker



## 组件使用
[两种使用方式](/product/BizCharts4/category/61/page/181#使用方式)

## attrs属性

使用方式
```js
<Marker attrs={{
          r: 30,
          lineWidth: 2,
          stroke: '#F04864',
          fill: '#92323',
          x: 100,
          y: 100,
          symbol: 'triangle',
        }} />
```

### 通用属性
[绘图属性](./169)

### x
_<number>_
中心点的 x 坐标。

### y
_<number>_
中心点的 y 坐标。

### r
_<number>_
中心点的半径。

### symbol
_<string>_

- 几何图形的类型，目前支持以下 5 种常见的几何图形:
  - `circle`: 圆形
  - `square`: 正方形
  - `diamond`: 菱形
  - `triangle`: 三角形
  - `triangle-down`: 倒三角形