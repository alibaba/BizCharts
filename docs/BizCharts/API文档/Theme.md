# Theme

在图表样式上，Bizcharts 提供了丰富的自定义配置选项，既可从全局设置，也支持 Chart 级别的主题设置和局部设置数据层级的设置。
## 图表主题
Bizcharts默认提供了两种图表主题： default、dark。
![](https://gw.alipayobjects.com/zos/rmsportal/EQadCjVFfaXjuPbSySJp.png)

## 图表样式设置
### 新增主题
新增主题可以使用 Global 上的 registerTheme 接口。
```js
const { Global } = G2; // 获取 Global 全局对象
Global.registerTheme('newTheme', {
  colors: [ 'red', 'blue', 'yello' ]
}); // 传入两个参数，一个参数是主题的名称，另一个参数是主题配置项
```
这样就可以在全局切换这个主题或者在 chart 新建的时候指定设置的主题了。

### 全局图表主题切换
直接传入主题名
```js
const { Global } = G2; // 获取 Global 全局对象
Global.setTheme('dark'); // 传入值为 'default'、'dark' 的一种，如果不是，那么使用 default 主题。
```

### 变更全局样式
G2 图表样式的配置项都是设置到全局变量 G2.Global 上，可以通过如下两种方式进行局部的样式设置：
1. 直接赋值给全局对象 Global，但是不推荐
```js
const { Global } = G2; // 获取 Global 全局对象
Global.animate = false ; // 关闭默认动画
Global.colors = [ 'red', 'blue', 'yellow' ]; // 更改默认的颜色
```
2. 使用 Global.setTheme 方法。推荐使用这种方式，使用方法如下:
```js
const { Global,Util,Theme } = G2; 
const theme = Util.deepMix({
  animate: false,
  colors: {...},
  shapes: {...}
  // 具体的配置项详见 api/global.html
}, Theme);

Global.setTheme(theme); // 将主题设置为用户自定义的主题
```
对于数据级别或者更细粒度的样式设置，可以通过 geom 对象上的 color 图形属性方法或者各个 chart 配置项上的图形属性设置。

更多 Global 上关于主题的配置属性，可以直接查看 `G2.Global` 的返回值。

#### Global 上可以配置的信息
* 全局的控制变量：柱子的默认宽度、版本号、折线图遇到 Null 时的处理策略
```js
const Global = {
  version: '3.2.0-beta.3',
  renderer2d: 'canvas',
  // renderer2d: 'svg',
  trackable: true,
  animate: true,
  snapArray: [ 0, 1, 2, 4, 5, 10 ],
  // 指定固定 tick 数的逼近值
  snapCountArray: [ 0, 1, 1.2, 1.5, 1.6, 2, 2.2, 2.4, 2.5, 3, 4, 5, 6, 7.5, 8, 10 ],
  widthRatio: { // 宽度所占的分类的比例
    column: 1 / 2, // 一般的柱状图占比 1/2
    rose: 0.9999999, // 玫瑰图柱状占比 1
    multiplePie: 1 / 1.3 // 多层的饼图、环图
  },
  // 折线图、区域图、path 当只有一个数据时，是否显示成点
  showSinglePoint: false,
  connectNulls: false,
  scales: {
  }
};
```
更多的查看：https://g2-v3.antv.vision/zh/docs/api/global


 ## Chart 级别主题切换
同一个上下文现在支持多种主题共存，上述两个图表，通过给第二个图表指定主题，可以切换其主题;
```js
<Chart height={400} data={data} theme="dark" forceFit />
```
