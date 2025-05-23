# Chart

> Chart 组件是一个图表的最外层画布，是一个必要组件。   
> ⚠️ 不支持3.x的forceFit 来做图表自适应，请大家注意。该配置为autoFit。

图表默认显示图例、Tooltip和坐标轴,如需关闭则使用visible={false}。在Chart的pure模式下则默认不开启Legend。
```
// Basic Usage
<Chart width={600} height={400} data={data}>
  <Legend visible={false} /> // 关闭Legend
  <Tooltip visible={false} /> // 关闭Tooltip
  <Geom type="bar" position="genre*sold" color="genre" />
</Chart>

// Chart pure模式
<Chart width={600} height={400} data={data}>
  <Legend /> // 需要配置Legend，才能开启
  <Geom type="bar" position="genre*sold" color="genre" />
</Chart>
```

## API

<span id="data"></span>
### data 数据源
_<array>_ _<required>_
- 描述：数据源，是一个由对象组成的集合。

<span id="autoFit"></span>
### autoFit 
_<boolean>_

- 描述：图表大小自适应，对外层容器的宽和高都会适应。
- 默认值为 false， 关闭自适应。

<span id="limitInPlot"></span>
###  limitInPlot
_<boolean>_
- 描述：是否对超出坐标系范围的 Geometry 进行剪切。
- 默认值为 false，超出也显示。

<span id="width"></span>
### width 
_<number>_
- 描述：设置图表的宽度。

<span id="height"></span>
### height
_<number>_
- 描述：设置图表的高度。

<span id="padding"></span>
### padding 
_<number>_ _<number[]>_ _<'auto'>_
- 描述：图表内边距。
```js
// 配置如下
<Chart padding={12} />
<Chart padding={[10, 20]} />
<Chart padding={[10, 10, 20, 20]} />
<Chart padding="auto" />
```

⚠️： 不再支持'auto' 和数字混写。替代方式：使用padding和appendPadding组合使用
```
// 3.x写法 padding={[20, 'auto', 'auto', 30]}
// 4.x写法
<Chart padding="auto" appendPadding={[20, 0, 0, 30]} />
// 相当于 padding-top='auto'+ 20; padding-right="auto"+0; padding-bottom="auto"+0; padding-left="auto"+30;
```

<span id="padding"></span>
### appendPadding 
_<number>_  _<number[]>_
* 描述：再padding的基础上增加的调整边距。

<span id="pixelRatio"></span>

### forceUpdate 
_<boolean>_
* 描述：是否每次更新都销毁g2实例，重新绘制图表，默认为false。
一般再一些复杂交互后，实例上会缓存一下状态。如果更新的内容比较大，请开启forceUpdate。

### pixelRatio 
_<number>_
* 描述：设置设备像素比，默认取浏览器的值 *window.devicePixelRatio*。

### pure 
_<boolean>_
- 描述：设置pure属性可以得到一个干净的图表画布。同时，可以自行配置`<Axis/>` `<Tooltip />` ...等组件。

### errorContent 
_<reactNode>_ _<string>_
- 描述：当bizcharts发生错误的时候兜底展示。支持字符串或者react节点。
- 默认显示：Bizcharts something error。

### placeholder 
_<reactNode>_ _<boolean>_
- 描述：当Chart的data属性为undefined 或者为空数组的时候则提示 placeholder 的内容。
- 默认关闭此功能。但placeholder 为true的时候，默认展示 "暂无数据"

### defaultInteractions
_<array>_
- 描述：更改内置的交互。默认值['tooltip','legend-active','legend-filter','continuous-filter']，需取消某项则不写入对应项。
[具体交互](112)

