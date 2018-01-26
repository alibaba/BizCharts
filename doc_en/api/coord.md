
# Coord

Coordination is a 2D location system which combined two location scales together, also descripts how to project the source data to grapgics plane. BizCharts called Coordinate as `<Coord />`, including polar coordinate(polar, theta, hexlix) and cartesian coordinate, all these coordinates are 2D.

## Instructions
- `<Coord />` only can be nested in [`<Chart />`](chart.md) or [`<View />`](view.md), and also child components nested in `<Coord />` is forbidden.

- `<Coord />` descripts the coordinate of rendering all chart elements, there exists only one coordinate in one chart generally. However, in `<View />`, there can exists indivisual coordinate. The default coordinate of each chart is **Rect coordinate**.

- By default BizCharts uses the cartesian coordinate system, you can change the coordinate through setting the [type](#type).

The Stack intrval show as below, in different coordinates show like different chart types.

![image](https://zos.alipayobjects.com/skylark/fd9ba64b-b569-4c1d-acb9-d4dad3500258/attach/2378/44af7b435f0d3f88/image.png)

The left one is stack interval chart, pie chart is transposed with x and y from stack interval, x-axis transposed to radius, and y-axis transposed to angle. In right chart, y-axis is transposed to radius.

- In polar coordinate, the start angle and end angle show as below:
<img src="https://zos.alipayobjects.com/skylark/85950a42-9579-44cb-b656-8dd28c9a014a/attach/2378/d648679184c6977c/image.png" width="214px">

## General Properties

### 1、type 	* String *

Different coordinates support various properties.

BizCharts support several coordinates:

| Type | Instructions |
|  :--  |  :--  |
| [rect](#rect) | rect coordinate is made up by x-axis and y-axis, and only support 2 dimensions. |
| [polar](#polar) | polar coordinate is made up by radius and angle. |
| [theta](#theta) | theta coordinate is one kind of polar coordinate, which has fixed radius. Source data shows through the angle, and always uesd for pie chart. |
| [helix](#helix) | Helix coordinate is based in Archimedes Helix. |

### 2、rotate 	  * Number *

Rotate according to the center of the coordinate.

### 3、scale 	  * Array *

Scale according to the center of the coordinate.

Size of this arrat must be 2, the first argument regarded as the x direction, and the second argument regarded as the y direction.

```jsx
<Coord scale={[0.7, 1.2]} />
```
![image](https://zos.alipayobjects.com/rmsportal/bAISlaEvIUpqIFVBiXKo.gif)

### 4、reflect 	  * 'x' | 'y' *
Reflect the whole coordinate according to the x-direction or y-direction.
![image](https://zos.alipayobjects.com/skylark/3e02d865-fcfc-4afd-9ffa-66a1299b31b5/attach/2378/4225fd7483f54155/image.png)

<span id="rect"></span>
## Rect Coordinate
No more extension parameters.

## Polar Coordinate（polar/theta/clock/gauge）
![5.png](http://alipay-rmsdeploy-image.cn-hangzhou.alipay.aliyun-inc.com/skylark/attach/3597/0cb53952e5516d94/5.png)

### `polar`、`theta` coordinates

| Property | Instructions | Type  | Values | Default Value |
|  :--  |  :--  |  :--  |  :--  |  :--  |
| radius | radius of polar coordinate, range from **0** to **1** | Number |  |  |
| innerRadius | radius of inner polar coordinate, range from **0** to **1** | Number |  |  |
| startAngle | start angle | Number |  |  |
| endAngle | end angle | Number |  |  | |
```jsx
//polar example
<coord type="polar" radius={0.5} startAngle={-Math.PI / 6} endAngle={7 * Math.PI /6}/>
```
<img src="https://gw.alipayobjects.com/zos/rmsportal/YbxpoBRuIrNsaMNOCmcG.png" width="104px">

```jsx
//theta example
<coord type="theta" innerRadius={0.5}/>
```
<img src="https://gw.alipayobjects.com/zos/rmsportal/xQxbzqQTjELOvrKSFEkh.png" width="100px">

### `gauge`

| Property | Instructions | Type  | Values | Default Value |
|  :--  |  :--  |  :--  |  :--  |  :--  |
| startAngle | start angle | Number |  |  |
| endAngle | end angle | Number |  |  | |

### `clock`
No more extension parameters.

```jsx
<Chart width={600} height={400} data={val} scale={cols} padding={100}>
	<Coord type='gauge' startAngle={-9/8 * Math.PI} endAngle={1/8 * Math.PI} />
	<Axis name="value" />
	<Geom type="point" position="value" />
</Chart>
```

## Geographic Coordinate(map)

> Geographic Coordinate support variety kinds of projection.

![](https://os.alipayobjects.com/s/prod/antv/static/images/g2/10-map/world-albers-df1c49630c8e60fdd3cecdbff2705e0f.png)

Different `map` coordinates support various properties, show as below:

> albers projection which suitable for china map

| Property | Instructions | Type  | Values | Default Value |
|  :--  |  :--  |  :--  |  :--  |  :--  |
| projection | projection method  | String | albers |  |
| basic | specified basic parameters for projection, [λ0, φ0, φ1, φ2] were regarded as central longitude, starting latitude, the first standard latitude, the second standard latitude | Array | [110, 0, 25, 47] |  |
| max | specified maximum coord after projection | Array | [16.573, -13.613] |  |
| min | specified maximum coord after projection | Array | [-27.187, -49.739] |  | |

> albers projection which suitable for world map

| Property | Instructions | Type  | Values | Default Value |
|  :--  |  :--  |  :--  |  :--  |  :--  |
| projection | projection method  | String | albers |  |
| basic | specified basic parameters for projection, [λ0, φ0, φ1, φ2] were regarded as central longitude, starting latitude, the first standard latitude, the second standard latitude | Array | [0, 0, 0, 60] |  |
| max | specified maximum coord after projection | Array | [161.89, 120.635] |  |
| min | specified maximum coord after projection | Array | [-144.485, -27.666] |  | |

> mercator projection which suitable for china map

| Property | Instructions | Type  | Values | Default Value |
|  :--  |  :--  |  :--  |  :--  |  :--  |
| projection | projection method  | String | mercator |  |
| max | specified maximum coord after projection | Array | [161.89, 120.635] |  |
| min | specified maximum coord after projection | Array | [-144.485, -27.666] |  | |

> mercator projection which suitable for world map

| Property | Instructions | Type  | Values | Default Value |
|  :--  |  :--  |  :--  |  :--  |  :--  |
| projection | projection method | String | mercator |  |
| max | specified maximum coord after projection | Array | [134.77, 63.68] |  |
| min | specified minimum coord after projection | Array | [73.60, 18.48] |  | |


## Helix Coordinate
> Helix coordiante is always used for periodic source data.

To helix coordinate, the properties show as below:

| Property | Instructions | Type  | Values | Default |
|  :--  |  :--  |  :--  |  :--  |  :--  |
| radius | radius, ranges from **0** to **1** | Number |  |  |
| startAngle | the start angle of helix | Number |  |  |
| endAngle | the end angle of helix | Number |  |  |

```jsx
// example
<Coord type="helix" startAngle={0.5 * Math.PI} endAngle={12.5 * Math.PI} radius={0.8}/>
```
<img src="https://gw.alipayobjects.com/zos/rmsportal/EWHCatHynDfQTPByyfVp.png" width="140px">