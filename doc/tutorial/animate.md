# 动画
BizCharts 保留和兼容了 G2 中所有的动画功能。

## 动画场景分类

总共分为四种类型：

* appear: 初始化时的入场动画；
* enter: 更新时的出现动画；
* update: 更新时的变化动画；
* leave: 更新时的动画；

## 动画配置参数

* [animation:String]  动画名称,不同类型的动画场景所支持的动画不同，详情[内置动画](#animationType)
* [easing:String | Function]  动画缓动效果
* [delay:Number | Function]  动画延迟执行事件
* [duration:Number | Function]   动画持续事件

使用如下：
```jsx
{
animation: 'fadeIn', // 动画名称
easing: 'easeInQuart' // 动画缓动效果
delay: 100, // 动画延迟执行时间
duration: 600 // 动画执行时间
}
```

## *<Geom/>* 如何使用动画
可以通过 *<Geom/>* 上的 *animate 属性*, 详见 [Geom animate属性](../api/geom.md#animate)

<span id="animationType"></span>

## 支持的动画名称
### enter
- clipIn,
- zoomIn,
- pathIn,
- scaleInY,
- scaleInX,
- fanIn,
- fadeIn

### leave
- lineWidthOut,
- zoomOut,
- pathOut,
- fadeOut

### appear
- clipIn,
- zoomIn,
- pathIn,
- scaleInY,
- scaleInX,
- fanIn,
- fadeIn

### update
- fadeIn
- fanIn

<span id="customAnimate"></span>

## 自定义动画
```js
const Animate = BizCharts.Animate;
/**
* @param  {String} animationType      动画场景类型 appear enter leave update
* @param  {String} 动画名称，用户自定义即可
* @param  {Function} 动画执行函数
**/
Animate.registerAnimation(animationType, animationName, animationFun);
```

图形 Shape 的动画接口说明：`shape.animate(props, duration, delay, easing, callback)`

```js
/**
 * 执行动画
 * @param  {Object}   toProps  动画最终状态
 * @param  {Number}   duration 动画执行时间
 * @param  {Number}   delay    动画延迟时间
 * @param  {String}   easing   动画缓动效果
 * @param  {Function} callback 动画执行后的回调
 */
shape.animate(toProps, duration, delay = 0, easing, callback)
```

### 示例
```jsx
  const Animate = BizCharts.Animate;
  Animate.registerAnimation('appear', 'delayScaleInY', function(shape, animateCfg)     {
    const box = shape.getBBox(); // 获取柱子包围盒
    const origin = shape.get('origin'); // 获取柱子原始数据
    const points = origin.points; // 获取柱子顶点
    // 计算柱子的变换中点
    const centerX = (box.minX + box.maxX) / 2;
    let centerY;
    if (points[0].y - points[1].y <= 0) { // 当顶点在零点之下
      centerY = box.maxY;
    } else {
      centerY = box.minY;
    }
    // 设置初始态
    shape.attr('transform', [
      ['t', -centerX, -centerY],
      ['s', 1, 0.1],
      ['t', centerX, centerY]
    ]);
    const index = shape.get('index');
    let delay = animateCfg.delay;
    if (BizCharts.Util.isFunction(delay)) {
      delay = animateCfg.delay(index);
    }
    let easing = animateCfg.easing;
    if (BizCharts.Util.isFunction(easing)) {
      easing = animateCfg.easing(index);
    }
    // 设置动画目标态
    shape.animate({
      transform: [
        ['t', -centerX, -centerY],
        ['s', 1, 10],
        ['t', centerX, centerY]
      ]
    }, animateCfg.duration, easing, animateCfg.callback, delay);
  });

  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      x: i,
      y: (Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5
    });
  }

ReactDom.render((
  <Chart >
    <Geom type='interval' animate={{
    appear: {
    animation: 'delayScaleInY',
    easing: 'easeElasticOut',
    delay: index => {
      return index * 10;
    }
    }
  }}/>
  </Chart>
), container);
```
