# scale 度量
度量 Scale，是数据空间到图形空间的转换桥梁，负责原始数据到 [0, 1] 区间数值的相互转换工作。针对不同的数据类型对应不同类型的度量。

## 度量分类

度量的类型是由原始数据的值类型所决定的，所以在介绍度量的类型之前，需要了解下 BizCharts 对数据的分类方式。

根据数据的类型，支持以下几种度量类型：

+ **identity**，常量类型的数值，也就是说数据的某个字段是不变的常量；
+ **linear**，连续的数字 [1,2,3,4,5]；
+ **cat**，分类, ['男','女']；
+ **time**，连续的时间类型；
+ **timeCat**，非连续的时间，比如股票的时间不包括周末或者未开盘的日期；
+ **log**，连续非线性的 Log 数据 将 [1,10,100,1000] 转换成[0,1,2,3]；
+ **pow**，连续非线性的 pow 数据 将 [2,4,8,16,32] 转换成 [1,2,3,4,5]。

## 使用示例:
```jsx
var data = [
  {"month":"一月","temperature":7,"city":"tokyo"},
  {"month":"二月","temperature":6.9,"city":"newYork"},
  {"month":"三月","temperature":9.5,"city":"tokyo"},
  {"month":"四月","temperature":14.5,"city":"tokyo"},
  {"month":"五月","temperature":18.2,"city":"berlin"}
]
var scale = {
  month: {
    alias: '月份' // 为属性定义别名
  },
  temperature: {
    alias: '温度' // 为属性定义别名
  }
};
<Chart scale={scale}/>
```

在上述数据中，`month` 代表月份，`temperature` 代表温度，`city` 代表城市，其中 `month` 和 `city` 都是分类类型数据，但是不同的是 `month` 作为月份是有序的分类类型，而 `city` 是无序的分类类型，而 `temperature` 是连续的数值类型。

对于 BizCharts 生成的所有度量对象，均拥有以下属性，这些属性均可以由用户进行配置。

```js
{
  type: string, // 度量的类型
  range: array, // 数值范围区间，即度量转换的范围，默认为 [0, 1]
  alias: string, // 为数据属性定义别名，用于图例、坐标轴、tooltip 的个性化显示
  ticks: array, // 存储坐标轴上的刻度点文本信息
  tickCount: number, // 坐标轴上刻度点的个数，不同的度量类型对应不同的默认值
  formatter: function, // 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴、图例、tooltip 上的显示
}
```


## Scale 类型详解

<span id="linear"> </span>
### linear

属性名| 说明 
----|----
alias | 别名
nice| 默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布。例如原始数据的范围为 [3, 97]，如果 nice 为 true，那么就会将数值范围调整为 [0, 100]
min| 定义数值范围的最小值
max| 定义数值范围的最大值
range |输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
formatter | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。
ticks | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。
tickCount| 定义坐标轴刻度线的条数，默认为 5
tickInterval | 用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，**tickCount 和 tickInterval 不可以同时声明。**

<span id="cat"> </span>
### cat

属性名| 说明
----|----
alias | 别名
range |输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
formatter | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。
ticks | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。
tickCount| 定义坐标轴刻度线的条数，默认为 5
values | 具体的分类的值，一般用于指定具体的顺序和枚举的对应关系

`values` 属性常用于 2 个场景：

1. 需要制定分类的顺序时，例如：c 字段有'最大','最小'和'适中'3种类型，我们想指定这些数值在坐标轴或者图例上的显示顺序时：
    
```js
const defs = {
  'c': {
    type: 'cat',
    values: [ '最小','适中','最大' ]
  }
};
```
  
2. 数据字段中的数据是数值类型，但是需要转换成分类类型，**这个时候需要注意原始数据必须是索引值**。