### animate
控制图表是否动画。默认为true，关闭请配置为false。一旦配置为false，会关闭所有动画。
如果只想关闭图形的动画，[请在`<Gemo /> `组件上配置](/product/BizCharts4/category/62/page/92#animate);
```jsx
// 关闭包括Axis轴等其他组件的动画
<Chart animate={false} />

// 仅关闭图形变换的动画
<Gemo animate={false} />
```

### interactions
_<array>_
- 描述：配置交互。可配置交互列表，只能传入字符串数组，不支持修改交互动作。
[可配置的交互列表](112#type)
```js
interactions={['element-active']}
```

- [interactions示例Demo](/product/BizCharts4/demo/352)
```js
<Chart autoFit height={320} data={data} interactions={['element-active']}>
    <Line shape="smooth" position="month*temperature" color="city" label="temperature"/>
    <Point position="month*temperature" color="city" />
    <Tooltip shared showCrosshairs/> // 折线图显示竖线
</Chart>
```
> 具体效果是hover的线条会加粗
<img src="https://img.alicdn.com/tfs/TB1PPBv1rY1gK0jSZTEXXXDQVXa-982-734.png" width="600"/>

### filter
_<array>_ _<object>_

```
<Chart height={400} padding="auto" data={data} autoFit filter={[
      ['avgRainfall', val => val != null] // 图表将会只渲染过滤后的数据
  ]}>
      <Interval
        adjust={[
         {
            type: 'dodge',
            marginRatio: 0,
          },
        ]}
        color="name"
        position="month*avgRainfall"
      />
      <Tooltip shared />
      <Interaction type="active-region"/>
</Chart>
```
或者
```jsx
<Chart height={400} padding="auto" data={data} autoFit filter={{
avgRainfall: val => val != null // 图表将会只渲染过滤后的数据
  }}></Chart>
```

### onGetG2Instance 
_<function>_。
获取G2实例的方法。
在图表首次render后执行该函数，并在更新的时候，且遇到g2不能直接更新的属性时，BizCharts会重建g2实例，所以使用的时候要注意闭包更新的问题。
```js
<Chart onGetG2Instance={chart => { this.chart = chart }} />

// 使用
this.chart.showTooltip(...);
````
具体的g2实例的方法和属性详见：https://antv-g2.gitee.io/zh/docs/api/chart-func

### notCompareData
在数据量极大的情况下，更新数据我们会做缓存以对比数据是否更新，可自行关闭此选项以避免缓存和对比数据带来的开销。如果开启此项，`notCompareData={true}`默认判定每次输入的数据都是不一样的。

### scale 
_<object>_
- 描述：配置图表的比例尺。
```js
// 对应数据字段名进行配置
interface scaleConfig {
  [filedName:string]: objec
}
// 例：
const scale: scaleConfig = {
   value: { max: 100 }
}
// 使用
<Chart scale={scale} >
...
</Chart>

```

#### 数据比例尺
不同的数据对应不同的数据比例尺，通常未指定比例尺类型的情况下，会以数据的第一条记录自动判定数据比例尺类型。

1. 分类（非连续）数据，又分为有序分类和无序分类。
2. 连续数据，时间也是一种连续数据类型。
3. 常量度量，数据是一种常量，只有单个值。

| 数据类型 |	度量类型|
|------------------------|
| 连续 |	linear、linear-strict、log、pow、time、quantize、quantile|
| 分类 |（非连续）	cat、timeCat|
| 常量 |	identity|

* identity，常量类型的数值，也就是说数据的某个字段是不变的常量；
* linear，连续的数字 [1, 2, 3, 4, 5]；
* linear-strict，连续的数字 [1, 2, 3, 4, 5]，分段数严格按照tickCount设置(⚠️需要更新至4.1.x版本)，[demo](https://bizcharts.net/product/BizCharts4/demo/414)
* cat，分类，['男', '女']；
* time，连续的时间类型；
* log，连续非线性的 Log 数据 将 [1, 10, 100, 1000] 转换成 [0, 1, 2, 3]；
* pow，连续非线性的 pow 数据 将 [2, 4, 8, 16, 32] 转换成 [1, 2, 3, 4, 5]；
* timeCat，非连续的时间，比如股票的时间不包括周末或者未开盘的日期。
* quantize 分段度量，例如 [0-100, 100-200, 200-300] 在一个区间内映射到一个值上
* quantile 密度分段度量，会根据数据的分布自动计算一个个的区间段

#### cat 类型比例尺
cat 类型数据样例：`'苹果','香蕉','草莓'` 字符串的数字：`'1','2','3','4'`  
```js
const scale = {
 [字段名]: {
    type: 'cat', // 会以数据的第一条记录自动判定，无特别需要可不配置。
    values: 当前字段的分类值。values 字段一般会自动从数据中取得，需要指定分类的顺序，或自定义枚举指定 values时，可手动传入。
    ticks: [... ], // 如果配置了该项，则轴的刻度即显示数组中指定的刻度。
    formatter: d => d, // 图表全局中该字段的数据进行格式化，影响包括轴label，tooltip，legend。
    alias: '别名', // 字段名的别名，影响显示在坐标轴、图例上的标题。
  }
}
```
#### timeCat 类型比例尺
timeCat 类型的数据样例： `'1991-01-01', '1991-01-02', '1991-01-03', '1991-01-04'` 
会在计算前按时间先后进行排序。
```js
const scale = {
 [字段名]: {
    type: 'timeCat', // 会以数据的第一条记录自动判定，无特别需要可不配置。
    nice: true, // 是否自动调优，如果发现刻度较少，请关闭此项目， linear 和time 类型默认nice为false，其他默认为true
    ticks: [... ],   // 如果配置了该项，则轴的刻度即显示数组中指定的刻度。
    formatter: d => d, // 图表全局中该字段的数据进行格式化，影响包括轴label，tooltip，legend。
    alias: '别名',     // 字段名的别名，影响显示在坐标轴、图例上的标题。
    mask: 'YYYY-MM-DD',   // 默认的数据格式化，如果数据在一天范围内，务必修改此项显示小时和分钟，
    tickMethod: Function, // 计算ticks的函数
  }
}
```
#### linear 类型比例尺
linear 类型的数据样例： `1,2,3,4,` 
```js
const scale = {
 [字段名]: {
    type: 'linear',
    nice: false,    // 是否自动调优, linear 类型默认nice为false，其他默认为true
    ticks: [... ],  // 如果配置了该项，则轴的刻度即显示数组中指定的刻度。
    tickCount: 6,   // 指定坐标轴刻度的个数。
    formatter: d => d, // 图表全局中该字段的数据进行格式化，影响包括轴label，tooltip，legend。
    alias: '别名',     // 字段名的别名，影响显示在坐标轴、图例上的标题。
    tickInterval: number, // tick的步长，不能和tickCount、或ticks同时使用。
    minTickInterval: number, // tick最小间隔，只对线型适用
    sync: boolean // 当 chart 存在不同数据源的 view 时，用于统一相同数据属性的值域范围，注意chart和view的y轴字段要相同
  }
}
```

#### time 时间比例尺
当数据第一个值为 YYYY-MM-DD HH:mm:ss 类型当数据时，会自动判定为时间格式。
如果您的数据范围在一天以内的数据,务必修改mask 使其显示小时和分钟。

```js
const scale = {
 [字段名]: {
    type: 'time', // 会以数据的第一条记录自动判定，无特别需要可不配置。
    nice: false,   // 是否自动调优，如果发现刻度较少，请关闭此项目， linear 和time 类型默认nice为false，其他默认为true
    ticks: [... ],   // 如果配置了该项，则轴的刻度即显示数组中指定的刻度。
    formatter: d => d, // 图表全局中该字段的数据进行格式化，影响包括轴label，tooltip，legend。
    alias: '别名',     // 字段名的别名，影响显示在坐标轴、图例上的标题。
    mask: 'YYYY-MM-DD',   // 默认的数据格式化，如果数据在一天范围内，务必修改此项显示小时和分钟，
    tickMethod: Function, // 计算ticks的函数    
  }
}
```
时间的轴刻度往往会伴随刻度label太长，这时候可以对Axis的label进行旋转以适配。同时需要调大padding的大小留足够的空间显示轴刻度。

#### log 类型比例尺
log类型的数据可以将非常大范围的数据映射到一个均匀的范围内，这种度量是linear的子类，支持所有通用的属性和linear度量的属性，特有的属性：

- base: _<number>_ , Log 的基数，默认是2
- 其他数据同linear比例尺一致。

以下情形下建议使用log度量

散点图时数据的分布非常广，同时数据分散在几个区间内。例如 分布在 0-100， 10000 - 100000， 1千万 - 1亿内，这时候适合使用log 度量
使用热力图时，数据分布不均匀时也会出现只有非常高的数据点附近才有颜色，此时需要使用log度量，对数据进行log处理。

#### pow 类型比例尺
pow类型的数据也是linear类型的一个子类，除了支持所有通用的属性和linear度量的属性外也有自己的属性：

- exponent: _<number>_ ,指数，默认是2
- 其他数据同linear比例尺一致。

#### quantile 分位数比例尺
分位数比例尺映射输入域到离散的的范围。即使输入域是连续的比例尺接受任意合理的输入值，输入域指定为一组离散的值。输出范围的值的数量(基数)决定输入域中将被计算的分位数数量。为了计算分位数，输入域是排好序的，并且被当成离散值的群体(population of discrete values)。输入域通常是你想要可视化的数据维度，例如股票市场每天的变化。输出范围通常是需要输出的可视化，例如一个发散的颜色尺。
通常该比例尺用于配置颜色，用户无需特别配置。

#### identity常量度量  
在使用 G2 开发过程中默认情况下不需要进行度量的配置，因为 G2 代码内部已经根据数据的形式对度量进行了假设，其计算过程如下：  

查看用户是否制定了对应字段的数据类型 （type)  
如果没有，判断字段的第一条数据的字段类型  

如果数据中不存在对应的字段，则为 'identity'  
如果是数字则为 'linear'；  
如果是字符串，判定是否是时间格式，如果是时间格式则为时间类型 'time',  
否则是分类类型 'cat'  

你可以手工更改度量的类型：
```jsx
<Chart scale={{
 'date': {
    type: 'tiemCat',
  }
}} />

<Chart scale={{
 'y': {
    type: 'log',
  }
}} />
```

### 图表事件
提供鼠标点击、移动、右键等事件监听，详情可查看[图表事件教程](/product/BizCharts4/category/61/page/192)

## 常见问题


### chart 的实例有哪些方法可以调用
获取g2 的 chart实例有两个方法，
- 方法一：
```
// 第一次执行时机在g2.render之后。之后如果实例发生变化则再次执行。
<Chart onGetG2Instance={chart => {}} />
```
- 方法二：
```
<Chart>
  <Effects>
  {
    chart = {
     // 根据react 传统执行机制，至上而下，执行到这个函数块当前的chart实例。
     // 可以获取chart上的一些参数值，比如当前图表宽高、比例尺来动态渲染图表。
     // 如果获取比例尺，则需要预先执行一次chart.render()完成计算。
     return <Interval />
    }
  }
  </Effects>
</Chart>
```


chart实例的方法文档：https://antv-g2.gitee.io/zh/docs/api/chart-func









