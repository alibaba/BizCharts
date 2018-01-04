# View

`View`, generated and managed by `Chart` instances, have their own independent data sources, coordinate systems, and layers for visualizing heterogeneous data and chart combinations. A `Chart` consists of one or more `View`, so the properties on the `View` are basically the same as the `Chart`.

## Instruction

### Parent Components
`<View />`
### Child Components
[`<Coord />`](coord.md) [`<Axis />`](axis.md) [`<Geom />`](geom.md) [`<Legend />`](legend.md) [`<Tooltip />`](tooltip.md) [`<Guide />`](guide.md)  [`<Facet />`](facet.md) [`<View />`](view.md) 

**In the actual development process, many charts can be used View components to achieve, including but not limited to the following:**

* `View` in the same container when two or more different coordinate system chart appears, as shown below: [Demo](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/pie/sunburst)
![image | center](https://img.alicdn.com/tfs/TB1GqOTa4rI8KJjy0FpXXb5hVXa-1600-856.png)

* When two charts in the same container need different data sources. As shown below: [Demo](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/funnel/symmetric)
![image | center](https://img.alicdn.com/tfs/TB1w1flbhrI8KJjy0FpXXb5hVXa-1600-856.png)



```html
// Here only shows part of the core code
<Chart width={600} height={400} data={data}>
<Coord type="theta" radius={0.5} />
<Geom
  type="pie"
  position={Stat.summary.percent('value')}
  color={['type', ['#4E7CCC', '#36B3C3', '#F9815C']]}
/>
<View data={data}>
  <Coord type="theta" inner={0.75} />
  <Geom
    type="pie"
    position={Stat.summary.percent('value')}
    color="name"
  />
</View>
</Chart>
```

## Properties
### 1、id 	* String *
id, used to uniquely demarcate the view, Bizcharts will provide a set of id generation mechanism ('view' + views.length, such as view0, view1, ..., viewN) by default if the user does not specify.

### 2、start 	* Object *
The starting coordinate of the drawing area, both x and y are in the range of 0 -1.
Example:
```jsx
<View start={{x:0.5, y:0.5}} />
```
### 3、end 	* Object *
The end coordinates of the drawing area, both x and y are in the range of 0 -1.

Example:
```jsx
<View end={{x:0.5, y:0.5}} />
```

### 4、data 	* Array | DataSet *
Use the same method as `Chart`'s [`data` property](chart.md#data).

### 5、animate 	* Boolean *
View whether to animate.
Default: true.

### 6、scale 	* Object *
Use the same method as `Chart`'s [scale property](chart.md#scale)。

### 7、filter 	* Object *
Use the same method as`Chart`'s [filer property](chart.md#filter)。

