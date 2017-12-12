# bizcharts-plugin-slier

A datazoom slider plugin for BizCharts base g2-plugin-slider.

## Installation

Please make sure BizCharts has been already loaded.

### npm
```sh
$ npm install bizcharts-plugin-slier
```

### 
```html
 <script src=`https://unpkg.com/bizcharts-plugin-slider@${version}/umd/bizcharts-plugin-slider.min.js`></script>
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
see (demo src)[https://github.com/alibaba/BizCharts/blob/slider/demo/index.js]
see (demo)[https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/other/rain-and-flow]

## Property

### 1、width		* String  |  Number *
设置 slider 组件的宽度，默认为 auto，表示自适应容器的宽度。

### 2、height  * Number*
