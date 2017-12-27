# Animate
*Reference: [G2 Animate](https://antv.alipay.com/zh-cn/g2/3.x/api/animate.html)*

BizCharts implements all the features of G2's animation.

## Animation Types

Animation comes with the element's lifecycle. There are four scenarios you can deal with `animate` API.

* appear: initial create of element, aka first mount
* enter: applied when a new element added to the exist animation queue 
* update: applied when element update
* leave: applied when element leave

## Animation configuration

Applied animation in different animation scenario, just define as follows. 

* [animation:String] animation name, different scenario supports different animatioin. Reference: [Built in Animations](#animationType)
* [easing:String | Function]  easing function
* [delay:Number | Function]  Configures the delay between the time the element is loaded and the beginning of the animation sequence.
* [duration:Number | Function]  Configures the length of time that an animation should take to complete one cycle.

Examples：
```jsx
// when element enter, the animation will take effect. Same with appear, update, leave.
{
  enter: {
    animation: 'fadeIn', // animation name
    easing: 'easeInQuart' // easing function
    delay: 100, // animation delay
    duration: 600 // animation duration
  }
}
```

## How to implement `animate` in \<Geom />
*Reference: [Geom animate](../api/geom.md#animate)*

<span id="animationType"></span>

## Built in animation
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

## Customize animation
```js
const Animate = BizCharts.Animate;
/**
* @param  {String} animationType, animation types: appear enter leave update
* @param  {String} animationName, customized animation name
* @param  {Function} animationFun, animation function
**/
Animate.registerAnimation(animationType, animationName, animationFun);
```

The mechanism of animate: `shape.animate(props, duration, delay, easing, callback)`

```js
/**
 * apply animation
 * @param  {Object}   toProps  final state of the shape
 * @param  {Number}   duration animation duration 
 * @param  {Number}   delay    animation delay 
 * @param  {String}   easing   easing function 
 * @param  {Function} callback callback when animation ends 
 */
shape.animate(toProps, duration, delay = 0, easing, callback)
```
For more detail about `easing` function, reference [d3.ease](https://github.com/d3/d3-ease)

### Examples
```jsx
  const Animate = BizCharts.Animate;
  Animate.registerAnimation('appear', 'delayScaleInY', function(shape, animateCfg)     {
    const box = shape.getBBox(); // get the outter box of the shape
    const origin = shape.get('origin'); // get the source data of the shape 
    const points = origin.points; // key points of the shape 
    // caculate the center of the shape 
    const centerX = (box.minX + box.maxX) / 2;
    let centerY;
    if (points[0].y - points[1].y <= 0) {  
      centerY = box.maxY;
    } else {
      centerY = box.minY;
    }
    // set initial state 
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
    // set final state
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
