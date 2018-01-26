
# Facet
Facet, it's used to split dataset as several dataset according to the specified data field name. Each of the splited dataset will be showed as an facet chart view, and 
all the facet chart view will be layouted according to facet type, maybe as matrix, tree, list or others.

In general, facet provides two funcitons.
- Split dataset according to the specified dimensions;
- Layout all the splited datasets's chart;

![e68863a6-f139-444f-a800-75613046dcc4.png](https://gw.alipayobjects.com/zos/rmsportal/HlUJdjfYCEeeOKsBREnp.png)

<span id="shuoming"></span>

## Parent Components
[`<Chart />`](chart.md) 

## Child Components
[`<View />`](view.md)

## Properties
### 1、type 	* 'rect' | 'list' | 'circle' | 'tree' | 'mirror' *
The type of facet.

|type	|description|
|  :--  |  :--  |
|[rect](#rect) |default type, specify two field name, form the matrix facet chart.|
|[list](#list) |specity one field name|
|[circle](#circle) |specity one field name, form the circle facet chart|
|[tree](#tree) |specity several field name, each dimesion as the tree level.|
|[mirror](#mirror) |specity one field name, form the mirror facet chart.|
|[matrix](#matrix) |specify two field name, form the matrix facet chart.|

### 2、fields 	* String | Array *
Fields are used to split dataset, it's the field name of dataset.
Use array when more then one field name.
Different facet type's accept different length of fields.

[detail of facet type](#facetType)。

### 3、margin 	* Number *
The margin between views.

### 4、padding 	* Number *
The padding between views.

### 5、showTitle 	* Boolean *
Whether to show title.
default: true;

### 6、autoSetAxis 	* Boolean *
Uset to auto layout the axis's label, that's can avoid overlapping.
default: true;

### 7、colTitle 	* Object *
The column title's style.
```jsx
<Facet
  colTitle={{
	offsetY: -15,
	style: {
	fontSize: 14,
	textAlign: 'center',
	fill: '#444'
  }}
/>
```

### 8、rowTitle 	* Object *
The row title's style.
```jsx
<Facet
  rowTitle={{
	offsetX: -15,
	style: {
	fontSize: 14,
	textAlign: 'center',
	fill: '#444'
  }}
/>
```

### 9、eachView 	* Function *
That's can be used to set each facet view's chart according diffent facet dataset info.
That's will confict with facet view's child component, facet view's child component has higher priority.

```jsx
<Facet type='matrix' fields = {['cut','clarity']} eachView={(view, facet) => {
  view.point().position('carat*price');
}} />
```



<span id="facetType"></span>
# The Facet Type

<span id="rect"></span>
## rect
rect 矩形分面是 BizCharts 的默认分面类型。支持按照一个或者两个维度的数据划分，按照先列后行的顺序。

![rect](https://img.alicdn.com/tfs/TB17qp1aRTH8KJjy0FiXXcRsXXa-1600-856.png)

```jsx
<Facet type='rect' fields = {['cut','clarity']}>
  {(view, facet)=>{
    view.point().position('carat*price').color('cut');
  }}
</Facet>
// or
<Facet type='rect' fields = {['cut','clarity']}>
	<View>
	  <Geom type='point' position='carat*price' />
	</View>
</Facet>
```
<span id="list"></span>
## list
At list facet user can use `scale` to set the row numer of chart's facet view.

![list](https://img.alicdn.com/tfs/TB1dv82aL6H8KJjy0FjXXaXepXa-1600-856.png)

```jsx
<Facet type='list' fields = {['cut']}>
  {(view, facet)=>{
		view
		.point()
		.position('carat*price')
		.color('cut')
		.shape('circle')
		.size(3)
		.opacity(0.3)
  }}
</Facet>
// or
<Facet type='list' fields = {['cut']}>
	<View>
		<Geom 
			type='point' 
			position='carat*price' 
			color='cut' 
			shape='circle' 
			size={3} 
			opacity={0.3}
		/>
	</View>
</Facet>
```

[list demo](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/facet/list)


<span id="circle"></span>
## circle
![circle](https://img.alicdn.com/tfs/TB1Sbh2aN6I8KJjy0FgXXXXzVXa-1600-856.png)
``` jsx
<Facet 
	type='circle' 
	fields={['clarity']} 
	eachView={(view, facet)=>{
		var data = facet.data;
		var dv = new DataView();
		dv.source(data).transform({
			type: 'aggregate',
			fields: [ 'price' ],
			operations: [ 'mean' ],
			as: [ 'mean' ],
			groupBy: [ 'cut' ]
		});
		view.source(dv);
		view.interval().position('cut*mean').color('cut');
	}}
/>
```

[circle demo](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/facet/circle)


<span id="tree"></span>
## tree
Have `line` and `lineSmooth` property
- line: facet line's style.
- lineSmooth: default is false.

![tree](https://img.alicdn.com/tfs/TB1uqt1aRTH8KJjy0FiXXcRsXXa-1600-856.png)
[tree demo](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/facet/tree)

<span id="mirror"></span>
## mirror
When `transpose` is true, mirror facet will be transposed.

![mirror](https://img.alicdn.com/tfs/TB10945aMvD8KJjy0FlXXagBFXa-1600-856.png)

[mirror demo](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/facet/mirror)

<span id="matrix"></span>
## matrix

![matrix](https://img.alicdn.com/tfs/TB13GkjbOqAXuNjy1XdXXaYcVXa-800-428.png)

[matrix demo](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/facet/matrix)
