# Scale

**度量 Scale，是数据空间到图形空间的转换桥梁，负责原始数据到 [0, 1] 区间数值的相互转换工作。针对不同的数据类型对应不同类型的度量。**

## 类型

度量的类型是由原始数据的值类型所决定的，所以在介绍度量的类型之前，需要了解下 BizCharts 对数据的分类方式。

根据数据的类型，支持以下几种度量类型：

+ **identity**，常量类型的数值，也就是说数据的某个字段是不变的常量；

+ **linear**，连续的数字 `[1, 2, 3, 4, 5]`；

+ **cat**，分类, `['男', '女']`；

+ **time**，连续的时间类型；

+ **timeCat**，非连续的时间，比如股票的时间不包括周末或者未开盘的日期；

+ **log**，连续非线性的 Log 数据，将 `[1, 10, 100, 1000]` 转换成 `[0, 1, 2, 3]`（假设底数是 `10`）；

+ **pow**，连续非线性的 pow 数据，将 `[2, 4, 8, 16, 32]` 转换成 `[1, 2, 3, 4, 5]`。

## 使用示例

```js
const data = [
  {"month": "一月", "temperature": 7, "city": "tokyo"},
  {"month": "二月", "temperature": 6.9, "city": "newYork"},
  {"month": "三月", "temperature": 9.5, "city": "tokyo"},
  {"month": "四月", "temperature": 14.5, "city": "tokyo"},
  {"month": "五月", "temperature": 18.2, "city": "berlin"}
];

const scale = {
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

## 属性

### 通用属性

#### `type`
_<string>_
* 描述： 度量的类型，可选值有：`linear`、`cat`、`log`、`pow`、`time` 和 `timeCat`。不同类型的度量属性也不一样，详见各类型属性说明。

#### `alias`
_<string>_
* 描述: 为数据属性定义别名，用于图例、坐标轴、tooltip 的个性化显示。

#### `range`
_<array>_
* 描述: 数值范围区间，即度量转换的范围，默认为 [0, 1]。

#### `formatter`
_<function>_
* 描述: 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴、图例、tooltip 上的显示。

    - `value`       __*__

        对应点的原始数据

    - 返回值

        `string`，对应点的坐标轴、tooltip 以及图例上展示的内容。


### linear
连续的数据值，如这一组数据：[1, 2, 3, 4, 5]，除了通用的属性外，还包含以下自有属性:

#### `nice`
_<boolean>_
* 描述: 用于优化数值范围，使绘制的坐标轴刻度线均匀分布。例如原始数据的范围为 `[3, 97]`，如果 `nice` 为 `true`，那么就会将数值范围调整为 `[0, 100]`。默认值：`true`

#### `min`
_<number>_
* 描述：定义数值范围的最小值。

#### `max`
_<number>_
* 描述：定义数值范围的最大值。

#### `range`
_<Array>_
* 描述：数值范围区间，即度量转换的范围，默认为 `[0, 1]`

#### `ticks`
_<Array>_
* 描述：存储坐标轴上的刻度点文本信息。

#### `tickCount`
_<number>_
* 描述：坐标轴上刻度点的个数，不同的度量类型对应不同的默认值。

#### `tickInterval`
_<number>_
* 描述：用于指定坐标轴各个标度点的间距，是**原始数据**之间的间距差值，**`tickCount` 和 `tickInterval` 不可以同时声明。

#### `minTickInterval`
_<number>_
* 描述：用于指定坐标轴各个标度点的最小间距。例如当数据值比较小，但是刻度间距必须整数时（实际可能会出现浮点数），可以将 minTickInterval 配置为1。

#### `minLimit`
_<number>_
* 描述：对数据的最小值的限制，无论数据中是否存在比这个值小的数据，生成的坐标点不会小于这个值。

#### `maxLimit`
_<number>_
* 描述：对数据的最大值的限制，无论数据中是否存在比这个值大的数据，生成的坐标点不会大于这个值。

#### `formatter`
_<Function(value)>_
* 描述：回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴、图例、tooltip 上的显示。

    - `value`       __*__

        对应点的原始数据

    - 返回值

        `string`，对应点的坐标轴、tooltip 以及图例上展示的内容。

`说明：`
- min,max,minLimit 和 maxLimit 都会影响坐标轴上坐标点的生成。

- min 和 minLimit 的差别主要体现在 如果数据中的数据的范围是 10-20 对于 min: 0 来说，会生成从 0 - - 20 范围的坐标点，但是对于 minLimit 来说只要保证生成的坐标点不小于 0 即可，生成的坐标点的范围可能依然在 10 - 20 之间。

- max 和 maxLimit 的差别同 min 和 minLimit 类似， max 体现在坐标轴上肯定会出现 max 或者比 max 大的值，但是绝对不会出现比 maxLimit 大的值。

### log
连续非线性的 log 类型度量，该度量会将 [1, 10, 100, 1000] 先转换成 [0, 1, 2, 3] 然后再进行归一化操作。log 类型的数据可以将非常大范围的数据映射到一个均匀的范围内。

log 度量是 linear 的子类，支持所有通用的属性和 linear 度量的属性，特有的属性如下：

#### `base`
* 类型：number

* 描述：
    > `type` 是 `log` 时适用

    指定 log 函数的底数。

    默认值：`2`

>对于以下场景，建议将数据的度量类型指定为 log 类型：

  * 散点图中数据的分布非常广，同时数据分散在几个区间内是，例如分布在 0 - 100， 10000 - 100000，1千万 - 1亿内，这时候适合使用 log 度量；

  * 热力图中数据分布不均匀时也会出现只有非常高的数据点附近才有颜色，此时需要使用 log 度量，对数据进行 log 处理。

对比使用未使用 log 和使用了log 后的效果
```js
// 数据
const data = [
  { site: '站点1', pv: 10 },
  { site: '站点2', pv: 99 },
  { site: '站点3', pv: 10000 }
];
const scale = {
  pv: {
    type: 'log',
    base: 10
  }
};
<Chart data={data} scale={scale} />
```

![before](https://img.alicdn.com/tfs/TB1tAr9XcXIxuRkSO9eXXcSjFXa-1216-586.png)
![after](https://img.alicdn.com/tfs/TB1OUwdXcXIxuRkSRUgXXXuiVXa-1200-606.png)

### pow
连续非线性的 pow 类型度量，该度量将 [2, 4, 8, 16, 32] 先转换成 [1, 2, 3, 4, 5] 然后再进行归一化操作。

pow 类型的度量也是 linear 类型的一个子类，除了支持所有通用的属性和 linear 度量的属性外也有自己的属性：

#### `exponent`
_<Number>_
* 描述: 指数

### time
连续的时间类型，是一种特殊的连续性数据。time 类型的度量也是 linear 的子类，除了支持所有通用的属性和 linear 度量的属性外，还有自己特殊的属性：

#### `mask`
_<string>_
* 描述：时间显示格式

* 默认值：`'YYYY-MM-DD HH:mm:ss'`
* exp.：https://bizcharts.net/product/BizCharts4/demo/474


    数据的格式化格式。

    > 说明：mask 的占位符标准同 [moment](https://momentjs.com/docs/#/displaying/format/)、[fecha](https://github.com/taylorhakes/fecha);

    目前 G2 会自动识别如下形式的时间格式，当用户需要生成 time 类型的度量时，建议将原始时间数据转换为如下形式：

    1. 时间戳，如 `1436237115500`；
    
    2. 时间字符串： `'2015-03-01'`，`'2015-03-01 12:01:40'`，`'2015/01/05'`，`'2015-03-01T16:00:00.000Z'`。

### cat
分类类型数据的度量。除了拥有通用的度量属性外，用户还可以设置 values 属性：

#### `values`
_<Array>_
* 描述：
    > `type` 是 `cat` 和 `timeCat` 时适用。

    具体的分类的值，一般用于指定具体的顺序和枚举的对应关系，常用于 2 个场景：

    需要指定分类的顺序时，例如：`type` 字段有`'最大'`、`'最小'`和`'适中'`，我们想指定这些数值在坐标轴或者图例上的显示顺序时：

    ```js
    const scale = {
      'c': {
        type: 'cat',
        values: [ '最小','适中','最大' ]
      }
    };
    <Chart scale={scale} />
    ```
### timeCat
timeCat 度量对应时间数据，但是不是连续的时间类型，而是有序的分类数据。例如股票交易的日期，此时如果使用 time 类型，那么由于节假日没有数据，折线图、k 线图就会发生断裂，所以此时需要使用 timeCat 类型度量将日期转换为有序的分类数据，该度量默认会对数据做排序。


timeCat 是 cat 度量的子类，除了支持所有通用的属性和 cat 度量的属性外也有自己的属性:

#### `mask`
_<string>_
* 描述：时间显示格式.
* 默认值：`'YYYY-MM-DD HH:mm:ss`

    数据的格式化格式。

    > 说明：mask 的占位符标准同 [moment](https://momentjs.com/docs/#/displaying/format/)、[fecha](https://github.com/taylorhakes/fecha);

    timeCat 和 time 类型度量的差别和应用场景
    > timeCat 是分类类型的度量，所以适合于显示 柱状图 或者固定时间内没有数据的场景（股票图）
    > time 是连续类型的度量，更适合显示折线图、面积图，表现数据的趋势_<>_
