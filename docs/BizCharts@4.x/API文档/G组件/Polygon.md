# Polygon



## 组件使用
[两种使用方式](/product/BizCharts4/category/61/page/181#使用方式)

## attrs属性

使用方式
```js
<Polygon attrs={{ points: [
            [200, 100], 
            [400, 100],
            [400 + 200 * Math.sin(Math.PI / 6), 100 + 200 * Math.cos(Math.PI / 6)],
            [400, 100 + 200 * Math.cos(Math.PI / 6) * 2],
            [200, 100 + 200 * Math.cos(Math.PI / 6) * 2],
            [200 - 200 * Math.sin(Math.PI / 6), 100 + 200 * Math.cos(Math.PI / 6)],
 ]}} />
```
### 通用属性
[绘图属性](./169)

### points
_<array>_
形如 [ [ x1, y1 ], [ x2, y2 ], ... ] 的点集合。