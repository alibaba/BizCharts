# Coordinate



坐标系组件。
坐标系是将两种位置标度结合在一起组成的 2 维定位系统，描述了数据是如何映射到图形所在的平面。BizCharts 将坐标系抽象为组件，并且包含两种类型坐标系极坐标系（polar、theta、helix 均属于极坐标）和笛卡尔坐标系，目前所有的坐标系均是 2 维的。


## 使用说明
- Coordinate组件用来描述图表中各元素绘制时所处的坐标系，一般一个图表中只存在一个坐标系；但是[`<View />`](33)中可以有独立坐标系存在；若没有特别说明，则默认当前图表的坐标系为**直角坐标系（rect）**。

- 默认采用笛卡尔坐标系，若要改变坐标系可以通过[type](#type)属性改变。

例如下图展示的层叠柱状图，在不同坐标系下就变换成了其他的图表类型：

![image](https://zos.alipayobjects.com/skylark/fd9ba64b-b569-4c1d-acb9-d4dad3500258/attach/2378/44af7b435f0d3f88/image.png)

上图左侧为层叠柱状图，中间的饼图则是层叠柱状图在极坐标下对 x y 两个坐标轴进行转置后的结果，其中 x 轴被映射为半径，y 轴被映射成了角度。而最右边的牛眼图则相反，y 轴映射为半径。

- 极坐标默认的起始角度和结束角度如下图所示：

<img src="https://zos.alipayobjects.com/skylark/85950a42-9579-44cb-b656-8dd28c9a014a/attach/2378/d648679184c6977c/image.png" width="214px">

<span id="API"></span>
## API

<span id="type"></span>
### type
_<String>_
* 描述：坐标系类型;不同类型的坐标系所支持的配置属性也不一样。具体见各类型属性说明。

BizCharts 中支持的坐标系有：

| 类型 | 说明 |
|  :--  |  :--  |
| [rect/cartesian](#rect) | 默认类型，直角坐标系，由 x, y 两个垂直的维度构成。（或cartesian） |
| [polar](#polar) | 极坐标系，由角度和半径 2 个维度构成。|
| [theta](#theta) | 一种半径固定的极坐标系，常用于饼图。 |
| [helix](#helix) | 螺旋坐标系，基于阿基米德螺旋线。|

<span id="rect"></span>
## 直角坐标系（rect/cartesian）
无额外配置参数。

## 极坐标系（polar/theta/helix）
![5.png](https://img.alicdn.com/tfs/TB1nBh1vHSYBuNjSspiXXXNzpXa-1200-280.png)

<span id="polar"></span>
<span id="theta"></span>
### polar、theta 类型的极坐标系配置

| 属性名 | 说明 | 类型  | 可选值 | 默认值 |
|  :--  |  :--  |  :--  |  :--  |  :--  |
| radius | 设置半径，值为 0 至 1 的小数 | Number |  |  |
| innerRadius | 内部极坐标系的半径，[0 - 1]的小数 | Number |  |  |
| startAngle | 起始角度（弧度） | Number |  |  |
| endAngle | 结束角度（弧度） | Number |  |  | |
```js
//polar 示例
<Coordinate
  type="polar"
  radius={0.5}
  startAngle={-Math.PI / 6}
  endAngle={7 * Math.PI /6}
/>
```
效果如图：

<img src="https://gw.alipayobjects.com/zos/rmsportal/YbxpoBRuIrNsaMNOCmcG.png" width="104px">

```js
//theta 示例
<Coordinate type="theta" innerRadius={0.5}/>
```
效果如图：

<img src="https://gw.alipayobjects.com/zos/rmsportal/xQxbzqQTjELOvrKSFEkh.png" width="100px">


<span id="helix"></span>
### helix 螺旋坐标系配置
> 螺旋坐标系，常用于周期性数据。

对于螺旋坐标系，其可配置的参数如下：

| 属性名 | 说明 | 类型  | 可选值 | 默认值 |
|  :--  |  :--  |  :--  |  :--  |  :--  |
| radius | 设置半径，值为 0 至 1 的小数 | Number |  |  |
| startAngle | 螺旋线起点弧度 | Number |  |  |
| endAngle | 螺线线终点弧度 | Number |  |  |

```js
//示例
<Coordinate
  type="helix"
  radius={0.8}
  startAngle={0.5 * Math.PI}
  endAngle={12.5 * Math.PI}
/>
```
效果如图：

<img src="https://gw.alipayobjects.com/zos/rmsportal/EWHCatHynDfQTPByyfVp.png" width="140px">

## 坐标系变换

### rotate 
_<number>_
* 描述：坐标系旋转，angle 表示旋转的度数，单位为弧度。
```js
<Coordinate rotate={-Math.PI * 0.25} />
```
![image](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*kP-KR7FyW4cAAAAAAAAAAABkARQnAQ)

### scale 
_<array>_
* 描述：放大、缩小，默认按照坐标系中心放大、缩小。
参数为长度2的数组，第一个值代表 x 方向缩放比例，第二个值代表 y 方向缩放比例。
```js
<Coordinate scale={[0.7, 1.2]} />
```
![image](https://zos.alipayobjects.com/rmsportal/bAISlaEvIUpqIFVBiXKo.gif)


### reflect 
_<string>_
* 取值：'x' | 'y'
* 描述：镜像, 沿 x 方向镜像或者沿 y 轴方向映射。默认值为：'y'.
```js
<Coordinate reflect="x" />
```

### transpose 
_<boolean>_
* 描述: 将坐标系 x 轴和 y 轴交换.
```js
<Coordinate transpose />
```
![image](https://img.alicdn.com/tfs/TB1yYMVopooBKNjSZPhXXc2CXXa-534-157.png)


### actions 
_<array>_
- 描述：如果坐标系变换是一连串行为。例先x 方向镜像，再旋转一定角度，再由先y方向做镜像。可使用actions串联动作。

``` 
<Coordinate actions={[
  ['reflect', 'x'],
  ['rotate', Math.PI * 0.5], 
  ['reflect', 'y'],
]}/>
```

