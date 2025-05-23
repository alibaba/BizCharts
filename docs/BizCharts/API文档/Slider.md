# Slider

基于g2-plugin-slider，用于bizcharts的滑块插件。

## 安装

请确保bizcharts已安装完成。

### npm
```sh
$ npm install bizcharts-plugin-slider
```

### html
```html
<script src="https://unpkg.com/bizcharts-plugin-slider@2.0.0/umd/bizcharts-plugin-slider.js"> </script>
```

### dev build
```sh
$ git clone https://github.com/alibaba/BizCharts.git
$ cd BizCharts
$ cd /plugin/slider
$ npm install
$ npm run build
```

### dev demo

```sh
slider $ sudo vi /etc/hosts
// add 127.0.0.1 localhost
slider $ npm run demo
// open in browser http://localhost:3510/
```

## 例子

[demo](https://bizcharts.alibaba-inc.com/product/bizcharts/demo/126)

### 使用说明

```js
<Slider
  width={{number} | {string}}
  height={number}
  padding={{object} | {number} | {array}}
  xAxis={string}
  yAxis={string}
  start={{string} | {number}}
  end={{string} | {number}}
  data={{array} | {dataview}}
  fillerStyle={object}
  backgroundStyle={object}
  textStyle={object}
  handleStyle={object}
  backgroundChart={object}
/>
```
## API

### width
_<number>_ _<string>_
* 描述：设置“滑块”组件的宽度，默认为“自动”，表示自适应容器的宽度。

### height
_<number>_
* 描述：设置“滑块”组件的高度，默认值为26，单位为“ px”。

### padding
_<Array>_
* 描述：将填充画布的画布填充设置为与图表对齐（默认图表的画布容器填充有填充）。 默认值与BizCharts默认主题`[20，20，95，80]`相同。

### xAxis
_<string>_
* 描述：**必须声明** Slider是一个带有背景图的滑块组件，用于声明背景图的水平轴映射字段，该字段也是数据过滤字段。

### yAxis
_<string>_
* 描述：**必须声明** Slider是一个带有背景图的滑块组件，用于声明背景图的垂直轴。

### data
_<array>_ _<dataview>_
* 描述：**必须声明** 数据来源。

### start
_<number>_ _<string>_
* 描述：开始滑块的位置，默认值为X轴最小值。

### end
_<number>_ _<string>_
* 描述：结束滑块的位置，默认值为X轴最大值。

### startRadio
_<number>_ 
* 描述：开始滑块的位置，取值范围0-1，默认值为0。

### endRadio
_<number>_ 
* 描述：结束滑块的位置，取值范围0-1，默认值为1。


### scales
_<object>_
* 描述：用于为图表中的相同列定义xAxis和yAxis字段。
* 具体语法参考 [Scale API](35)


代码示例：

  ```js
  <Slider
      scales={{
        [`${xAxis}`]: {
          type: 'time',
          mask: 'MM-DD'
        }
      }}
  />
  ```
  ```js
  <Slider
      scales={{
        amount: {
          // 此demo用于X轴为非日期类型时用于格式化number类型的数据；
          formatter: function(value){
            return Math.round(value);
          }
        }
      }}
  />
  ```
 
### fillerStyle
_<object>_
* 描述：所选区域的样式配置，默认配置如下：

  ```js
  <Slider
    fillerStyle={{
      fill: '#BDCCED',
      fillOpacity: 0.3
    }}
  />
  ```

下图选择的红色区域: 

<img src="https://gw.alipayobjects.com/zos/rmsportal/iYFxRgDjRSiCyVPFozik.png" style="width: 59%;">

### backgroundStyle
_<object>_
* 描述：滑块背景样式。

### textStyle
_<object>_
* 描述：滑块文字样式。

### handleStyle
_<object>_
* 描述：滑块样式的配置，可配置的属性如下:

```js
  <Slider
  handleStyle={{
    img: 'https://gw.alipayobjects.com/zos/rmsportal/QXtfhORGlDuRvLXFzpsQ.png', 
    width: 5,
    height: 26
  }}
/>
```

### backgroundChart
_<object>_
* 描述：滑块的背景图表配置允许配置图表类型和颜色。

```js
<Slider
  backgroundChart={{
  type: [ 'area' ], // chart类型, either a string or an array
  color: '#CCD6EC'
  }}
/>
```

### onChange
_<function>_
* 描述：当滑块改变时，触发回调函数，主要用于更新ds的状态。 回调函数提供一个参数，该参数是一个包含以下属性的对象：

```js
<Slider
onChange = {(obj) => {
  const { startValue, endValue, startText, endText } = obj;
}}
/>


-  `startValue` 开始滑块的原始数据值，如果类型为`time`或`timeCat`，则值为timestamp，请注意。
-  `endValue` 结束滑块的原始数据值，如果类型为`time`或`timeCat`，则值为timestamp，请注意。
-  `startText` 开始滑块当前显示的文本值
-  `endText` 结束滑块当前显示的文本值

```

> 注意：区分文本与值的原因是在大多数情况下，用户将格式化数字。 因此，在设置状态数量和更新状态数量时，需要确保前后的值类型相同。
