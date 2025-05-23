# Effects

BizCharts@4.0新添加了Effects组件，可以直接使用[G2的语法](https://g2.antv.vision/zh/docs/manual/about-g2)对chart对象进行配置，方便开发人员测试与扩展属性。


## API

传入方法的入参chart即为G2的chart对象。

```js
<Effects>
{(chart) => {
  // 处理过滤器之后的数据
  chart.getData().forEach(() => {
    return <Annotation.Text  {...}/>
  })
}}
</Effects>
```