![](https://img.shields.io/badge/language-react-red.svg)  ![](https://img.shields.io/badge/license-MIT-000000.svg)  [![NPM Package](https://img.shields.io/npm/v/bizcharts-plugin-slider.svg)](https://www.npmjs.com/package/bizcharts)  [![NPM Downloads](https://img.shields.io/npm/dm/bizcharts-plugin-slider.svg)](https://npmjs.org/package/bizcharts)

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

Set the width of the `slider` component, the default is `auto`, indicating the width of the adaptive container.

#### 2、 `height` *number*

Set the height of the `slider` component, the default is 26, the unit is '`px`'.

#### 3、 `padding`

Sets the padding canvas's canvas's padding to align with the chart (the default chart's canvas container is padded with padding). The default is the same padding as `BizCharts` default theme, `[20, 20, 95, 80]`.

#### 4、 `xAxis` *string*

**Must declare** Slider is a slider component with a background graph that is used to declare the horizontal axis mapping field of the background chart, which is also the data filtering field.

#### 5、 `yAxis` *string*


**Must declare** Slider is a slider component with a background graph that is used to declare the vertical axis of the background graph.

### 6、 `data` *array | dataview*

**Must declare**，data source.

#### 7、 `start` *number | string*


The value of the slider that declares the position of the slider at the beginning of the corresponding data value, the default is the minimum value.

#### 8、 `end` *number | string*

The data value corresponding to the position where the slider finishes the slider is declared, and the default is the maximum value.

#### 9、 `scales` *object*

Used to define the columns for the `xAxis` and `yAxis` fields for the same column definitions in the action's chart.

Sample code:

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

The selected area of the style configuration, the default configuration is as follows:

  ```jsx
  <Slider 
    fillerStyle={{
      fill: '#BDCCED',
      fillOpacity: 0.3
    }}
  />
  ```

Red box in the picture selected area: <img src="https://gw.alipayobjects.com/zos/rmsportal/iYFxRgDjRSiCyVPFozik.png" style="width: 59%;">

#### 11、 `backgroundStyle` *object*

slider background style.

#### 12、 `textStyle` *object*

slider auxiliary text font style configuration.

#### 13、 `handleStyle` *object*

The slider style configuration, configurable properties are as follows:

  ```jsx
    <Slider 
    handleStyle={{
      img: 'https://gw.alipayobjects.com/zos/rmsportal/QXtfhORGlDuRvLXFzpsQ.png', // Can make the picture address can also be data urls
      width: 5,
      height: 26
    }}
  />
  ```

#### 14、 `backgroundChart` *object*
The slider's background chart configuration allows you to configure its chart type and color:

  ```jsx
  <Slider 
    backgroundChart={{
    type: [ 'area' ], // The type of chart, either a string or an array
    color: '#CCD6EC'
    }}
  />
  ```
  
#### 15、 `onChange` *function*

When the slider slider changes, trigger the callback function, mainly used to update the state of `ds`. The callback function provides a parameter, which is an object that contains the following properties:

  ```jsx
  <Slider 
  onChange = {(obj) => {
    const { startValue, endValue, startText, endText } = obj;
  }}
  />
  ```

  * `startValue` The current raw data value corresponding to the start slider, if the type is` time` or `timeCat`, the value is timestamp, please note.
  * `endValue` The current corresponding raw data value of the end slider, if the type is` time` or `timeCat`, the value is timestamp, please note.
  * `startText` Start slider current display text value
  * `endText` The current display text value of the end slider

> NOTE: The reason for distinguishing text from value is that users will format numbers in most cases. Therefore, when setting the state quantity and updating the state quantity, you need to ensure that the value types are the same before and after.
