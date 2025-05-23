# Schema

用于绘制箱型图或烛形图。
箱型图，又称盒须图、盒式图或箱线图，是一种用作显示一组数据分布情况的统计图。
烛形图，原名 K 线图，蜡烛图，又称阴阳图、棒线、红黑线或蜡烛线，常用于展示股票交易数据。

## API

### position 
_<string>_ _<required>_
* 描述：绘制的图形折点的坐标。`"x轴映射的字段*y轴映射的字段"`,例`"x*y"`。

### color 
_<string>_ _<array>_
* 描述：配置折线的颜色。
- 其值可以是一个固定的颜色`color='#ff0000'`;
- 渐变色配置例： `color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"`
- 通过数据显示颜色，例：`color="dataField"`
- 当值是一个数组，数组的第一个元素是映射的字段名，第二个值可选填，来指定映射的颜色序列，不填则使用默认颜色。
  例：`color={['dataField', ['#ff0000', '#ffff00']]}`
- 当映射的数据是个连续数据的时候，映射的颜色为渐变色。
  例：`color={['dataField', '#ff0000-#ffff00']}`
- 使用回调函数进行颜色值的自定义；可以使用多个字段使用、*号连接。
  ```js
  color={['x', (xVal) => {
    if (xVal === 'a') {
      return 'red';
    }
    return 'blue';
  }]} 
  ```

[试一试](https://bizcharts.alibaba-inc.com/gist/2fgxOIja4qm)

### label 
_<string>_ _<array>_
* 描述：配置图形的标注
- 基础用法
```js
// const data = [ {x: 1, y: 2, z: 'a'}, {x: 2, y: 2, z: 'b'} ]

// 在每个图形上显示 y 字段对应的数值
<Schema position="x*y" label="y" />
```
- 在每个图形上显示 x 字段对应的数值，同时配置文本颜色为红色
```js
<Schema position="x*y" label={["x", { style: { fill: 'red' } }]} />
```
- 渲染每个图形上显示 x 字段对应的数值，同时格式化文本内容,以及配置条件样式。
```js
<Schema
  position="x*y"
  label={[
    "x",
    (xValue) => {
    return {
        content: xValue + '%',
        style: {
          fill: 'red',
        }
      };
    }
  ]}
/>
```
详细属性配置及自定义label，请看[Label属性及自定义label](/product/BizCharts4/category/61/page/183)

### adjust 
_<string>_ _<object>_
* 描述：声明几何标记对象的数据调整方式，可用于绘制层叠图、扰动图、分组图等。支持的调整类型包括： 'stack', 'dodge', 'jitter', 'symmetric'。
```js
<Schema positon="x*y" adjust="stack" color="type" />
// 或者
<Schema 
  positon="x*y"
  adjust= {[
    {
      type: 'dodge',
      // 对于 'dodge' 类型，可以额外进行如下属性的配置:
      marginRatio: 0, // 取 0 到 1 范围的值（相对于每个柱子宽度），用于控制一个分组中柱子之间的间距
      dodgeBy: 'x', // 该属性只对 'dodge' 类型生效，声明以哪个数据字段为分组依据
    },
    {
      type: 'stack',
      // 对于 'stack' 类型，可以额外进行如下属性的配置:
      reverseOrder: false, // 用于控制是否对数据进行反序操作
    }
  ]}
/>
```

### shape 
_<string>_ _<array>_
* 描述：将数据值映射到图形的形状上的方法。支持如下几种用法
- 'field'，将指定的字段映射到内置的 shapes 数组中;
```js
//代码示例
<Schema shape='city'/>
```
- ['field', shapes]，用户自己提供 shapes 数据，来进行数据映射；
```js
//代码示例
<Schema shape={['city', ['circle', 'rect']]} />
```
- ['fields', callback]，使用回调函数获取 shape，用于个性化的 shape 定制，可以根据单个或者多个字段确定；
```js
//代码示例
<Schema
  shape={['city', (city)=>{
    if(city == 'hangzhou'){
      return 'circle';
    }
    return 'rect';
  }]}
/>
```
- 'shapeType'，指定常量，将所有数据值映射到固定的 shape
```js
//代码示例
<Schema shape='box' />
```
| shape 类型 | 解释 |
| --- | --- |
| 'box' | 箱形 |
| 'candle' | 烛形 |


### size 
_<string>_ _<array>_ _<number>_
* 描述：用于配置图形的宽度。有以下几种用法：
-  _<number>_ 直接指定像素大小。
```js
//代码示例
<Schema size={3}/>
```
- 'field'，指定映射到 size 的字段，使用内置的默认大小范围为 [1, 10]；
```js
//代码示例
<Schema size='count'/>
```
- ['field', [ min, max ]]，指定映射到 size 字段外，还提供了 size 的最大值和最小值范围；
```js
//代码示例
<Schema size={['count', [1, 10]]}/>
```
- ['fields', callback)]，使用回调函数映射 size，用于个性化的 size 定制，可以使用多个字段进行映射；

```js
//代码示例
<Schema size={['count', (count)=>{
  if(count > 1000)
    return 10;
  else return 1;
}]}/>
```

### tooltip 
_<boolean>_
* 描述：控制当前 Geometry 几何标记的 tooltip 开关,该 Geometry 的数据将不展示在 tooltip 内容框中


可对展示内容进行配置:
```js
 // data: [{x: 'a', y: 10}]
 <Schema tooltip="x" />

 <Schema tooltip="x*y"/>
 
 // 方法同样支持数据映射及回调用法：
 //  <Tooltip itemTpl="<li>{x}: {y}</li>" />
 
 <Schema tooltip={{
     fields: [ 'x', 'y' ],
     callback: (x, y) => {
       return {
         x,
         y,
       };
     },
   }} />
   
 // 等同于
 
 <Schema tooltip={['x*y', (x, y) => {
       return {
         x,
         y,
       };
     }]} />

// 其返回的值必须为对象，该值中的属性同 Tooltip 的 itemTpl 模板相对应，返回的变量可用于 itemTpl 的字符串模板。
```


### style 
_<object>_ _<number>_
* 描述：配置几何图形的样式。

当 style 的值是 Object 时，该 Object 中只能设置固定样式。

当 style 的值是 Array 时，可以通过回调函数根据具体的数据去动态配置样式。

style 的更详细的配置项 [绘图属性](/product/BizCharts4/category/61/page/114)
```js
//代码示例
<Geom
  style={{
    lineWidth:1
  }}
  //或者
  style={['sales*city', (sales,city)=>{
  const res = { lineWidth:1 };
  if(city === 'hangzhou' && sales > 1000) res.stroke = "#ff0000";
  else res.stroke = "#00ff00";
  return res;
   }]}
/>
```


### animate 
_<boolean>_ _<object>_
* 描述：开启或者关闭动画， 传入object时进行动画配置，详细[配置动画](/product/BizCharts4/category/72/page/115)。








