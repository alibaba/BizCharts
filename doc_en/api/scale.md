# Scale
Scale can map a dimension of abstract data to a visual representation. In general, scales can be used with virtually any type of data, such as linear data or discrete data.

## Functionalities of Scale

1. Normalization: Given an input domain of any data, get a output data with range of [0, 1]. Then can be easily used to represent visual encodings such as diverging colors, stroke widths.

2. Inversion: Given a value from the range, returns the corresponding value from the domain. For example, `cat A` is transfromed to `0.2`, then `0.2` can be inverted to `cat A`.

3. Category: Used for show data range or category information in axis and legend.

Scale is a fundamental task in visilization, and play a important role in G2's data process procedure. For a better understanding of Scale, reference [G2 Dataflow](https://antv.alipay.com/zh-cn/g2/3.x/tutorial/data-flow.html);

## Types of Scale
The types of scale is determined by specific data types. Before that, let's introduce the data types used in Bizcharts.

According the data is linear or not, we have two types of data.

1. Categorical data, specificly, sequential and quantize data.

2. Continuous data, time series data is also a kind of continuous data.

Example:

```js
var data = [
  {"month":"Jan.","temperature":7,"city":"tokyo"},
  {"month":"Feb.","temperature":6.9,"city":"newYork"},
  {"month":"Mar.","temperature":9.5,"city":"tokyo"},
  {"month":"Apr.","temperature":14.5,"city":"tokyo"},
  {"month":"May","temperature":18.2,"city":"berlin"}
]
var scale = {
  month: {
    alias: 'Month' // 为属性定义别名
  },
  temperature: {
    alias: 'Temperature' // 为属性定义别名
  }
};
<Chart scale={scale}/>
```

In the data above, `month` and `city` are both categorical data, while `month` is sequential and `city` is quantize. Obeviously, `temperature` is continuous data.


We provide different scale types to handle different data types. As follows:

| Data types | Scale types |
| ------- | ------- |
| Continuous | linear、log、pow、time |
| Categorical | cat、timeCat |

Additionly, you can use `identity` type to handle **constant** data.

The Scale Object produced by BizCharts has the following properties which all can be customized.

```js
{
  type: string, // Scale type
  range: array, // The output range, [0, 1] by default.
  alias: string, // Every data property can have alias, which is really helpful in the display of legend、axis and tooltip.
  ticks: array, // Ticks information in axis.
  tickCount: number, // The tick's count in axis, different scale type may have different default value.
  formatter: function, // Callback function, used to format the representation of axis, legend and tooltip.
}
```

## Scale API Reference

### Summary

