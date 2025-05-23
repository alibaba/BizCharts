# Rect



## 组件使用
[两种使用方式](/product/BizCharts4/category/61/page/181#使用方式)

## attrs属性

使用方式
```js
 <Rect attrs={{
          x: 200,
          y: 100,
          width: 300,
          height: 200,
          fill: '#1890FF',
          stroke: '#F04864',
          lineWidth: 4,
          radius: 8,
        }} />
```

### 通用属性
[绘图属性](./169)

### x
_<number>_
起始点 x 坐标。

### y
_<number>_
起始点 y 坐标。

### width
_<number>_
宽度。

### height
_<number>_
高度。

### radius
_<number | array>_
- 圆角，支持整数或数组形式， 分别对应左上、右上、右下、左下角的半径。支持的形式有:
  - `1`: 相当于 [ 1, 1, 1, 1 ]
  - `[ 1 ]`: 相当于 [ 1, 1, 1, 1 ]
  - `[ 1, 2 ]`: 相当于 [ 1, 2, 1, 2 ]
  - `[ 1, 2, 3 ]`: 相当于 [ 1, 2, 3, 2 ]
  - `[ 1, 2, 3, 4 ]`