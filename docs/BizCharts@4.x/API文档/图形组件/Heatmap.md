# Heatmap

用于热力图的绘制。

## API

### position 
_<string>_ _<required>_
* 描述：绘制热区的坐标。`"x轴映射的字段*y轴映射的字段"`例`"x*y"`。

### tooltip 
_<boolean>_
* 描述：控制当前 Geometry 几何标记的 tooltip 开关,该 Geometry 的数据将不展示在 tooltip 内容框中

可对展示内容进行配置:
```js
 // data: [{x: 'a', y: 10}]
 <Heatmap tooltip="x" />

 <Heatmap tooltip="x*y"/>
 
 // 方法同样支持数据映射及回调用法：
 //  <Tooltip itemTpl="<li>{x}: {y}</li>" />
 
 <Heatmap tooltip={{
     fields: [ 'x', 'y' ],
     callback: (x, y) => {
       return {
         x,
         y,
       };
     },
   }} />
   
 // 等同于
 
 <Heatmap tooltip={['x*y', (x, y) => {
       return {
         x,
         y,
       };
     }]} />

  // 其返回的值必须为对象，该值中的属性同 Tooltip 的 itemTpl 模板相对应，返回的变量可用于 itemTpl 的字符串模板。
```
### color 
_<string>_ _<array>_
* 描述：配置途径的颜色。
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
* 描述：配置途径的标注
- 基础用法
```js
// const data = [ {x: 1, y: 2, z: 'a'}, {x: 2, y: 2, z: 'b'} ]

// 在每个图形上显示 y 字段对应的数值
<Heatmap position="x*y" label="y" />
```
- 在每个图形上显示 x 字段对应的数值，同时配置文本颜色为红色
```js
<Heatmap position="x*y" label={["x", { style: { fill: 'red' } }]} />
```
- 渲染每个图形上显示 x 字段对应的数值，同时格式化文本内容,以及配置条件样式。
```js
<Heatmap
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

### animate 
_<boolean>_ _<object>_
* 描述：开启或者关闭动画， 传入object时进行动画配置，详细[配置动画](/product/BizCharts4/category/72/page/115)。








