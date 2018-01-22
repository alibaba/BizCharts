
# Coord

坐标系组件。
坐标系是将两种位置标度结合在一起组成的 2 维定位系统，描述了数据是如何映射到图形所在的平面。BizCharts 将坐标系抽象为组件，并且包含两种类型坐标系极坐标系（polar、theta、helix 均属于极坐标）和笛卡尔坐标系，目前所有的坐标系均是 2 维的。

## 使用说明
- `<Coord />` 坐标系组件只可以作为 [`<Chart />`](chart.md) 组件 或者 [`<View />`](view.md) 组件的孩子，同时 <Coord /> 组件下不能嵌套其他图表组件。

- Coord组件用来描述图表中各元素绘制时所处的坐标系，一般一个图表中只存在一个坐标系；但是[`<View />`](view.md)中可以有独立坐标系存在；若没有特别说明，则默认当前图表的坐标系为**直角坐标系（rect）**。

- 默认采用笛卡尔坐标系，若要改变坐标系可以通过[type](#type)属性改变。

例如下图展示的层叠柱状图，在不同坐标系下就变换成了其他的图表类型：

![image](https://zos.alipayobjects.com/skylark/fd9ba64b-b569-4c1d-acb9-d4dad3500258/attach/2378/44af7b435f0d3f88/image.png)

上图左侧为层叠柱状图，中间的饼图则是层叠柱状图在极坐标下对 x y 两个坐标轴进行转置后的结果，其中 x 轴被映射为半径，y 轴被映射成了角度。而最右边的牛眼图则相反，y 轴映射为半径。

- 极坐标默认的起始角度和结束角度如下图所示：
<img src="https://zos.alipayobjects.com/skylark/85950a42-9579-44cb-b656-8dd28c9a014a/attach/2378/d648679184c6977c/image.png" width="214px">

## 通用属性
<span id="type"></span>
### 1、type 	* String *
坐标系类型;不同类型的坐标系所支持的配置属性也不一样。具体见各类型属性说明。

BizCharts 中支持的坐标系有：

| 类型 | 说明 |
|  :--  |  :--  |
| [rect](#rect) | 直角坐标系；目前仅支持二维，由 x, y 两个互相垂直的坐标轴构成。|
| [polar](#polar) | 极坐标系；由角度和半径 2 个维度构成。|
| [theta](#theta) | 一种特殊的极坐标系，半径长度固定，仅仅将数据映射到角度，常用于饼图的绘制。|
| [helix](#helix) | 螺旋坐标系，基于阿基米德螺旋线。|

### 2、rotate 	  * Number *
旋转，默认按照坐标系中心旋转。

### 3、scale 	  * Array *
放大、缩小，默认按照坐标系中心放大、缩小。
Array:数据长度必须为2，第一个值代表 x 方向缩放比例，第二个值代表 y 方向缩放比例。
```jsx
<Coord scale={[0.7, 1.2]} />
```
![image](https://zos.alipayobjects.com/rmsportal/bAISlaEvIUpqIFVBiXKo.gif)

### 4、reflect 	  * 'x' | 'y' *
镜像, 沿 x 方向镜像或者沿 y 轴方向映射。
![image](https://zos.alipayobjects.com/skylark/3e02d865-fcfc-4afd-9ffa-66a1299b31b5/attach/2378/4225fd7483f54155/image.png)

<span id="rect"></span>
## 直角坐标系（rect）
无额外配置参数。

## 极坐标系（polar/theta/clock/gauge）
![5.png](http://alipay-rmsdeploy-image.cn-hangzhou.alipay.aliyun-inc.com/skylark/attach/3597/0cb53952e5516d94/5.png)

<span id="polar"></span>
<span id="theta"></span>
### `polar`、`theta`类型的极坐标系，其可配置的参数如下：

| 属性名 | 说明 | 类型  | 可选值 | 默认值 |
|  :--  |  :--  |  :--  |  :--  |  :--  |
| radius | 设置半径，值为 0 至 1 的小数 | Number |  |  |
| innerRadius | 内部极坐标系的半径，[0 - 1]的小数 | Number |  |  |
| startAngle | 起始角度（弧度） | Number |  |  |
| endAngle | 结束角度（弧度） | Number |  |  | |
```jsx
//polar 示例
<coord type="polar" radius={0.5} startAngle={-Math.PI / 6} endAngle={7 * Math.PI /6}/>
```
效果如图：
<img src="https://gw.alipayobjects.com/zos/rmsportal/YbxpoBRuIrNsaMNOCmcG.png" width="104px">

```jsx
//theta 示例
<coord type="theta" innerRadius={0.5}/>
```
效果如图：
<img src="https://gw.alipayobjects.com/zos/rmsportal/xQxbzqQTjELOvrKSFEkh.png" width="100px">

<span id="gauge"></span>
### `gauge`

| 属性名 | 说明 | 类型  | 可选值 | 默认值 |
|  :--  |  :--  |  :--  |  :--  |  :--  |
| startAngle | 起始角度（弧度） | Number |  |  |
| endAngle | 结束角度（弧度） | Number |  |  | |

<span id="clock"></span>
### `clock`
无额外配置属性。

```jsx
// 这里只显示部分核心代码
<Chart width={600} height={400} data={val} scale={cols} padding={100}>
	<Coord type='gauge' startAngle={-9/8 * Math.PI} endAngle={1/8 * Math.PI} />
	<Axis name="value" />
	<Geom type="point" position="value" />
</Chart>
```

<span id="map"></span>
## 地理坐标系（map）

> 地理坐标系，支持不同类型的地理投影。

![](https://os.alipayobjects.com/s/prod/antv/static/images/g2/10-map/world-albers-df1c49630c8e60fdd3cecdbff2705e0f.png)

对于 `map` 类型的坐标系，情况比较特殊，对于不同的投影支持的可配置属性不同。如下所示：

> 适用于中国地图的 albers 投影

| 属性名 | 说明 | 类型  | 可选值 | 默认值 |
|  :--  |  :--  |  :--  |  :--  |  :--  |
| projection | 指定投影方法 | String | albers |  |
| basic | 指定投影方法的基本参数，[λ0, φ0, φ1, φ2] 分别表示中央经度、坐标起始纬度、第一标准纬度、第二标准纬度度 | Array | [110, 0, 25, 47] |  |
| max | 指定投影后最大的坐标点 | Array | [16.573, -13.613] |  |
| min | 指定投影后最小的坐标点 | Array | [-27.187, -49.739] |  | |

> 适用于世界地图的 albers 投影

| 属性名 | 说明 | 类型  | 可选值 | 默认值 |
|  :--  |  :--  |  :--  |  :--  |  :--  |
| projection | 指定投影方法 | String | albers |  |
| basic | 指定投影方法的基本参数，[λ0, φ0, φ1, φ2] 分别表示中央经度、坐标起始纬度、第一标准纬度、第二标准纬度度 | Array | [0, 0, 0, 60] |  |
| max | 指定投影后最大的坐标点 | Array | [161.89, 120.635] |  |
| min | 指定投影后最小的坐标点 | Array | [-144.485, -27.666] |  | |

> 适用与中国地图的 mercator 投影

| 属性名 | 说明 | 类型  | 可选值 | 默认值 |
|  :--  |  :--  |  :--  |  :--  |  :--  |
| projection | 指定投影方法 | String | mercator |  |
| max | 指定投影后最大的坐标点 | Array | [161.89, 120.635] |  |
| min | 指定投影后最小的坐标点 | Array | [-144.485, -27.666] |  | |

> 适用于世界地图的 mercator 投影

| 属性名 | 说明 | 类型  | 可选值 | 默认值 |
|  :--  |  :--  |  :--  |  :--  |  :--  |
| projection | 指定投影方法 | String | mercator |  |
| max | 指定投影后最大的坐标点 | Array | [134.77, 63.68] |  |
| min | 指定投影后最小的坐标点 | Array | [73.60, 18.48] |  | |


<span id="helix"></span>
## 螺旋坐标系（helix）
> 螺旋坐标系，常用于周期性数据。

对于螺旋坐标系，其可配置的参数如下：

| 属性名 | 说明 | 类型  | 可选值 | 默认值 |
|  :--  |  :--  |  :--  |  :--  |  :--  |
| radius | 设置半径，值为 0 至 1 的小数 | Number |  |  |
| startAngle | 螺旋线起点弧度 | Number |  |  |
| endAngle | 螺线线终点弧度 | Number |  |  |

```jsx
//示例
<Coord type="helix" startAngle={0.5 * Math.PI} endAngle={12.5 * Math.PI} radius={0.8}/>
```
效果如图：
<img src="https://gw.alipayobjects.com/zos/rmsportal/EWHCatHynDfQTPByyfVp.png" width="140px">