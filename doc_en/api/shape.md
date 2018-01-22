
# shape

Geometry, `BizCharts` retains the `G2` provides more than a dozen geometry, but also supports the user through the `Shape` on the interface to customize the geometry.

## Instruction
The use of custom `Shape` is as follows:
```jsx
var Shape = BizCharts.Shape;
// Register the `Shape` named `shapeName` to the corresponding `geomType`
var shapeObj = Shape.registerShape('geomType', 'shapeName', {
  getPoints: function(pointInfo) {
    // Get the key points for each shape draw
  },
  draw: function(cfg, container) {
    // Customize the final drawn logic
  }
});

ReactDOM.render((
 <Chart>
   // Use the registered name as `shapeName` geometry in `<Geom />` corresponding to `geomType`
   <Geom type='interval' shape='shapeName' />
 </Chart>
), container)
```

## Methods
### getPoints
The `getPoints` method is used to calculate the key points for drawing each shape. Each shape in `BizCharts` is connected by a few key points.

The `pointInfo` data passed in from the `getPoints` method is structured as follows. All values are normalized (ie, data in the range 0 to 1):

```js
{
  size: 0.1, // The shape of the size, different shape of the meaning of different, 0 - 1 range of data
  x: 0.2, // The normalized x-coordinate of this point
  y: 0.13, // The normalized y-coordinate of this point
  y0: 0.1 // The y-axis of the entire dataset corresponds to the minimum value of the data, but also the normalized data, note that y will also be an array if the source data corresponding to y is an array
}
```
The following table lists the key point formation mechanisms for each `geom` geometry:
geom type | Description
---- | ----
point | Draw point is very simple, as long as the coordinates and size to get it, which `size` attribute represents the radius of the point. <br>![image](https://zos.alipayobjects.com/skylark/940c75cf-8400-415a-9e2d-040ce46e6a03/attach/3378/269e0e2c77a555a5/image.png)
line | Line is composed of numerous points, we will participate in the mapping of the various data into coordinates on the point and then through the line will be connected one by one to form a line graph, which `size` attribute represents the thickness of the line. <br>![image](https://zos.alipayobjects.com/skylark/f9b84b83-1cc8-4b81-9319-f643ef0e280a/attach/3378/d49e02be2f48a136/image.png)
area | The area surface is actually formed on the basis of a line, which is filled with color or texture between the polyline and the axis of the argument in the line chart. <br>![image](https://zos.alipayobjects.com/skylark/dbcd60f3-7662-4ebd-8e0e-85d7d754d0c7/attach/3378/f67277978d5d8e3e/image.png)
interval | The default shape of a rectangle is a rectangle, and the rectangle is actually composed of four points. We calculate these four points according to the four values of x, y, size and y0 in `pointInfo`, and then connect them clockwise.<br>![image](https://zos.alipayobjects.com/skylark/f36a2e27-13e8-4d55-8c93-b698e15bcc1f/attach/3378/94a6515e2eb60265/image.png)
polygon | In fact, the polygon is also connected by multiple points. In `pointInfo`, both x and y are array structures.<br>![image](https://zos.alipayobjects.com/skylark/b4f6981c-ccd3-4237-97bd-dd88950758ea/attach/3378/ed2b5c05a1ff3581/image.png)
schema | Schema as a custom geometry, the default box and candle are provided in two shapes, were used to draw the box diagram and stock chart, note that the rectangular shape of the two parts of the four points are connected clockwise, And the starting point for the lower left corner, so you can seamlessly switch to polar coordinates.<br>![image](https://zos.alipayobjects.com/skylark/340c229d-be30-4f98-8a2a-8d55c8422645/attach/3378/1bfed6f3f5f90e13/image.png)![image](https://zos.alipayobjects.com/skylark/8afa13da-95d1-4282-a08b-f1c421b0d972/attach/3378/d82c45d3a526bd80/image.png)
edge | Edge as the same as Line, the difference is that edge is a line segment, the two sides can be connected to the edge.

### draw
`getPoints` is used to calculate the key points of the shape, then the `draw` method is used to define how to connect these keys.

#### Parameters

- `cfg`: Object

This parameter contains all the data after the graph mapping and the original data corresponding to the data, the structure is shown in the figure below:

![image](https://zos.alipayobjects.com/skylark/505c6cb1-fde7-4714-98b6-43cb77099f19/attach/3378/332f7e3e64bc48f5/image.png)

The raw data is stored in `cfg.origin._origin` and the graphics keys calculated by `getPoints` are stored in points. The `cfg` object `color`, `size`, `shape` are mapped by the graphics property data, you can use directly.

- `container`: G2.G.Group

Graphic container, you need to add a custom shape to the container in order to eventually render.

**In addition, we also provide some tools to help users quickly convert the normalized data into coordinates on the canvas.** When using it, you can directly call the above two methods through the following methods:
```jsx
Shape.registerShape('interval', 'rect', {
  getPoints: function(pointInfo) {
    // ...
  },
  draw: function(cfg, container) {
    // ...
    path = this.parsePath(path);
    // ...
  }
});
```

### [parsePoint](#parsePoint)

Method name: `shapeObj.parsePoint(point)`

Description: Converts a point in the range 0 - 1 to the actual coordinates on the canvas.

#### Parameters

- `point`: Object

Structure is as follows:

```jsx
{
  x: 0.3,
  y: 0.34
}
```

### [parsePoints](#parsePoints)

Method name：`shapeObj.parsePoints(points)`

Description: Converts a set of 0 - 1 points into actual coordinates on the canvas.

#### Parameters

- `point`: Array

Structure is as follows:

```jsx
[
  {x: 0.3, y: 0.34},
  {x: 0.3, y: 0.34}
]
```

### [parsePath](#parsePath)

Method name：`shapeObj.parsePath(path, isCircle)`

Description: The shape of the key points formed after the connection path, if it is still normalized data, you can call this method to convert the coordinates on the canvas.

#### Parameters

- `path`: String

Connect each key path, for example: 'M0 0C0,0,0.0315 ... 5785,0,0.675,0,0.675z'.

- `isCircle`: Boolean

Whether it is polar coordinates. If it is polar, the method will automatically turn song.

#### Code example

The following through an example to deepen the understanding.

<div id="c1"></div>

```jsx
var Shape = G2.Shape;
Shape.registerShape('interval', 'triangle', {
  getPoints: function(cfg){
    var x = cfg.x;
    var y = cfg.y;
    var y0 = cfg.y0;
    var width = cfg.size;
    return [
      {x: x-width/2, y: y0},
      {x: x, y: y},
      {x: x+width/2, y: y0}
    ]
  },
  draw: function(cfg, group) {
    var points = this.parsePoints(cfg.points); // Convert 0-1 space coordinates to canvas coordinates.
    var polygon = group.addShape('polygon', {
      attrs: {
        points: [
          [points[0].x, points[0].y],
          [points[1].x, points[1].y],
          [points[2].x, points[2].y]
        ],
        fill: cfg.color
      }
    });
    return polygon; // Will return custom Shape.
  }
});

var data = [
  {genre: 'Sports', sold: 275},
  {genre: 'Strategy', sold: 115},
  {genre: 'Action', sold: 120},
  {genre: 'Shooter', sold: 350},
  {genre: 'Other', sold: 150},
];

ReactDom.render((
  <Chart data={source}>
    <Geom type='interval' position='genre*sold' color='genre' shape='triangle'/>
  </Chart>
), container);
```

The complete code for a custom Shape is as follows:

```js
var Shape = BizCharts.Shape;
Shape.registerShape('interval', 'triangle', {
  getPoints: function(cfg){
    var x = cfg.x;
    var y = cfg.y;
    var y0 = cfg.y0;
    var width = cfg.size;
    return [
      {x: x-width/2, y: y0},
      {x: x, y: y},
      {x: x+width/2, y: y0}
    ]
  },
  draw: function(cfg, group) {
    var points = this.parsePoints(cfg.points); // Convert 0-1 space coordinates to canvas coordinates
    var polygon = group.addShape('polygon', {
      attrs: {
        points: [
          [points[0].x, points[0].y],
          [points[1].x, points[1].y],
          [points[2].x, points[2].y]
        ],
        fill: cfg.color
      }
    });
    return polygon; // Will return custom Shape.
  }
});
```
