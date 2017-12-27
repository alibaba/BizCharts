
# Interaction 

## Built in interactions
Including：
- active : react to mouse hover event
- select : can or can't be selected by mouse click event

## active 
Whether or not react to mouse hover event. All `<Geom />` is set to `true` by default. Change it manually if needed.

```
<Geom active={false} />
<Geom active={true} />
```

## select
There are three select modes for every geom shape.
1. can't be selected 
2. single select 
3. multiple select

Example:

```jsx
<Geom select={false} />; // can't be selected
<Geom select={true} />; //  can be selected
<Geom select={[true, {
  mode: 'single' || 'multiple', // select mode: single or multiple select
  style: { }, // the shape style after being selected 
  cancelable: true | false, // cancelable after being selected, default is true 
  animate: true | false // animate or not after being selected, default is true 
}]} />;
```

By default, only the `pie chart` support select mode.

**Mostly, you can customize chart's interaction by combining built in interaction with chart's [events](../api/chart.md#event). Reference: [Map drill down](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/map/drill-down)**



