# Coord





两种位置标度结合在一起组成的坐标轴配置，将Coord抽离为一个单独的组件，并且包含两种类型坐标系极坐标系和笛卡尔坐标系。

## 使用说明
### 父组件
- [`<Chart />`](47)

### 子组件
- none

### 注意事项

- 默认采用笛卡尔坐标系，若要改变坐标系可以通过 `type` 属性改变。
- 极坐标默认的起始角度和结束角度如下图所示：

<img src="https://zos.alipayobjects.com/skylark/85950a42-9579-44cb-b656-8dd28c9a014a/attach/2378/d648679184c6977c/image.png" width="214px">

## API

###  type
* 类型：String
* 描述：坐标系类型，不同类型的坐标系所支持的配置属性也不一样。可设置的值为 `rect` , `polar‘` 。默认 `rect` 直角坐标系。

###  transposed
* 类型：Boolean
* 描述：坐标系是否发生转置，`true` 表示发生了转置。默认 `false`。

###  radius
* 类型：Number
* 描述：极坐标的前提下，设置圆的半径，相对值，0 至 1 范围。

###  innerRadius
* 类型：Number
* 描述：极坐标的前提下， 绘制环图时，设置内部空心半径，相对值，0 至 1 范围。

###  startAngle
* 类型：Number
* 描述：极坐标的起始角度，弧度制。

###  endAngle
* 类型：Number
* 描述：极坐标的结束角度，弧度制。
