## 1. 坐标轴空间不够

<p data-spm-anchor-id="0.0.0.i7.343a5626TIW59t"><span style="font-size: medium;"><span style="" data-spm-anchor-id="0.0.0.i4.343a5626TIW59t"><span md-inline="plain" style="">通过配置</span><span style="" data-spm-anchor-id="0.0.0.i6.343a5626TIW59t">组件的&nbsp;</span></span><a href="/product/bizcharts/category/7/page/24#padding" target="_blank">padding属性</a>&nbsp;调整图表的内边距给非图形区更多空间。</span></p><p data-spm-anchor-id="0.0.0.i7.343a5626TIW59t"><span style="font-size: medium;" data-spm-anchor-id="0.0.0.i4.343a5626TIW59t">通过配置<span md-inline="plain" style="">&nbsp;组件中 </span><span md-inline="link" style=""><a spellcheck="false" href="../api/axis#content" style=""><span md-inline="plain">content属性</span></a><span md-inline="plain" style="" data-spm-anchor-id="0.0.0.i11.343a5626TIW59t"> 上的 formatter 或者 rotate 值，让 label 的文字占用更少的空间。</span></span></span></p>

---

## 2. 坐标轴label自定义

<p data-spm-anchor-id="0.0.0.i3.de8856265Gg0yc"><span style="font-size: medium;"><span md-inline="plain" style="">通过配置组件中&nbsp;</span><span md-inline="link" style=""><span md-inline="plain" data-spm-anchor-id="0.0.0.i3.de885626n74PiV" style=""><a href="/product/bizcharts/category/7/page/26#label" target="_blank" style="">label属性的formatter</a>&nbsp;上的 formatter 函数控制。</span></span></span><br></p>

---

## 3. tooltip显示

<p><span style="font-size: medium;">通过 组件 Geom 上的 tooltip 控制 tooltip 中的显示内容<br>通过组件上的 itemTpl 和 containerTpl 两个属性用通过 HTML 去控制 tooltip 的显示<br>特别复杂的场景可以通过 Chart 上的 onTooltipChange 事件来格式化显示内容。</span></p>

---

## 4. tooltip自定义