```js
const data = [
  { month: 0, tem: 7, city: "tokyo" },
  { month: 1, tem: 6.9, city: "tokyo" },
  { month: 2, tem: 9.5, city: "tokyo" },
  { month: 3, tem: 14.5, city: "tokyo" },
  { month: 4, tem: 18.2, city: "tokyo" },
  { month: 5, tem: 21.5, city: "tokyo" },
  { month: 6, tem: 25.2, city: "tokyo" }
];
const defs = {
  'month':{
    type: 'cat',
    values: [ '一月','二月','三月','四月','五月','六月','七月' ] // 这时候 month 的原始值是索引值
  }
};

const chart = new G2.Chart({
  id: 'c1',
  width: 400,
  height: 250
});
chart.source(data,defs);
chart.interval().position('month*tem').color('month');
chart.render();
```

![image](https://zos.alipayobjects.com/skylark/97e5078a-45b9-4db6-8d51-db506eaa2444/attach/3378/1aea882afb2ef64d/image.png)

<span id="log"> </span>
### log

属性名|说明
----|----
nice| 是否将 ticks 进行优化，变更数据的最小值、最大值，使得每个 tick 都是用户易于理解的数据
min| 最小值
max| 最大值
base| Log 的基数，默认是2
alias | 别名
range |输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
formatter | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。
ticks | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。
tickCount| 定义坐标轴刻度线的条数，默认为 5
tickInterval | 用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，**tickCount 和 tickInterval 不可以同时声明。**

注：最小值和最大值悬殊非常大时可以用 log 平滑一下数据。

<span id="pow"> </span>
### pow

属性名|说明
----|----
nice| 是否将 ticks 进行优化，变更数据的最小值、最大值，使得每个 tick 都是用户易于理解的数据
min| 最小值
max| 最大值
exponent| 指数，默认 2
alias | 别名
range |输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
formatter | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。
ticks | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。
tickCount| 定义坐标轴刻度线的条数，默认为 5
tickInterval | 用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，**tickCount 和 tickInterval 不可以同时声明。**

注：最小值和最大值悬殊非常大时可以用 pow 平滑一下数据。

<span id="time"> </span>
### time

是 linear 度量的一种，连续的时间度量类型，**默认会对数据做排序**。

属性名|说明
----|----
nice | 是否将 ticks 进行优化，变更数据的最小值、最大值，使得每个 tick 都是用户易于理解的数据
min| 最小值
max| 最大值
mask| 数据的格式化格式 默认：'yyyy-mm-dd',
tickCount| 坐标点的个数，默认是 5，但不一定是准确值。
tickInterval | 用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，**time 类型需要转换成时间戳**，**tickCount 和 tickInterval 不可以同时声明。**
alias | 别名
range |输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
formatter | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。
ticks | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。

> 说明：mask 的占位符标准同 [moment](https://momentjs.com/docs/#/displaying/format/);

目前 G2 会自动识别如下形式的时间格式，当用户需要生成 time 类型的度量时，建议将原始时间数据转换为如下形式：

1. 时间戳，如 1436237115500；
2. 时间字符串： '2015-03-01'，'2015-03-01 12:01:40'，'2015/01/05'，'2015-03-01T16:00:00.000Z'。

<span id="timeCat"> </span>
### timeCat

时间分类类型，是一种分类类型的时间度量类型，**默认会对数据做排序**。timeCat 不同于 time，是一种有序的分类数据。

例如股票交易的日期，此时如果使用 time 类型，那么由于节假日没有数据，折线图、k 线图就会发生断裂，所以此时需要使用 timeCat 类型度量将日期转换为有序的分类数据，该度量默认会对数据做排序，如下图所示：

![image](https://zos.alipayobjects.com/skylark/27036dff-5843-48a4-95f5-53b56f8b2d9a/attach/3378/0940215d294981b8/image.png)

属性名|说明
----|----
nice | 是否将 ticks 进行优化，变更数据的最小值、最大值，使得每个 tick 都是用户易于理解的数据
mask| 数据的格式化格式 默认：'yyyy-mm-dd',
tickCount| 坐标点的个数，默认是5。但不一定是准确值
values | 具体的分类的值，一般用于指定具体的顺序和枚举的对应关系
alias | 别名
range |输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
formatter | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。
ticks | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。

