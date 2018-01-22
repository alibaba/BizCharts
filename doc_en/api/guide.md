
# Guide
Guide components are used to annotate chart. Such as to annotate the text, special region and so on.

<img src="https://gw.alipayobjects.com/zos/rmsportal/ekrHtCkdfMttjnAXqApH.png" width="500px">

## Instruction

### Parent Components
`<Guide />`
### Child Components
[`<Line />`](#line) [`<Image />`](#image) [`<Text />`](#text) [`<Region />`](#region) [`<Html />`](#html) [`<Arc />`](#arc) 

- Different configuration properties should be supported by the corresponding auxiliary mark components,  which differ in coordinate position properties.
  - `position` is used in the `Text`,` Html`.
  - `start`、`end` are used in the `Line`, `Region`, `Image`, `Arc`.


**The description of position value**
- Object using chart x,y  corresponding to the original data. For example: {time: ‘2010-01-01’, value: 200}.
- Array to configure the position [x, y], depending on the value of the array exists in the following forms:
	- x, y are the original data [‘2010-01-01’]
	- x，y can use alternative strings of original data ‘min’, ‘max’, ‘median’ . For example:[‘median’, 200]
	- x, y are used as a percentage of the positioning in the drawing area, there is a '%' in the string.  For example: [‘50%’, ‘50%’] make the auxiliary element centered.
- Callback function can dynamically determine the location of auxiliary elements.
```jsx
// Applied to dynamic update of data, the position of auxiliary elements varies according to the data.
<Guide>
  <Text
    content='Maximum'
    position={(xScale, yScale)=>{
      return []; // location information
    }}
  />
</Guide>
```

## Use example
![e051f3e7-35ab-4895-8aa6-89fba3045da9.png](https://img.alicdn.com/tfs/TB16XZ8bOqAXuNjy1XdXXaYcVXa-1186-510.png)
```jsx
<Chart width={600} height={400} data={data}>
  <Guide>
    <Region start={[-1, 0]} end={[1, ranges[0]]} style={{fill: '#e96e33',
    fillOpacity: 0.5}}/>
    <Region start={[-1, ranges[0]]} end={[1, ranges[1]]} style={{fill: '#f9ca47',
    fillOpacity: 0.5}}/>
    <Region start={[-1, ranges[1]]} end={[1, ranges[2]]} style={{fill: '#88bb34',
    fillOpacity: 0.5}}/>
  </Guide>
</Chart>
```
[demo link](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/other/bullet-graph)

## Properties
`<Guide>` Component is mainly used to manage the rendering of the child components and the property update of the child components that below it. It does not have properties that need to be configured.

<span id = "line"></span>

## Line

```jsx
<Guide>
  <Line
    top={boolean} // Specify whether the guide is drawn on the canvas top, the default is false, that will be drawed at the bottom.
    start= {object} | {function} | {array} // The starting position of the auxiliary line, the value of the original data, support callback
    end= {object} | {function} | {array} // The end of the auxiliary line, the value of the original data, support callback
    lineStyle= {{
      stroke: '#999', // Line color
      lineDash: [ 0, 2, 2 ], // Dotted setting
      lineWidth: 3 // Line width
    }} // Graphic style configuration
    text={{
      position: 'start' | 'center' | 'end' | '39%' | 0.5, // The location of the text
      autoRotate: {boolean}, // Whether the arrangement along the angle, the default is true
      style: {object}, // Text graphic style configuration
      content: {string}, // The content of the text
      offsetX: {number}, // x-direction offset
      offsetY: {number} // y-direction offset
    }}
  />
</Guide>
```

### 1、top 	*Boolean*
Specify whether the guide is drawn on the canvas top.
The default is false, that will be drawed at the bottom.

### 2、start 	*Object | Function | Array*
- Object using chart x,y  corresponding to the original data. For example: {time: ‘2010-01-01’, value: 200}.
- Array to configure the position [x, y], depending on the value of the array exists in the following forms:
	- x, y are the original data [‘2010-01-01’]
  - x，y can use alternative strings of original data ‘min’, ‘max’, ‘median’ . For example:[‘median’, 200]
	- x, y are used as a percentage of the positioning in the drawing area, there is a '%' in the string.  For example: [‘50%’, ‘50%’] make the auxiliary element centered.
- Callback function can dynamically determine the location of auxiliary elements.

### 4、end 	*Object | Function | Array*
Specify the end of the auxiliary line. Same as start.

### 5、lineStyle 	*Object*
Auxiliary line style configuration.
<span id = "text"></span>

### 6、text *Object*
Auxiliary lines can take the text, this attribute is used as follows:
```jsx
<Guide>
  <Line
    text={{
      position: 'start' | 'center' | 'end' | '39%' | 0.5, // Where text is displayed, values can be percentages or decimals, in addition to the specified constants.
      autoRotate: {boolean}, // The specified text is arranged along the direction of the line, the default is true, that is, arranged along the line.
      // Set the text display style
      style: {
        fill: 'red'
      },
      content: {string}, // The content of the text
      offsetX: {number}, // x-direction offset
      offsetY: {number} // y-direction offset
    }}
  />
</Guide>
```

<span id = "text"></span>

## Text

```jsx
<Guide>
  <Text
    top= {boolean} // Specify whether the guide is drawn on the canvas top, the default is false, that will be drawed at the bottom.
    position= {object} | {function} | {array} // The starting position of the text, the value of the original data, support callback
    content= {string} // Displayed text content
    style= {{
      fill: '#666', // Text color
      fontSize: '12', // Text size
      fontWeight: 'bold' // Text thickness
      rotate: 30 // Rotation angle
    }} // Graphic style properties for text
    offsetX= {number} // x-direction offset
    offsetY= {number} // y-direction offset
  />
</Guide>
```
### 1、top 	*Boolean*
Specify whether the guide is drawn on the canvas top.
The default is false, that will be drawed at the bottom..

### 2、position 	* Object|Function|Array *
Specify the display position of the auxiliary text, the value of the type as follows:
- Object using chart x,y  corresponding to the original data. For example: {time: ‘2010-01-01’, value: 200}.
- Array to configure the position [x, y], depending on the value of the array exists in the following forms:
	- x, y are the original data [‘2010-01-01’]
  - x，y can use alternative strings of original data ‘min’, ‘max’, ‘median’ . For example:[‘median’, 200]
	- x, y are used as a percentage of the positioning in the drawing area, there is a '%' in the string.  For example: [‘50%’, ‘50%’] make the auxiliary element centered.
- Callback function can dynamically determine the location of auxiliary elements.

### 3、content 	*String*
Display text content.

### 4、style 	* Object *
Auxiliary line style configuration.

### 5、offsetX 	* Number *
x-direction offset.

### 6、offsetY 	* Number *
y-direction offset.

<span id = "image"></span>

## Image

```jsx
<Guide>
  // Auxiliary image, just specify start. The point represents the coordinates of the upper left corner of the picture.
  <Image
    top = {boolean} // Specify whether the guide is drawn on the canvas top, the default is false, that will be drawed at the bottom.
    start= {object} | {function} | {array} // The starting position of the image, the value of the original data, support callback
    src= {string} // The path to the picture
    width= {number}
    height= {number}
    offsetX= {number} //  x-direction offset
    offsetY= {number} //  y-direction offset
    />
    // Auxiliary image, by specifying the start and end to determine the location and width and height of the picture
    <Image
      top = {boolean} // Specify whether the guide is drawn on the canvas top, the default is false, that will be drawed at the bottom.
      start= {object} | {function} | {array} // The starting position of the image, the value of the original data, support callback
      end= {array} | {function} | {array} // The end of the image, the value of the original data, support callback
      src= {string} // The path to the picture
      width= {number}
      height= {number}
      offsetX= {number} // x-direction offset
      offsetY= {number} // y-direction offset
    />
</Guide>
```

### 1、top 	*Boolean*
Specify whether the guide is drawn on the canvas top.
The default is false, that will be drawed at the bottom..

### 2、start 	*Object|Function|Array*
Specify the starting position of the auxiliary picture, that is, the upper left corner of the picture, the type of the value is as follows:

- Object using chart x,y  corresponding to the original data. For example: {time: ‘2010-01-01’, value: 200}.
- Array to configure the position [x, y], depending on the value of the array exists in the following forms:
	- x, y are the original data [‘2010-01-01’]
  - x，y can use alternative strings of original data ‘min’, ‘max’, ‘median’ . For example:[‘median’, 200]
	- x, y are used as a percentage of the positioning in the drawing area, there is a '%' in the string.  For example: [‘50%’, ‘50%’] make the auxiliary element centered.
- Callback function can dynamically determine the location of auxiliary elements.
### 3、end 	*Object|Function|Array*
Optional, specify the auxiliary image of the end position, that is, the lower right corner of the picture, the property usage with start. When the start and end properties are declared at the same time, the width and height of the picture are specified.

### 4、src 	*String*
Specify the address of the picture, it can be a path, it can be base64 encoding.

### 5、width 	*Number*
Used to set the width of the image when only the start property is specified.

### 6、height 	*Number*
Used to set the height of the image when only the start property is specified.

### 7、offsetX 	*Number*
x-direction offset

### 8、offsetY 	*Number*
y-direction offset

<span id = "region"></span>

## Region

```jsx
<Guide>
  <Region
    top={boolean} // Specify whether the guide is drawn on the canvas top, the default is false, that will be drawed at the bottom.
    start= {object} | {function} | {array} // The starting position of the region, the value of the original data, support callback
    end= {object} | {function} | {array}// Auxiliary region end position, the value of the original data, support callback
    style= {{
      lineWidth: 0, // The border width of auxiliary region
      fill: '#f80', // The filled colors of auxiliary region
      fillOpacity: 0.1, // The background transparency of auxiliary region
      stroke: '#ccc' // The border color settings of auxiliary region
    }} // The graphic style attributes of auxiliary region
    />
</Guide>
```
### 1、top 	*Boolean*
Specify whether the guide is drawn on the canvas top.
The default is false, that will be drawed at the bottom..

### 2、start 	*Object|Function|Array*
Specify the starting position of the auxiliary background region, that is, the upper left corner of the background region, the type of the value is as follows:

- Object using chart x,y  corresponding to the original data. For example: {time: ‘2010-01-01’, value: 200}.
- Array to configure the position [x, y], depending on the value of the array exists in the following forms:
	- x, y are the original data [‘2010-01-01’]
  - x，y can use alternative strings of original data ‘min’, ‘max’, ‘median’ . For example:[‘median’, 200]
	- x, y are used as a percentage of the positioning in the drawing area, there is a '%' in the string.  For example: [‘50%’, ‘50%’] make the auxiliary element centered.
- Callback function can dynamically determine the location of auxiliary elements.

### 3、end 	*Object|Function|Array*
Specify the end of the auxiliary background region, which is the bottom right of the background region. Same as start.

### 4、style 	*Object*
Auxiliary region graphic style properties.

<span id = "html"></span>

## Html

```jsx
<Guide>
  <Html
    position={object} | {function} | {array} // The center position of HTML, the value of the original data, support callback
    alignX='left' | 'middle' | 'right'
    alignY='top' | 'middle' | 'bottom'
    offsetX={number}
    offsetY={number}
    html={string} // html code
    zIndex={number}
  />
</Guide>
```

### 1、position 	*Object | Function |Array*
Set the html display position, the value of the type as follows:

- Object using chart x,y  corresponding to the original data. For example: {time: ‘2010-01-01’, value: 200}.
- Array to configure the position [x, y], depending on the value of the array exists in the following forms:
	- x, y are the original data [‘2010-01-01’]
  - x，y can use alternative strings of original data ‘min’, ‘max’, ‘median’ . For example:[‘median’, 200]
	- x, y are used as a percentage of the positioning in the drawing area, there is a '%' in the string.  For example: [‘50%’, ‘50%’] make the auxiliary element centered.
- Callback function can dynamically determine the location of auxiliary elements.

### 2、zIndex 	*Number*
html hierarchy.

### 3、alignX 	*'left' | 'middle' | 'right'*
The horizontal alignment of Html, which can be: left, middle, right. The default value is middle.

### 4、alignY 	*top' | 'middle' | 'bottom'*
The vertical alignment of Html, which can be: top, middle, bottom. The default value is middle.

### 5、offsetX 	*Number*
x-direction offset

### 6、offsetY 	*Number*
y-direction offset

### 7、html 	*String | Function*
The content of Html that needs to be displayed.

<span id = "arc"></span>

## Arc

```jsx
<Guide>
  <Arc
    top={object} // Specify whether the guide is drawn on the canvas top, the default is false, that will be drawed at the bottom.
    start={object} | {function} | {array} // Auxiliary arc starting position, the value of the original data, support callback
    end={object} | {function} | {array}// Auxiliary arc end position, the value of the original data, support callback
    style={object} // The attributes of  graphic style 
  />
</Guide>
```

### 1、top 	*boolean*
Specify whether the guide is drawn on the canvas top.
The default is false, that will be drawed at the bottom..

### 2、start 	*Object|Function|Array*
Specify the starting position of auxiliary arc, the type of this value is as follows:

- Object using chart x,y  corresponding to the original data. For example: {time: ‘2010-01-01’, value: 200}.
- Array to configure the position [x, y], depending on the value of the array exists in the following forms:
	- x, y are the original data [‘2010-01-01’]
  - x，y can use alternative strings of original data ‘min’, ‘max’, ‘median’ . For example:[‘median’, 200]
	- x, y are used as a percentage of the positioning in the drawing area, there is a '%' in the string.  For example: [‘50%’, ‘50%’] make the auxiliary element centered.
- Callback function can dynamically determine the location of auxiliary elements.


### 3、end 	*Object|Function|Array*
Specify the end of the auxiliary arc, this attribute is the same as start.

### 4、style 	*Object*
To set the arc's display style.
