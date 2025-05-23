# Polygon

由任意多个点构成的封闭图形是多边形，多边形一般用于以下应用：

- 多个分类数据生成的色块图。
- 连续数据生成的马赛克图。
- 地图等多个点构成的多边形。
- 层次数据生成的填充树图。

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

### adjust 
_<string>_ _<object>_
* 描述：声明几何标记对象的数据调整方式，可用于绘制层叠图、扰动图、分组图等。支持的调整类型包括： 'stack', 'dodge', 'jitter', 'symmetric'。
```js
<Polygon positon="x*y" adjust="stack" color="type" />
// 或者
<Polygon 
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
 详细属性配置及自定义label，请看[Label属性及自定义label](/product/BizCharts4/category/61/page/183)

### tooltip 
_<boolean>_
* 描述：控制当前 Geometry 几何标记的 tooltip 开关,该 Geometry 的数据将不展示在 tooltip 内容框中


可对展示内容进行配置:
```js
 // data: [{x: 'a', y: 10}]
 <Polygon tooltip="x" />

 <Polygon tooltip="x*y"/>
 
 // 方法同样支持数据映射及回调用法：
 //  <Tooltip itemTpl="<li>{x}: {y}</li>" />
 
 <Polygon tooltip={{
     fields: [ 'x', 'y' ],
     callback: (x, y) => {
       return {
         x,
         y,
       };
     },
   }} />
   
 // 等同于
 
 <Polygon tooltip={['x*y', (x, y) => {
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








