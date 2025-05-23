# Chart

图表的组件，内部生成了一个 G2 chart 实例，同时控制着其他子组件的加载和更新。

## 子组件
- [`<Coord />`](25)
- [`<Axis />`](26)
- [`<Geom />`](27)
- [`<Legend />`](29)
- [`<Tooltip />`](30)
- [`<Guide />`](31)
- [`<Facet />`](32)
- [`<View />`](33)

[在线 Demo](/product/bizcharts/demo/63)

```js

<Chart height={400} data={dv} scale={scale} forceFit>
  <span className='main-title' style={styles.mainTitle}>
    阿里销售业绩
  </span>
  <span className='sub-title' style={styles.subTitle}>
    2018年每月新零售门店销量
  </span>
  <Axis name="month" />
  <Axis name="sold" label={{ formatter: val => `${val}°C` }} />
  <Tooltip crosshairs={{ type: 'y' }} />
  <Geom type="line" position="month*sold" size={2} color={'city'} />
  <Geom
    type="point"
    position="month*sold"
    size={4}
    shape={'circle'}
    color={'city'}
    style={{ stroke: '#fff', lineWidth: 1 }}
  />
</Chart>
```

[所有Demo](https://bizcharts.alibaba-inc.com/product/bizcharts/gallery)

## 父组件
Any monted node

## 显示标题
使用React的JSX语法写法，使用普通的html即可；

[查看显示标题Demo](/product/BizCharts/demo/261)

![图表显示标题](https://img.alicdn.com/tfs/TB1TNHgxEY1gK0jSZFMXXaWcVXa-757-470.png)

## 图表布局
![e9d103b3-1707-446e-b5fe-b535f7048c8b.png](https://img.alicdn.com/tfs/TB1G7_0bOqAXuNjy1XdXXaYcVXa-1148-542.png)

**有时候坐标轴、图例等绘图区域外的组件显示不全时，可以通过调整图表各个方向的 padding 来调整最终效果。**


<span id="API"></span>

## API

### renderer 
_<string>_
* 描述：指定图表的渲染方式，自BizCharts 3.2.1-beta.2版本开始，支持 chart 级别使用 svg 渲染。
* 默认值: canvas,可选值 svg.

> 使用方式1:
指定当前所有图表都用 svg 渲染。

```js
const { G2 } from 'bizcharts';

G2.Global.renderer = 'svg' // or 'canvas';
```

> 使用方式2:
指定这一个图表使用 svg 渲染。

```js
<Chart renderer='svg' width={600} height={400} data={data} scale={scale} forceFit/>
```

svg、canvas 渲染更多说明[请点击](//www.yuque.com/antv/g2-docs/tutorial-renderers)


<span id="forceFit"></span>
### forceFit 
_<boolean>_
* 描述：图表的宽度自适应开关，默认为 false，设置为 true 时表示自动取 dom（实例容器）的宽度。

> bizcharts 图表只提供自适应父容器宽度的功能，不能自适应高度。


### width 
_<number>_
* 描述：指定图表的宽度，默认单位为 'px'，当 *forceFit: true* 时宽度配置不生效。


### height 
_<number>_ _<require>_
* 描述：指定图表的高度，单位为 'px'。

> 宽和高未指定时，默认为 500px


<span id="data"></span>

### data 
_<array>_ _<DataSet>_
* 描述：设置图表的数据源，`data` 是一个包含 JSON 对象的数组或者 DataSet.View 对象。

建议使用 chart.source(data) 设置数据源。具体参见 [数据](37)。


<span id="scale"></span>

### scale 
_<object>_
* 描述：配置数据比例尺，该配置会影响数据在图表中的展示方式。

```js
const scale = {
  'sales': {
    type: 'identity' | 'linear' | 'cat' | 'time' | 'timeCat' | 'log' | 'pow', // 指定数据类型
    alias: string, // 数据字段的别名，会影响到轴的标题内容
    formatter: () => {}, // 格式化文本内容，会影响到轴的label格式
    range: array, // 输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
    tickCount: number, // 设置坐标轴上刻度点的个数
    ticks: array, // 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示
    sync: boolean // 当 chart 存在不同数据源的 view 时，用于统一相同数据属性的值域范围，注意chart和view的y轴字段要相同
  }
};
<Chart data={data} scale={scale} />
```
> !注意：除了以上属性外，不同的 type 还对应有各自的可配置属性，详见 [Scale 度量 API](35);


### placeholder 
_<string>_
* 描述：图表source为空时显示的内容，未设置该属性时为G2 默认样式。`<Chart placeholder />` 则为Bizcharts 定义的无数据提示。
默认值:  `<div style={{ position: 'relative', top: '48%', textAlign: 'center' }}>暂无数据</div>` ;会在图表区域的中间显示 "暂无数据" 。


<span id="padding"></span>

### padding 
_<object>_ _<number>_ _<array>_
* 描述：图表内边距，有如下配置方式:

```js
//有时候坐标轴、图例等绘图区域外的组件显示不全时，可以通过调整图表各个方向的 padding 来调整最终效果
<Chart padding="auto" />
<Chart padding={[ 20, 30, 20, 30]} />
<Chart padding={20} />
<Chart padding={{ top: 20, right: 30, bottom: 20, left: 30 }} />
<Chart padding={[20, 'auto', 30, 'auto']} />
<Chart padding={['20%', '30%']} />
```

- padding 为数字以及数组类型时使用方法同 CSS 盒模型。
- padding 中存在 'auto'，时会自动计算边框，目前仅考虑 axis 和 legend 占用的边框。
- 另外也支持设置百分比，如 padding: [ '20%', '30%' ]，该百分比相对于整个图表的宽高。

<p>padding="auto"` vs 没有设置padding</p>
![padding="auto"](https://img.alicdn.com/tfs/TB1it.Nbv1H3KVjSZFBXXbSMXXa-632-451.png_300x300q90.jpg)
![没有设置padding](https://img.alicdn.com/tfs/TB1dbgPbA5E3KVjSZFCXXbuzXXa-625-454.png_300x300q90.jpg)



### animate 
_<boolean>_
* 描述：图表动画开关，默认为 true，即开启动画。

> 如果用户需要自定义图表的动画，需要配置 animate 接口使用。具体参见 [自定义动画](../../12/page/22)


### background 
_<object>_
* 描述：设置图表整体的边框和背景样式，是一个对象，包含如下属性：

```javascript
//可配置样式有
{
  fill: string, // 图表背景色
  fillOpacity: number, // 图表背景透明度
  stroke: string, // 图表边框颜色
  strokeOpacity: number, // 图表边框透明度
  opacity: number, // 图表整体透明度
  lineWidth: number, // 图表边框粗度
  radius: number // 图表圆角大小
}
```

<span id="plotBackground"></span>

### plotBackground 
_<object>_
* 描述：图表绘图区域的边框和背景样式，是一个对象，包含如下属性：

```javascript
//可配置样式有
{
  fill: string, // 图表背景色
  fillOpacity: number, // 图表背景透明度
  stroke: string, // 图表边框颜色
  strokeOpacity: number, // 图表边框透明度
  opacity: number, // 图表整体透明度
  lineWidth: number, // 图表边框粗度
  radius: number // 图表圆角大小
}
```

<span id="pixelRatio"></span>

### pixelRatio 
_<number>_
* 描述：设置设备像素比，默认取浏览器的值 *window.devicePixelRatio*。

<span id="filter"></span>

### filter 
_<array>_
* 描述：过滤数据，如果存在对应的图例，则过滤掉的字段置灰。
Array:[[fieldString1, callback1], [fieldString2, callback2]]
```js
<Chart
  filter={[
      ['x', val => val > 20] // 图表将会只渲染 x 字段数值大于 20 的数据
  ]}
/>
```
![](https://img.alicdn.com/tfs/TB1KfUWl8v0gK0jSZKbXXbK2FXa-981-212.png)

> 改属性可以设置默认哪些图表选中和不选中状态。

<span id="className"></span>

### className 
_<string>_
* 描述：设置图表最外层div的类名。
```js
<Chart className="chart1" />
```

### style 
_<object>_
* 描述：设置图表最外层div的样式。
```js
const style={fontSize: '12'}
<Chart style={style} />
```

### theme 
_<string>_ _<object>_
* 描述：设置当前图表的主题，默认提供 "default" 和 "dark" 样式。也可以是一个包含主题配置项的对象，具体配置项参考图表[皮肤内容](41)。

> 这是“Chart 级别的主题样式配置”。

### onGetG2Instance 
_<function>_
* 描述：获取G2图表实例，当配置化不能满足要求，需要实现一些自定义程度较高的操作，可以通过G2图表实例，调用g2底层的方法，详细参见[g2 chart API](https://g2.antv.vision/zh/docs/api/classes/chart)。
```js
let chartIns;
<Chart onGetG2Instance={c=>{
  chart = c;
  chart.animate(false);// 取消动画
}}
```


## 图表事件

直接参考 [图表事件](/product/bizcharts/category/7/page/66) 文档
