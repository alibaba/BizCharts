
# Label
Label is a text component for [`<Geom>`](geom.md) .

## Instruction
`<Label ／>` only can be nested in [`<Geom/>`](geom.md) , as below show:
```jsx
<Geom>
  <Label content='sales' />
</Geom>
```

## Properties
### 1、content 	* String | Array:[String, Function] *
The content of label can be specified by this props, example:
```jsx
<Label
  content="any string"
  // or
  content="sales*date"
  // or
  content={["sales*date", (sales, date)=>{
    return `${data}:${sales}`;
  }]}
/>
```
### 2、labelLine     * Object | Boolean *

DEFAULT: true

labelLine is the line between label and gemetry, which can be hidden once set false. other properties can be specified as below:
```jsx
<Label
  labelLine={{
    lineWidth: 1, // the width of label line
    stroke: '#ff8800', // the color of label line
    lineDash: [ 2, 1 ], // use this property to set dash line's style
  }}
/>
```

### 3、offset  	* Number *
Distance from label to geometry.

### 4、textStyle  	* Object *
Style of label text can be specified as below: 
 ```jsx
<Label
  content='sales'
  textStyle={{
    textAlign: 'center', // alignment of label text: 'start'|'middle'|'end'
    fill: '#404040', // color of label text
    fontSize: '12', // font size of label text
    fontWeight: 'bold', // weight of label text
    rotate: 30,
    textBaseline: 'top' // baseline of label test: top middle bottom，默认为middle
  }}
/>
```
property of fill can support functon as below:
```jsx
<Label
  content='sales'
  textStyle={{
    textAlign: 'center', // alignment of label text: 'start'|'middle'|'end'
    fill: (sales)=>{
	  if(sales > 1000)
	    return '#ff0000';
	  return '#00ff00';
	}
  }}
/>
```

### 5、autoRotate  	* Boolean *

DEFAULT: true

Enable label to rotate when there's no enough space to show the entire label text.

### 6、formatter  	* Function *

Formatter let `<Label ／>` support a function to format the label shown 

```jsx
<Label
  content='name'
  formatter={(text, item, index)=>{
	var point = item.point;
	var percent = point['percent'];
	percent = (percent * 100).toFixed(2) + '%';
	return name + ' ' + percent;
  }}
/>
```

### 7、htmlTemplate  	* Function *

`<Label ／>` support custom html to rendering the label, if set the property of htmlTemplate, the function will be called to render the label content.

```jsx
<Label
  content='name'
  htmlTemplate={(text, item, index)=>{
	var point = item.point;
	var percent = point['percent'];
	percent = (percent * 100).toFixed(2) + '%';
	// custom html template
	return '<span class="title" style="display: inline-block;width: 50px;">' + text + '</span><br><span style="color:' + point.color + '">' + percent + '</span>';
  }
/>
```
