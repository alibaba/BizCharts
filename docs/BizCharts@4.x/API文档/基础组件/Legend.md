# Legend

## 什么是图例

> 只有当 `<Geom />` 组件上有shape, color, size 这三个属性中任意一个时，并且将 `<Legend>` 组件的 name 属性跟这个属性的字段关联上，才会显示图例；

* shape 属性，会根据不同的 shape 类型生成图例；
* color 属性, 会赋予不同的图例项不同的颜色来区分图形；
* size 属性, 在图例上显示图形的大小。

图例分为两种：

1. 分类图例。
2. 连续图例。
> 两种图例分别有对应的参数配置，不要混淆，详细见下文。

![image | center](https://zos.alipayobjects.com/skylark/9f146402-1e62-4029-b3b8-3d32029af1d6/attach/2378/eb826d75a0bb34cb/image.png "")

> 下文中的`ShapeAttrs`文档请参考 [BizCharts绘图属性Style](/product/BizCharts4/category/61/page/114)



## 使用说明
* 图表默认显示图例,如需关闭则使用visible={false}。在Chart的pure模式下则默认不开启Legend。

```js
// Basic Usage
<Chart width={600} height={400} data={data}>
  <Legend visible={false} /> // 关闭Legend
  <Geom type="bar" position="genre*sold" color="genre" />
</Chart>

// Chart pure模式
<Chart width={600} height={400} data={data}>
  <Legend /> // 需要配置Legend，才能开启
  <Geom type="bar" position="genre*sold" color="genre" />
</Chart>
```

* 使用 `<Legend/>` 组件时，可以指定当前图例对应数据源中的字段名（字段名为name），不指定则默认设置所有图例；

```jsx
{/*指定图例对应数据源中的字段名*/}
<Chart width={600} height={400} data={data}>
    // Geom 组件上必须有 `shape, color, size `中某个属性值为 genre 字段，才会有图例出现。
	<Legend name="genre" position="right" title={null} dx={20} />
	<Geom type="bar" position="genre*sold" color="genre" />
</Chart>

{/*不指定图例对应数据源中的字段名，则默认设置所有图例*/}
<Chart width={600} height={400} data={data}>
	<Legend position="right" title={null} dx={20} />
	// Geom 组件上必须有 `shape, color, size `中某个属性值为 genre 字段，才会有图例出现。
	<Geom type="bar" position="genre*sold" color="genre" />
</Chart>
```

* 一旦使用 `<Legend/>` 组件，那么所有的图例都会显示，如若需要隐藏某一个图例，将 visible 参数配置为 false，如下所示：

```jsx
<Chart width={600} height={400} data={data}>
	<Legend name="genre" visible={false} />
	<Legend name="type" visible={true} />
	<Geom type="bar" position="genre*sold" color="genre" />
	<Geom type="line" position="genre*sold" color="type" />
</Chart>
```
## API

**分类类型**和**连续类型**的配置有一定的区别，下面列出了这两种类型支持的可配置的属性：

## 共同属性

### name 
_<string>_
- 描述：图例的对应到数据源中的数据字段名，不传则默认设置所有图例。

### visible 
_<boolean>_
- 描述：图例是否可见,默认值:true。

### position 
_<string>_
- 描述：设置图例的显示位置，可设置的值有12个：  
* `left`  
* `left-top`  
* `left-bottom`  
* `right`  
* `right-top`  
* `right-bottom`  
* `top`  
* `top-left`  
* `top-right`  
* `bottom`  
* `bottom-left`  
* `bottom-right`  

**默认值: bottom。**
[demo链接](https://bizcharts.alibaba-inc.com/product/bizcharts/demo/110)

### offsetX 
_<number>_
- 描述：图例 x 方向的偏移值，数值类型，数值单位为 'px'，默认值为 0。

### offsetY 
_<number>_
- 描述：图例 Y 方向的偏移值，数值类型，数值单位为 'px'，默认值为 0。

### layout 
_<string>_
- 描述：图例布局方式 'horizontal' | 'vertical'

### title 
_<boolean>_ _<object>_
- 描述：图例标题的显示样式设置，如果值为 null，表示不展示图例标题，默认不展示。
```js
<Chart width={600} height={400} data={data}>
  <Legend name="genre" title={{
      text:'标题',
      spacing: 12, // 标题同图例项的间距
      style: {
	fill: '#404040', // 文本的颜色
	fontSize: 14, // 文本大小
	fontWeight: 800, // 文本粗细  
      }
  }} />
	<Interval position="genre*sold" color="genre" />
</Chart>
```

### background 
_<object>_
- 描述：配置图例的背景框
```js
<Legend background={{
  padding: 20, // number | number[] 背景的留白边距
  style: {
    stroke: #ccc,
    lineWidth: 1,
  }
}} />
```

### filter 
_<function>_
- 描述：筛选数据方法，要指定name才能生效
```js
(value: any, datum: Datum, idx?: number) => boolean;
```

### onChange 
_<function>_
- 描述：连续图例值改变时 or 分类图例点击图例时，触发事件
```js
(e?: IEvent, chart?: Chart) => void;
```

## 连续图例属性

### slidable 
_<boolean>_
- 描述：**连续图例适用**，滑块是否可以滑动。

### min 
_<number>_
- 描述：**连续图例适用**，选择范围的最小值。

### max 
_<number>_
- 描述：**连续图例适用**，选择范围的最大值。

### value 
_<number>_
- 描述：**连续图例适用**，选择的值。

### track 
_<object>_
- 描述：**连续图例适用**，选择范围的色块样式配置项。
属性结构如下：
```js
{
  style?: ShapeAttrs; // 选定范围的样式
}
 ```
 
### rail 
_<object>_
- 描述：**连续图例适用**，图例滑轨（背景）的样式配置项。
属性结构如下：
```js
{
  type?: string; // rail 的类型，color, size
  size?: number; // 滑轨的宽度
  defaultLength?: number; // 滑轨的默认长度，，当限制了 maxWidth,maxHeight 时，不会使用这个属性会自动计算长度
  style?: ShapeAttrs; // 滑轨的样式
}
 ```
 
### title 
_<object>_
- 描述：**连续图例适用**，标题的配置项。
属性结构如下：
```js
{
  spacing?: number; // 文本同滑轨的距离
  style?: ShapeAttrs; // 文本样式
}
 ```

### label
_<object>_
- 描述：**连续图例适用**，文本的配置项。
属性结构如下：
```js
{
  // 文本同滑轨的对齐方式，有五种类型
  // rail ： 同滑轨对齐，在滑轨的两端
  // top, bottom: 图例水平布局时有效
  // left, right: 图例垂直布局时有效
  align?: string;
  spacing?: number; // 文本同滑轨的距离
formatter?:(v:any)=>string;// 格式化
  style?: ShapeAttrs; // 文本样式
}
 ```
 
### handler 
_<object>_
- 描述：**连续图例适用**，滑块的配置项。
属性结构如下：
```js
{
  size?: number; // 滑块的大小
  style?: ShapeAttrs; // 滑块的样式设置
}
 ```

## 分类图例属性

### custom 
_<boolean>_
- 描述：是否为自定义图例，当该属性为 true 时，需要声明 items 属性。


### items 
_<LegendItem[]>_
- 描述：**分类图例适用**，用户自己配置图例项的内容。
```js
interface LegendItem {
  /**
   * 唯一值，用于动画或者查找
   */
  id?: string;
  /** 名称 */
  name: string;
  /** 值 */
  value: any;
  /** 图形标记 */
  marker?: MarkerCfg;
  /** 初始是否处于未激活状态 */
  unchecked?: boolean;
}

```
###  itemStates
_<object>_
 - 描述：自定义图列各种状态下的样式。注意：需要指定字段 name
```
<Legend
   name="type"
   itemStates={{
          active: {
            nameStyle: {
              opacity: 0.8,
            },
          },
          unchecked: {
            nameStyle: {
              fill: uncheckedColor,
            },
            markerStyle: {
              fill: uncheckedColor,
              stroke: uncheckedColor,
            },
          },
          inactive: {
            nameStyle: {
              fill: uncheckedColor,
            },
            markerStyle: {
              opacity: 0.2,
            },
          },
        }}
/Legend>
```


### itemSpacing 
_<number>_
 - 描述：**分类图例适用**，控制图例项水平方向的间距。

### maxItemWidth 
_<number>_
- 描述：**分类图例适用**，图例项的最大宽度，超出则自动缩略。 `maxItemWidth` 可以是像素值； 也可以是相对值（取 0 到 1 范围的数值），代表占图表宽度的多少

### itemWidth 
_<number>_
- 描述：**分类图例适用**，图例项的宽度, 默认为 null，自动计算。
> 当出现图例文字被'...'省略时，可以设置`maxItemWidth`来解决。

### itemHeight 
_<number>_
- 描述：**分类图例适用**，图例的高度，默认为 null。

### itemValue 
_<object>_
- 描述：配置图例value， 其中formatter可格式化图例name
代码示例
```
<Legend itemValue={LegendItemValueCfg} />
```
接口定义
```js
interface LegendItemValueCfg {
    /**
     * 是否右对齐，默认为 false，仅当设置图例项宽度时生效
     * @type {boolean}
     */
    alignRight?: boolean;
    /**
     * 格式化文本函数
     * @type {Function}
     */
    formatter?: (text: string, item: ListItem, index: number) => string | number;
    /**
     * 图例项附加值的配置
     * @type {ShapeAttrs}
     */
    style?: ShapeAttrs;
}
```
### itemName 
_<object>_
- 描述：配置图例name,其中formatter可格式化图例name
代码示例
```
<Legend itemName={LegendItemNameCfg} />
```
接口定义
```js
interface LegendItemNameCfg {
    /**
     * 图例项 name 同后面 value 的间距
     * @type {number}
     */
    spacing?: number;
    /**
     * 格式化文本函数
     * @type {Function}
     */
    formatter?:  (text: string, item: ListItem, index: number) => string | number;
    /**
     * 文本配置项
     * @type {ShapeAttrs}
     */
    style?: ShapeAttrs;
}

```
### maxWidth 
_<number>_
- 描述：**分类图例适用**，图例项最大宽度设置。

### maxHeight 
_<number>_
- 描述：**分类图例适用**，图例项最大高度设置。

### marker 
_<object>_
- 描述：**分类图例适用**，图例项的 marker 图标的配置。
* 描述：对分类类型的图例生效，用于设置图例的 marker 样式，默认按照 geom 的类型显示。
```js
marker= {{
  symbol: string | function
}}
```
- 当为 string 类型时，可选项如下:

|name| type | shape |
|----|------|-------|
|实心圆点| circle  | ![](https://antv.alipay.com/assets/image/g2/tutorial/circle.png)|
|矩形|square  |![](https://antv.alipay.com/assets/image/g2/tutorial/square.png)|
|领结形状|bowtie  |![](https://antv.alipay.com/assets/image/g2/tutorial/bowtie.png)|
|菱形|diamond |![](https://antv.alipay.com/assets/image/g2/tutorial/diamond.png)|
|六边形|hexagon |![](https://antv.alipay.com/assets/image/g2/tutorial/hexagon.png)|
|三角形|triangle|![](https://antv.alipay.com/assets/image/g2/tutorial/triangle.png)|
|倒三家形|triangle-down|![](https://antv.alipay.com/assets/image/g2/tutorial/triangle-down.png)|
|垂直线断，带头|tick|![](https://antv.alipay.com/assets/image/g2/tutorial/tick.png)|
|加号|plus|![](https://antv.alipay.com/assets/image/g2/tutorial/plus.png)|
|连字号线段|hyphen|![](https://antv.alipay.com/assets/image/g2/tutorial/hyphen.png)|
|垂直线段|line|![](https://antv.alipay.com/assets/image/g2/tutorial/line.png)|
|交叉|cross|![cross_marker.jpg](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/16bc2a10-b9de-11ea-b002-07326b472b1e.jpg) 

> 如果发现配置marker为line/plus/tick/hyphen/cross未生效，请检查确保Line组件在最上层

- 如果想实现空心效果，可以设置Point组件的shape为空心形状，代码如下：
```js
// 设置空心圆，等同于
<Point shape='hollow-circle'/>
<Legend marker={{
    symbol:'circle',
    style:{
      fill:null
    }
}} />
```


- 当为 Function 时，可以自定义 shape 图形，使用方式如下:
```js
/**
 * 自定义 marker 形状
 * @param  {number} x   该 marker 的横轴坐标
 * @param  {number} y   该 marker 的纵轴坐标
 * @param  {number} r   该 marker 的半径大小
 * @return {null}     
 */
marker = {{ symbol: (x, y, r) => {
}}}
```
以下代码绘制了如图所示的 marker: <img style='display:inline;margin:0' src='http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/1edafb90-f273-11ea-bbeb-8bad211ff8c4.jpg' width='40px'/>
```js
marker = {{
      symbol: (x, y, radius) => {
        const r = radius / 2;
        return [
          ['M', x - 3 * r, y],
          ['L', x + 3 * r, y],
          ['M', x - r, y],
          ['A', r, r, 0, 0, 0, x + r, y],
          ['A', r, r, 0, 0, 0, x - r, y],
        ];
      },
    }}
```

### flipPage 
_<boolean>_
- 描述：**适用于分类图例**，当图例项过多时是否进行分页。

### pageNavigator

适用于 分类图例，对图例分页器进行主题样式设置。LegendPageNavigatorCfg 配置如下：
- marker：分页器指示箭头配置项
- text：分页器指示文本配置项

```
// 示例
pageNavigator: {
  marker: {
    style: {
      // 非激活，不可点击态时的填充色设置
      inactiveFill: '#000',
      inactiveOpacity: 0.45,
      // 默认填充色设置
      fill: '#000',
      opacity: 0.8,
      size: 12,
    },
  },
  text: {
    style: {
      fill: '#ccc',
      fontSize: 8,
    },
  },
}
```

### reversed 
_<boolean>_
- 描述：**分类图例适用**，是否将图例项逆序展示。
 
### 不允许点击
点击显示隐藏属于交互行为，需要移除相应交互，如下：
```js
<Chart onGetG2Instance={ c => {
  c.removeInteraction('legend-filter');
}}></Chart>
```