# useChartInstance



用于获得G2的chart实例的hooks。
图表可以有多个图层，每个图层都是一个图表, 由父级view.createView。rootChart 即指最顶层chart实例。
g2 开放了许多开发者使用的api，详细请见：
https://antv-g2.gitee.io/zh/docs/api/g2

使用案例
以下
```js

function Slider(props: ISliderProps) {
  const chart = useChartInstance();
  chart.option('slider', props);
  return null;
}

// 这样我们的一个简化的Slider组件就完成了。可以查看g2开发者文档，封装你自己的图表组件。
// 使用
<Chart data={[]} >
  <Slider/>
  <Line position="x*y"/>
</Chart>

```