| Type | Description |
| :- | :- |
| identity | used for constant data type |
| [linear](#linear) | continous number, Ex: [1, 2, 3, 4, 5] |
| [cat](#cat) | categorical, ['man', 'woman']|
| [time](#time) | time series, continuous |
| [timeCat](#timeCat) | time series, concrete. Ex: Stock times do not include weekends or open days|
| [log](#log) | continuous nonlinear data transformed by `log`, [1,10,100,1000] is transformed to [0,1,2,3] |
| [pow](#pow) | continuous nonlinear data transformed by `pow`, [2,4,8,16,32] is transformed to [1,2,3,4,5]|

<span id="linear"> </span>

### linear
Used in continuous data, for example, [1, 2, 3, 4, 5], besides the common properties, it also have:
```js
{
  nice: boolean, // Default is true. Extends the domain so that it starts and ends on nice round values. This method typically modifies the scale’s domain, and may only extend the bounds to the nearest round value. For example, if set `nice` to true, the [3, 97] will be extended to [0, 100]
  min: number, // Minimum value in the range. 
  max: number, // Maximum value in the range.
  tickCount: number, // The tick's count in axis, default is 5.
  tickInterval: number, // Determine the interval of ticks. The interval is the original data interval. TickCount and TickInterval can't be set simultaneously.
}
```

<span id="log"> </span>

### log

Log scale applies a logarithmic transform to the input domain value before the output range value is computed. For example, [1, 10, 100, 1000] will be transfromed to [0, 1, 2, 3] at first, then do the normalization operation. Log scales can transform a wide range of data to a well-defined output range.

Log scale is a subset of `Linear scale`. It extends all the `Linear scale`'s properties, expect for `base`.

```js
{
  base: number, // Radix of the log, default is 2.l
}
```

#### Scenarios of Log scale

In the following scenarios, it's recommended to use `Log scale`.

1. When the input data has a very wide distribution, for example, distributed in 0-100, 10000-100000, 10 million - 100 million; 
2. When the input data of a heatmap is unevenly distributed, the there will be only one color near the large numbers. In this extreme case, you should use `Linear scale` to process the input data.

<span id="pow"> </span>

### pow

Pow scale will perform a exponential transform to the input data before the output range value is computed. For example, [2, 4, 8, 16, 32] will be transformed to [1, 2, 3, 4, 5] at first, then do the normalization operation.

Pow scale is a also subset of `Linear scale`. It extends all the `Linear scale`'s properties, expect for `exponent`. 

```jsx
{
  exponent: number, // exponent for the pow function, default is 2.
}
```

<span id="time"> </span>

### time

Continuous time scale is a variant of `Linear scale` that have a temporal domain: domain values are coerced to  `dates` rather than numbers. The unique property of `Time scale` is `mask`.

```jsx
{
  mask: string, // Format the display of time value, defalut is 'YYYY-MM-DD'
}
```

`mask` takes a string of tokens and replaces them with their corresponding values. As follows:

 * y: year
 * m: month
 * d: date
 * H: hour
 * M: minute
 * s: second

The chart can handle the following time formats. It's recommended to transform the orginal time value to the following formats.

1. Timestamp，for example: 1436237115500；// new Date().getTime
2. Date string： '2015-03-01'，'2015-03-01 12:01:40'，'2015/01/05'，'2015-03-01T16:00:00.000Z'。

For discrete time scale, reference [timeCate](#timeCate)

<span id="cat"></span>

### cat

Category scale. Besides the common scale properties, you can alse set the `values` property in `Category scale`.

```js
{
  values: array, // Specity the categories of the given field.
}
```

When generating a `Catgory scale`, the values of the `values` property are typically obtained directly from the orginal data source. But you will need to specify the values manually for the following two scenarios:

1. When you nend to specity the orders among the categories. For example, if the `type` field's orginal value is ['max', 'min', 'moderate'], we want to specify the order of these categories on the axis or in the legend is ['min', 'moderate', 'max']. Then you can config as follows:

```jsx
var data  = [
  {a: 'a1', b:'b1', type: 'min'},
  {a: 'a2', b:'b2', type: 'max'},
  {a: 'a3', b:'b3', type: 'moderate'}
];
var scale = {
  type:{
    type:'cat',
	values: ['min', 'moderate', 'max']
  }
}
<Chart scale={scale}/>
```

In the previous example, if you don't specify the `values` property, then the defalut order will be: 'min', 'max', 'moderate'.

2. If the category type in the data source is enumerable, then you should specify `values` property.

Example:

```jsx
var data  = [
  {a: 'a1', b:'b1', type: 'min'},
  {a: 'a2', b:'b2', type: 'max'},
  {a: 'a3', b:'b3', type: 'moderate'}
];
var scale = {
  type:{
    type:'cat',
	values: ['min', 'moderate', 'max']
  }
}
<Chart scale={scale}/>
```

** specify the `cat` type, and the values in the `values` must be in accordance with the original data source.  **

<span id="timeCat"> </span>

### timeCat

The `timeCat scale` measures the time data, not the continuous time value, but the sorted categorical data. For example, the date of the stock transaction, if use `time scale` in this case, then there is no data on holidays, line charts, k line graph will rupture, so you should use the `timeCat scale` to convert the date time to  orderly classification data. The scale will sort the data by defalut.

`timeCat scale` is a subset of `cat scale`. It extends all the properties of `cat scale` except for `mask`.

```js
{
  mask: string, // Format the display of time value, defalut is 'YYYY-MM-DD'
}
```

