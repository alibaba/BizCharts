![](https://img.shields.io/badge/language-react-red.svg)  ![](https://img.shields.io/badge/license-MIT-000000.svg)  [![NPM Package](https://img.shields.io/npm/v/bizcharts-plugin-slider.svg)](https://www.npmjs.com/package/bizcharts)[![NPM Downloads](https://img.shields.io/npm/dm/bizcharts-plugin-slider.svg)](https://npmjs.org/package/bizcharts)

# bizcharts-plugin-slider

A datazoom slider plugin for BizCharts base g2-plugin-slider.

## Installation

Please make sure BizCharts has been already loaded.

### npm
```sh
$ npm install bizcharts-plugin-slider
```

### html
```html
<script src=https://unpkg.com/bizcharts-plugin-slider@2.0.0/umd/bizcharts-plugin-slider.js"> </script>
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

## Usage
see [demo](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/other/rain-and-flow)


## API Reference

### Create an instance

```jsx
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
### Property

#### 1、 `width` *number | string*

设置 slider 组件的宽度，默认为 `auto`，表示自适应容器的宽度。

#### 2、 `height` *number*

设置 slider 组件的高度，默认为 26，单位为 'px'。

#### 3、 `padding`

设置 slider 组件所在画布 canvas 的内边距，用于与图表对齐（默认图表的 canvas 容器也是带了内边距），默认值同 BizCharts 默认主题的 padding 相同，[ 20, 20, 95, 80 ]。

#### 4、 `xAxis` *string*

**必须声明** Slider 是带有背景图表的滑动条组件，该字段用于声明该背景图表的横轴映射字段，同时该字段也是数据过滤字段。

#### 5、 `yAxis` *string*


**必须声明** Slider 是带有背景图表的滑动条组件，该字段用于声明该背景图表的纵轴轴映射字段。

### 6、 `data` *array | dataview*

**必须声明**，数据源。

#### 7、 `start` *number | string*


声明滑动条起始滑块的位置对应的数据值，默认为最小值。

#### 8、 `end` *number | string*

声明滑动条结束滑块的位置对应的数据值，默认为最大值。

#### 9、 `scales` *object*

用于对 `xAxis` 和 `yAxis` 字段进行列定义，用于同操作的图表中对应的列定义相同。

示例代码：

  ```jsx
  <Slider 
      scales={{
        [`${xAxis}`]: {
          type: 'time',
          mask: 'MM-DD'
        }
      }}
  />
  ```

#### 10、 `fillerStyle` *object*

选中区域的样式配置，默认配置如下：

  ```jsx
  <Slider 
    fillerStyle={{
      fill: '#BDCCED',
      fillOpacity: 0.3
    }}
  />
  ```

图中红框框选区域： <img src="https://gw.alipayobjects.com/zos/rmsportal/iYFxRgDjRSiCyVPFozik.png" style="width: 59%;">

#### 11、 `backgroundStyle` *object*

slider 整体背景样式。

#### 12、 `textStyle` *object*

slider 辅助文本字体样式配置。

#### 13、 `handleStyle` *object*

slider 滑块的样式配置，可配置的属性如下：

  ```jsx
    <Slider 
    handleStyle={{
      img: 'https://gw.alipayobjects.com/zos/rmsportal/QXtfhORGlDuRvLXFzpsQ.png', // 可以使图片地址也可以是 data urls
      width: 5,
      height: 26
    }}
  />
  ```

#### 14、 `backgroundChart` *object*
slider 滑块的背景图表配置，可配置其图表类型以及颜色：

  ```jsx
  <Slider 
    backgroundChart={{
    type: [ 'area' ], // 图表的类型，可以是字符串也可是是数组
    color: '#CCD6EC'
    }}
  />
  ```
  
#### 15、 `onChange` *function*

当滑动条滑块发生变化时，触发该回调函数，主要用于更新 ds 的状态量。该回调函数会提供一个参数，该参数是一个对象，包含如下属性：

  ```jsx
  <Slider 
  onChange = {(obj) => {
    const { startValue, endValue, startText, endText } = obj;
  }}
  />
  ```

  * `startValue` 起点滑块当前对应的原始数据值，如果是 `time` 或者 `timeCat` 类型是，该值为时间戳，请注意。
  * `endValue` 终点滑块当前对应的原始数据值，如果是 `time` 或者 `timeCat` 类型是，该值为时间戳，请注意。
  * `startText` 起点滑块当前的显示文本值
  * `endText` 终点滑块当前的显示文本值

> 说明：之所以区分 text 和 value，是因为大部分情况下用户会对数值进行格式化，所以在设置状态量和更新状态量时，需要保证前后数值类型的一致。