- 通过 `<Tooltip>` 组件上的 [itemTpl](/product/bizcharts/category/7/page/29#itemtpl) 和 [containerTpl](/product/bizcharts/category/7/page/29#containertpl) 两个属性用通过 HTML 去控制 tooltip 的显示。模版中的参数值'{name}' '{value}' 可以通过GEMO的[tooltip](/product/bizcharts/category/7/page/27#tooltip)属性进行修改
```JSX
<Chart>
    <Tooltip
      containerTpl='<div class="g2-tooltip"><p class="g2-tooltip-title"></p><table class="g2-tooltip-list"></table></div>'
      itemTpl='<tr class="g2-tooltip-list-item"><td style="color:{color}">{name}</td><td>{value}</td></tr>'
      offset={50}
      g2-tooltip={{
        position: 'absolute',
        visibility: 'hidden',
        border : '1px solid #efefef',
        backgroundColor: 'white',
        color: '#000',
        opacity: '0.8',
        padding: '5px 15px',
        transition: 'top 200ms,left 200ms'
      }}
      g2-tooltip-list={{
        margin: '10px'
      }}
    />
  <Geom tooltip={["x*y*z", (x,y,z) => {
    return { color: 'red', value: y, name: x };
  }]} />
</Chart>
```

---

## 5. Legend 中分类过多，导致部分内容被遮盖该怎么处理？

这种情况下可以通过自定义 Legend 展示来解决：设置 **useHtml** 属性为 true，同时设置 **g2-legend** 对 legend 的样式做调整。具体 [g2-legend]( /product/bizcharts/category/7/page/29#g2)

---

## 6. 切换到其他页面再切换回的时候，图表会超出原来宽度，必须 resize 浏览器窗口才可恢复

首先推荐容器初始化时设置容器 size，如果切换页面后还有自适应问题，可以设置图表 **forcetFit**，例如：
```javascript
render() {
    if (this.chart) {
      this.chart.forceFit();
    }
    return (<Chart
      {...opts}
      onGetG2Instance={(chart) => {
        this.chart = chart;
      }}
    />);
  }
```
除此之外，还可以在组件 componentDidMount 时，主动触发 window resize 事件。

---

## 7. 标题和坐标轴重合怎么解决?

可以通过设置 ```Axis``` 的 title 属性来解决，例如：
```JSON
{
  offset: {Number}, // 设置标题 title 距离坐标轴线的距离
}
```
具体 API 可参考以下：[Axis](/product/bizcharts/category/7/page/26)


---

## 8. 如何修改指定某个数据的颜色？

Geom 上的 **color** 属性支持对字段自定义颜色，具体 API 可参考以下：[Geometry](/product/bizcharts/category/7/page/27)


---

## 9. 坐标轴刻度非常密，导致部分文字被遮盖

可以通过修改坐标轴 ```Axis``` 的 **label** 属性，调整坐标轴文字的排版，具体 API 可参考：
[Axis](/product/bizcharts/category/7/page/26)

---

## 10. 坐标轴连续的数据集，如何做分段展示？

可以设置 Chart ```scale```  **formatter** 属性做数据格式化处理，具体 API 可参考：[Scale](/product/bizcharts/category/7/page/24#scale)


---

## 11. 如何通过拿到点图中某一个点的坐标，来拿到这个点，并这个点处于hover状态？

可以通过底层的 ```geom.setShapesActived```  ，```geom.getShapes()``` 方法来实现.


---

## 12. 如何让折线图中的线变得圆滑？

可以通过设置 ```<Geom shape="smooth" />``` 解决


---

## 13. 图表支持框选操作与右键操作吗？

右击操作暂不支持，未来会有支持计划；框选操作可以实现。

---

## 14. 图表设置 padding 为 auto 后，这个 padding 是如何计算的？

目前是只会计算 **formatter** 前 label 的边框，暂时可以先手动设置 padding 的边距来解决。


---

## 15. 图表如何保存为图片格式？

1. 拿到 chart 实例：

```JSX
function exportCanvasAsPNG(canvasElement, fileName) {
    var MIME_TYPE = "image/png";
    var imgURL = canvasElement.toDataURL(MIME_TYPE);
    var dlLink = document.createElement('a');
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}
<chart
  onGetG2Instance={chartIns => {
      // 拿到canvas元素，后续便可以在需要的时候调用exportCanvasAsPNG方法
      const canvas = c.canvas.get('el')
  }}
/>
```

---

## 16. 如何知道 canvas 渲染完成？

可以通过拿到 chart 实例，并监听 ```afterrender``` 事件实现。如何拿到 g2 chart 实例可以参考：[文档](/product/bizcharts/category/7/page/24#ongetg2instance)

## 如何获取Canvase实例

```JSX
<Chart width={600} height={400} data={data} scale={scale} onGetG2Instance={chartIns => {
  console.log(chartIns.get('canvas')); // 可以拿到g 的canvas实例，然后你可以使用g的语法来画。
  console.log(chartIns.get('canvas')._cfg.el); // 拿到Dom
}}></Chart>
```

---

## 17. 为什么图表绘制区域会有留白情况？

这种情况是因为图表默认有 padding 造成的，而且 padding 不对称，可以通过调整 padding 解决。


---

## 18. 如何调整柱状图间的间距？

可以通过设置 Geom 的 **marginRatio** 调柱子间距，具体 API 可参考：[adjust](/product/bizcharts/category/7/page/27#adjust)


---

## 19. 如何知道 tootip 在鼠标左边还是右边？

tooltip 的局部目前只有CSS效果，在左边右边是没有属性值区分的，要自己去写逻辑判断，比如你可以在 tooltip ```onShow``` 的回调中做判断。


---

## 20. value都为0的情况下，能否显示饼图？

不能。


---

## 21. 在 Facet 中，多个图的 tooltip 可以联动显示吗？

默认是不可以的。但可以自定义tooltip的内容达到同样的效果
```shared: true```

---

## 22. 怎么设置tooltip init初始化时就默认选中某一个选项

```js
const data = [
  { category: 'Sports', sold: 275 },
  { category: 'Strategy', sold: -255 },
  { category: 'Action', sold: 120 },
  { category: 'Shooter', sold: 650 },
  { category: 'Other', sold: 150 }
]

// 默认选中第四项的结果
const handleAlwaysShowTooltip = ev => {
  ev.showTooltip(ev.getXY(data[3]))
}

<Chart data={data} onGetG2Instance={handleAlwaysShowTooltip} ></Chart>
```
![](https://img.alicdn.com/tfs/TB1jAs2vmcqBKNjSZFgXXX_kXXa-569-470.png)


---

## 23. 图形区域太靠左或太靠右? 用scale range

![](https://img.alicdn.com/tfs/TB1chKviAL0gK0jSZFAXXcA9pXa-1988-1150.png_500x500)
![](https://img.alicdn.com/tfs/TB1PrKriqL7gK0jSZFBXXXZZpXa-692-89.png_500x500)

---

## 24. 双Y轴 刻度线和轴标题 对不齐？用scale tickCount

![](https://img.alicdn.com/tfs/TB1dqWzixD1gK0jSZFKXXcJrVXa-229-477.png)

[参考case](https://bizcharts.net/products/bizCharts/demo/detail?id=g2-line-of-dashed&selectedKey=%E6%8A%98%E7%BA%BF%E5%9B%BE)

---

## 25. 雷达图的label太长了，可以折行吗？

用label useHtml

[label useHtml demo](../api/label#htmltemplate)


---

## 26. 雷达图的文字能隐藏么？

用 axis label

![](https://img.alicdn.com/tfs/TB1taOwiBv0gK0jSZKbXXbK2FXa-796-640.png_500x500)

[axis label API文档](/product/bizcharts/category/7/page/26#label)

---

## 27. 如何判断图表绘制完成？

```jsx
chart.on('afterrender', () => {console.log('afterRender')});
```

---

## 28. 使用slider时，不是用来做为日期的调节，而是用来对x轴整数的过滤，但slider显示的是小数，怎么才让显示成整数?

用scale formatter
![](https://img.alicdn.com/tfs/TB1c8myiy_1gK0jSZFqXXcpaXXa-2218-1172.png_500x500)
 [Slider scale formatter API](/product/bizcharts/category/7/page/34)

---

## 29. 图表展示bizcharts error 和 slider error 是什么原因？

bizchart引入了react 16.x的Error Boundary，从而保证了发生在 UI 层的错误不会连锁导致整个应用程序崩溃；未被任何异常边界捕获的异常可能会导致整个 React 组件树被卸载。Error Boundary能够捕获渲染函数、生命周期回调以及整个组件树的构造函数中抛出的异常，捕获后返回bizcharts error这样的提示。


---

## 30. 实现拖动缩放交互，用zoom 或 drag

<span style="font-size: medium;" data-spm-anchor-id="0.0.0.i2.594956263f7ICj">体验demo&nbsp;</span><a href="https://codepen.io/fengyue/pen/WNNwJEZ" target="_blank">https://codepen.io/fengyue/pen/WNNwJEZ</a>

---

## 31. 图表在display:none 切换到 display:block 没有正常渲染？

用触发resize事件

原理：display:none时，size=0，此时主动触发容器的resize事件，能能获取到最新size，从而触发渲染；

![](https://img.alicdn.com/tfs/TB1IiB6jhD1gK0jSZFsXXbldVXa-1677-596.png_500x500)

---

## 32. 数据中有小时，但是坐标轴只显示年月日?

用scale mask
![](https://img.alicdn.com/tfs/TB1yWgukFT7gK0jSZFpXXaTkpXa-404-100.png)
![](https://img.alicdn.com/tfs/TB1cYwAkKH2gK0jSZJnXXaT1FXa-978-151.png_500x500)

[scale mask API](/product/bizcharts/category/7/page/35#mask)

---

## 33. 一个line类型的图表里面，如果有多条线，页面加载的时候，能默认隐藏其中几条吗？

用filter
![](https://img.alicdn.com/tfs/TB1bDEWl8v0gK0jSZKbXXbK2FXa-1924-918.png)
![](https://img.alicdn.com/tfs/TB1KfUWl8v0gK0jSZKbXXbK2FXa-981-212.png)

---

## 34. BizCharts私家小护士

私家小护士需要获取AppKey，请私聊 @风月

---

## 35. 闰年 20200229 报错问题 图表渲染显示异常，显示 “bizcharts error”

<div><p>Type Error: Invalid Time: 20200229</p></div>修改方法参考&nbsp;<a href="/product/bizcharts/category/7/page/35#time" target="_blank">文档</a>&nbsp;,错误是因为数据格式不符合时间类型<p><br></p>

---

## 36. DataSet undefined

<span style="font-size: medium;">这时需要检查一下webpack配置里面，是不是将@antv/data-set作为了external。如果是的话，说明为了减小代码打包后的体积，@antv/data-set并没有被打包在里面，所以需要通过页面引入CDN的形式来引用DataSet。链接如下："//gw.alipayobjects.com/os/antv/assets/data-set/0.8.6/data-set.min.js"</span><div><span style="font-size: medium;"><br></span></div><div data-spm-anchor-id="0.0.0.i14.2e7d5626YfYh48"><img src="http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/e97a0d50-69a2-11ea-9a32-fd95cba014d2.png" style="max-width:30%;" data-spm-anchor-id="0.0.0.i12.2e7d5626YfYh48"><span style="font-size: medium;"><br></span></div><p data-spm-anchor-id="0.0.0.i17.2e7d5626YfYh48"><img src="http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/e3f1bb30-69a2-11ea-ac30-3d100cc049e9.png" data-spm-anchor-id="0.0.0.i15.2e7d5626YfYh48" style="max-width:30%;"><br></p>

---

## 37. legend slidable 不能隐藏滑块

slidable 控制滑块是否可以滑动，visible 才控制隐藏显示

---

## 38. 两个柱状度设了一样的颜色，但是渲染在一个屏幕上结果颜色不同

g2 底层有一个透明度的设置，所以会跟设置的颜色值不一样；数据不同时透明度叠加不同所以导致两个颜色会有差异。在 Geom 上设置相同的透明度可保持颜色一致

---

## 39. 如何关闭饼图点击让点击区域的饼向外移动一段距离的动画

在 Geom 上设置 select={false}

---

## 40. x坐标轴最后不展示数据

<span style="font-size: medium;">因为文字会重叠，所以会被忽略，配置scale nice 为false</span><p><img src="http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/1b8f8e00-69a3-11ea-beeb-e142f8287389.png" style="max-width:100%;" data-spm-anchor-id="0.0.0.i18.343a5626TIW59t"><br></p>

---

## 41. BizCharts 引用 CDN UMD NPM

CDN地址：https://gw.alipayobjects.com/os/lib/bizcharts/4.0.14/umd/BizCharts.js

NPM安装：npm install bizcharts --save

UMD名称：BizCharts

文档详见：https://bizcharts.net/product/BizCharts4/category/61/page/98#%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96-bizcharts

---

## 42. padding设置auto，点击legend出现压盖

将padding=‘auto’去掉，要么设置具体的padding，要么通过css控制。

---

## 43. 只有一条数据 但希望坐标轴线左侧有空白

X轴scale的type，如果是时间设置为timeCat

---

## 44. 父容器CSS transform scale缩放后，鼠标交互异常

临时解决方案，参考[demo](/gist/2wS0KTrxkKJ)
```javascript
import { G2 } from 'bizcharts';
/**
 * 在G2初始化前，替换 G.Canvas.getPointByClient 函数，适配CSS缩放的场景。
* */

// 获取Canvas，不同版本略有差别
// 3.x
const { Canvas } = G2.G;
// 4.x
const { Canvas } = G2.getEngine('canvas');

// 后续操作一样
// 原始的计算坐标方法
const rawGetPointByClient = Canvas.prototype.getPointByClient;
// 由于需要运行时this指针，这个函数不可改为箭头函数。
Canvas.prototype.getPointByClient = function(clientX, clientY) {
  // 获取原函数返回的坐标值
  const raw = rawGetPointByClient.call(this, clientX, clientY);
  // 获取设定高宽和真实高宽。
  // 当设定的高宽不等于getBoundingClientRect获取的高宽时，说明存在缩放。
  const el = this.get('el');
  const bbox = el.getBoundingClientRect();
  const setWidth = this.get('width');
  const setHeight = this.get('height');
  const { width: realWidth, height: realHeight } = bbox;
  // 除以缩放比（真实高宽 / 设定高宽）获得真实的坐标。
  return {
    x: raw.x / (realWidth / setWidth),
    y: raw.y / (realHeight / setHeight),
  };
};
```


---

## 45. Legend 截断、隐藏、显示不全

增大 maxItemWidth
属性文档查看：
https://bizcharts.net/product/BizCharts4/category/62/page/81#maxitemwidth

---

## 46. 图例自定义

参考如下demo：[自定义-marker symbol](https://bizcharts.net/gist/2x99ChgPo0o)、[折线图图例-实心圆](https://bizcharts.net/gist/2x8c94U6eSP)、[自定义图例项-折柱混合图](https://bizcharts.net/product/BizCharts4/demo/500)

---

## 47. Invalid Date in fecha.format

bizcharts@3.x https://bizcharts.net/product/bizcharts/demo/525

bizcharts@4.x https://bizcharts.net/product/BizCharts4/demo/524


---

## 48. 坐标轴数据顺序错乱

如果出现Y轴数据排序错乱问题，先检查下数据是不是字符类型，如果是字符类型有俩种解决办法：
- 将字符数据转成数值类型，即"2" --> 2
- scale type设置为'linear'或者'linear-strict'

---

