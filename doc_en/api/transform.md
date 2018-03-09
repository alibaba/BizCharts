# Transform 数据转换

Transfom DataSet.View data.

```js
dv.transform({
    type: connectorName,
    ...otherOptions
});
```

```js
const testCSV = `Expt,Run,Speed
 1,1,850
 1,2,740
 1,3,900
 1,4,1070`;

const dv = new DataSet.View().source(testCSV, {
    type: 'csv'
});
console.log(dv.rows);
/*
 * dv.rows:
 * [
 *     {Expt: " 1", Run: "1", Speed: "850"}
 *     {Expt: " 1", Run: "2", Speed: "740"}
 *     {Expt: " 1", Run: "3", Speed: "900"}
 *     {Expt: " 1", Run: "4", Speed: "1070"}
 * ]
 */

dv.transform({
    type: 'filter',
    callback(row) {
        return row.Run !== "1";
    }
});
console.log(dv.rows);
/*
 * dv.rows:
 * [
 *     {Expt: " 1", Run: "2", Speed: "740"}
 *     {Expt: " 1", Run: "3", Speed: "900"}
 *     {Expt: " 1", Run: "4", Speed: "1070"}
 * ]
 */

```

The above code ，data view instance `dv` use `csv` Connector load a CSV text, then execute `filter` Transform, filter some data。

Currently dataSet support the following transform：

## Static processing related

### filter

```js
dv.transform({
    type: 'filter',
    callback(row) {
        return row.year > 1998;
    }
});
```

### map
```js
dv.transform({
    type: 'map',
    callback(row) {
        row.newCol = row.xxx + row.yyy;
        return row;
    }
});
```

### pick
Filter the field names.

```js
dv.transform({
    type: 'pick',
    // retained field names if null, retained all field names.
    fields: [ 'xxx', 'yyy' ]
});
```

### rename

> alias: rename-fields

Rename field name.

```js
dv.transform({
    type: 'rename',
    map: {
        xxx: 'yyy' // dv.xxx will be renamed as row.yyy
    }
});
```

### reverse

```js
dv.transform({
    type: 'reverse',
});
```

### sort

```js
dv.transform({
    type: 'sort',
    callback(a, b) {
        return a.year - b.year;
    }
});
```

### sort-by

> alias: sortBy
Sort data by specify field name.

```js
dv.transform({
    type: 'sort-by',
    fields: [ 'year' ],
    order: 'DESC'        // default is ASC,DESC is reversed order.
})
```

### subset
Get the sub dataset.

```js
dv.transform({
    type: 'subset',
    startRowIndex: 1,  // retained start row index
    endRowIndex: 2,    // retained end row index
    fields: [ 'year' ] // retained field names
})
```

### partition

> alias: group | groups

Partition the dataset.

```js
dv.transform({
    type: 'partition',
	groupBy: [ 'year' ], // Partitioned by year.
	orderBy: [ 'month' ] // Sort by month.
});
```

## data deformation / data completion

### fill-rows

> alias: fillRows

Complete row data.

First partition dataset with `groupBy` and `orderBy`, If deformate data by group（`fillBy: 'group'`）, then compare each group and fill up the group with insufficient number of rows based on the group with the highest value of the `orderby` sequence field as the standard.  If a sequence is used as a complement basis (`fillBy: 'order'`), then a combination of all the `orderBy` sequence fields is taken and the full sequence is added for each grouping.

> note! If the original data has fields other than those specified by groupBy and orderBy, these fields will be missing in the supplementary data row. At this time can be combined with the impute Transform field data completion.

> fillBy: group

```js
const data = [
    { a: 0, b: 0 },
    { a: 0, b: 1 },
    { a: 0, b: 2 },
    { a: 1, b: 1 },
    { a: 1, b: 2 },
    { a: 1, b: 3 },
    { a: 2, b: 0 }
];
const dv = new DataSet.View().source(data)
    .transform({
        type: 'fill-rows',
        groupBy: [ 'a' ],
        orderBy: [ 'b' ],
        fillBy: 'group' // default: group, can also be order
    });
console.log(dv.rows);
/*
 * dv.rows:
 * [
 *     { a: 0, b: 0 }, // group1 The group that has the most complete sequence of the first sequence (b) is selected as the baseline data.
 *     { a: 0, b: 1 },
 *     { a: 0, b: 2 },
 *     { a: 1, b: 1 }, // group2 The number of sequence fields is the same as the baseline group, so no data is added
 *     { a: 1, b: 2 },
 *     { a: 1, b: 3 },
 *     { a: 2, b: 0 }, // group3 default data, supplemented according to the baseline data
 *     { a: 2, b: 1 }, // This row of data is supplemented
 *     { a: 2, b: 2 }, // This row of data is supplemented
 * ]
 */
```

> fillBy: order

```js
// Use the same data as in the previous example.
const dv = new DataSet.View().source(data)
    .transform({
        type: 'fill-rows',
        groupBy: [ 'a' ],
        orderBy: [ 'b' ],
        fillBy: 'order' // default: group, can also be order
    });
console.log(dv.rows);
/*
 * dv.rows:
 * [
 *     { a: 0, b: 0 }, // group1
 *     { a: 0, b: 1 },
 *     { a: 0, b: 2 },
 *     { a: 0, b: 3 }, // group2 This line of data is supplemented because the full sequence field (b) has this value
 *     { a: 1, b: 0 }, // group2 This line of data is supplemented because the full sequence field (b) has this value
 *     { a: 1, b: 1 },
 *     { a: 1, b: 2 },
 *     { a: 1, b: 3 },
 *     { a: 2, b: 0 }, // group3 default value, supplemented according to the baseline group
 *     { a: 2, b: 1 }, // This row of data is supplemented
 *     { a: 2, b: 2 }, // This row of data is supplemented
 *     { a: 2, b: 3 }, // This row of data is supplemented
 * ]
 */
```

### impute Completion column / Completion fields

Complete the missing value according to the configuration rules for a field .

For example:

```js
const data = [
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 0 },
    { x: 1, y: 5 },
    { x: 1, y: 6 },
    { x: 1, y: 7 },
    { x: 1 },
    { x: 1, y: 9 },
    { x: 2 }
];
const dv = new DataSet.View().source(data)
    .transform({
        type: 'impute',
        field: 'y',       // To be completed field
        groupBy: [ 'x' ], // Group field set (null will be not grouped)
        method: 'max'     // The rule when the field value is completed
    });
/*
 dv.rows:
[
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 0, y: 3 },
    { x: 1, y: 5 },
    { x: 1, y: 6 },
    { x: 1, y: 7 },
    { x: 1, y: 7 },
    { x: 1, y: 9 },
    { x: 2, y: 9 }
]
 */
```

> The statistical function of complementing field: max, min, median, mean

> Complement data with constant value, for example:

```js
dv.transform({
    type: 'impute',
    field: 'y',       // To be completed field
    groupBy: [ 'x' ], // Group field set (null will be not grouped)
    method: 'value',  // Complement constant value.
	value: 10         // Complement constant value is 10.
});
```

### fold (expand the data)

With the specified field set as the key, expand the data.

```js
const data = [
    { country: "USA", gold: 10, silver: 20 },
    { country: "Canada", gold: 7, silver: 26 }
];
const dv = ds.createView()
    .source(data)
    .transform({
        type: 'fold',
        fields: [ 'gold', 'silver' ], // Expanding field names
        key: 'key',                   // key field name
        value: 'value',               // value field name
        retains: [ 'country' ]        // Reserved field names, default to all fields except 'fields'
    });
/*
 dv.rows:
[
    { key: gold, value: 10, country: "USA" },
    { key: silver, value: 20, country: "USA" },
    { key: gold, value: 7, country: "Canada" },
    { key: silver, value: 26, country: "Canada" }
]
 */
```

## Data percent related transform

### percent (sum percentage)

Statistics under a certain dimension of the value of a field and the proportion of the total (can be grouped).

`field` is the field of statistics(sum, %), `dimension` is the statistical dimension field. That's  percentage of the sum of `field` for each different` dimension`. `groupBy` is the grouping field, and the percentage is calculated internally within each group (the sum of the last percent fields in each group is 1).

For example:

```js
dv.transform({
    type: 'percent',
    field: 'sold',           // Statistics sold
    dimension: 'year',       // The proportion of each year
    groupBy: [ 'category' ], // Group by category
    as: 'percent'            // The result is stored in the `percent` field
});
```

### proportion (Proportion of number of rows)

Statistics in a dimension of a field of the number of stripes in the total number of proportion (can be grouped). And percent Transform is similar, but the statistics is the proportion of data items, rather than the proportion of total data.

For example:

```js
dv.transform({
    type: 'proportion',
    field: 'id',             // Total number of statistics
    dimension: 'year',       // The proportion of each year
    groupBy: [ 'category' ], // Group by category
    as: 'proportion'         // The result is stored in the `proportion` field
});
```

## Data statistics

### aggregate

> alias: summary

Statistical processing, support for a variety of parallel statistics.

For example:

```js
dv.transform({
    type: 'aggregate',
    fields: [],        // Statistics fields
    operations: [],    // Statistics operations
    as: [],            // Store fields
    groupBy: []        // Group fields
})
```

> fields/operations/as these three array elements should be one by one. "A certain field `field` for some kind of statistical operation `operation` results stored in a field as"

Supported operations: [simple-statistics](https://simplestatistics.org/)

- count
- max
- min
- mean
- median
- mode
- product
- standardDeviation
- sum
- sumSimple
- variance

### regression curve

Calculate the regression fit curve for both fields.

For example:

```js
dv.transform({
    type: 'regression',
    method: 'linear',     // Regression algorithm type
    fields: [ 'x', 'y' ], // Statistics field
    bandwidth: 0.1,       // Steps
    extent: [ 0, 4 ],     // The range of x field value in the result set
    as: [ 'x', 'y' ]      // Result field
});
```

Supported regression algorithm types:

- linear
- exponential
- logarithmic
- power
- polynomial

## Data box related

### bin.histogram

> alias: bin.dot

example

```js
dv.transform({
    type: 'bin.histogram',
    field: 'a',             // Corresponds to a point on the axis
    bins: 30,               // The number of bin
    binWidth: 10,           // Binning step (overrides bins option)
	offset: 0,              // Binning offset
	groupBy: [],            // Group（Used to stack histograms）
    as: [ 'x', 'count' ],   // x is an array that stores the upper and lower bounds of a bin [x0, x1]
});
```

### bin.quantile

For example:

```js
dv.transform({
    type: 'bin.quantile',
    field: 'y',    // Field for calculating sub-bit values
    as: '_bin',    // Array field to save the sub-bit value
    groupBy: [],   // Group field
    fraction: 4,   // optional, default is 4
    p: [0.5, 0.3]  // optional, pick one between p and fraction
});
```

### bin.hexagon

> alias: bin.hex | hexbin

For example:

```js
dv.transform({
    type: 'bin.hexagon',
    fields: [ 'a', 'b' ],      // Corresponds to a point on the axis
    bins: [ 30, 30 ],          // Binning number in both directions
	binWidth: [ 10, 1000 ],    // Binning steps in both directions (overrides the bins configuration)
	offset: [ 0, 0 ],          // Binning offset in both directions
	sizeByCount: false,        // Whether to adjust the binning size according to the number of bins (hexagon radius)
    as: [ 'x', 'y', 'count' ], // This point falls on the hexagon's vertex coordinate set, as well as the number of bars in each bin
                               // x: [ x0, x1, x2, x3, x4, x5 ], y: [ y0, y1, y2, y3, y4, y5 ]
                               // count: Number
});
/*
 * Vertex order:
 *      3
 * 4          2
 *
 * 5          1
 *      0
 */
```

### bin.rectangle

> alias: bin.rect

For example:

```js
dv.transform({
    type: 'bin.rectangle',
    fields: ['a', 'b'],        // Corresponds to a point on the axis
    bins: [ 30, 30 ],          // Binning number in both directions
    binsWidth: [ 10, 10 ],     // Binning steps in both directions (overrides the bins configuration)
	offset: [ 0, 0 ],          // Binning offset in both directions
	sizeByCount: false,        // Whether to adjust the binning size according to the number of bins
    as: [ 'x', 'y', 'count' ], // This point falls on the hexagon's vertex coordinate set, as well as the number of bars in each bin
                               // x: [ x0, x1, x2, x3 ], y: [ y0, y1, y2, y3 ]
                               // count: Number
});
/*
 * Vertex order:
 * 3 - 2
 * |   |
 * 0 - 1
 */
```

## Kernel functions

### kernel-smooth.regression

Used to draw kernel function probability density regression curve, support single field or double field.

For example:

```js
dv.transform({
    type: 'kernel-smooth.regression',
    fields: [ 'x', 'y' ],             // Mandatory, 1 or 2 fields
    method: 'gaussian',               // The type of kernel function. You can also specify as a custom function
    extent: [ min(x), max(x) ],       // The range of values, the default is the range of values ​​for the x field
    bandwidth: 0.4,                   // Step, using silverman algorithm as default
    as: [ 'x', 'y' ],                 // Result field, single field, y is the probability of x value
});
```

Supporeted kernel functions

- cosine
- epanechnikov
- gaussian (default)
- quartic
- triangular
- tricube
- triweight
- uniform

### kernel-smooth.density

Used to draw kernel function probability density distribution thermogram, double field.

For example:

```js
dv.transform({
    type: 'kernel-smooth.density',
    fields: [ 'x', 'y' ],                            // Required
    method: 'gaussian',                              // The type of kernel function. You can also specify as a custom function
    extent: [[ min(x), max(x) ], [ min(y), max(y)]], // The range of values, default is the range of values ​​for each of the x and y fields
    bandwidth: 0.4,                                  // Step, using silverman algorithm as default
    as: [ 'x', 'y' ],                                // Result field, single field, y is the probability of x value
});
```

> [DENSITY ESTIMATION FOR STATISTICS AND DATA
ANALYSIS by B.W. Silverman ](https://ned.ipac.caltech.edu/level5/March02/Silverman/paper.pdf)

The types of kernel functions supported are the same as above.

## Tree related

### hierarchy.treemap

> alias: treemap

Generate a treemap layout based on tree data

For example:

```js
dv.transform({
    type: 'hierarchy.treemap',
    field: 'value',
    tile: 'treemapSquarify',     // layout type
    size: [ 1, 1 ],              // width, height
    round: false,
    // ratio: 1.618033988749895, // golden ratio
    padding: 0,                  
    paddingInner: 0,
    paddingOuter: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    as: [ 'x', 'y' ],            // Set of rectangular vertices
                                 // x: [ x0, x1, x2, x3 ], y: [ y0, y1, y2, y3 ]
});
```

Supported layout types:

- treemapBinary
- treemapDice
- treemapSlice
- treemapSliceDice
- treemapSquarify
- treemapResquarify

### hierarchy.partition

> alias: adjacency

Adjacency Diagram layout is generated according to the tree data, which can be transformed into Sunburst graph through coordinate transformation.

For example:

```js
dv.transform({
    type: 'hierarchy.partition',
    field: 'value',
    size: [ 1, 1 ],              // width, height
    round: false,
    // ratio: 1.618033988749895, // golden ratio
    padding: 0,                  // 
    as: [ 'x', 'y' ],            // Set of rectangular vertices
                                 // x: [ x0, x1, x2, x3 ], y: [ y0, y1, y2, y3 ]
});
```

## Diagram

### diagram.arc

Arc Diagram can be transformed into a Chord Diagram.

> alias: arc

For example:

```js
dv.transform({
    type: 'diagram.arc',
    y: 0,
    thickness: 0.05,                   // Node height, range is(0, 1)
    weight: false,                     // Whether with weight, no weight is the arc diagram, with the weight is the chord diagram
    marginRatio: 0.1,                  // Margin ratio, range is [0, 1)
    id: node => node.id,               // Get the node's id
    source: edge => edge.source,       // Get the start point id of edge.
    target: edge => edge.target,       // Get the end point id of edge.
    sourceWeight: edge => edge.value,  // Get the start point weight of the edge
    targetWeight: edge => edge.value1, // Get the end point weight of the edge
    sortBy: null,                      // Sort function, you can sort by id, weight ('weight'), or number of edges ('frequency') or you can customize the function
});
```

> Note! After the Transform is done, there are two parts of data (vertex and edge data). G2 can not import data directly from chart.source (dv), but can import vertices and edges separately. For example:

```js
const nodeView = chart.view();
nodeView.source(dv.nodes);

const edgeView = chart.view();
edgeView.source(dv.edges);
```

### diagram.sankey

> alias: sankey

example

```js
dv.transform({
    type: 'diagram.sankey',
	value: node => node.value,    // weight
	source: edge => edge.source,  // Start point id of edge.
    target: edge => edge.target,  // End point id of edge.
    nodeAlign: 'sankeyJustify',   // sankeyLeft / sankeyRight / sankeyCenter
    nodeWidth: 0.02,              // Node width, range: (0, 1)
    nodePadding: 0.02,            // Node up and down spacing, range: (0, 1)
});
```

> note! After the Transform is done, it's also need to pay attention to the above arc transform the same data import problem.

### diagram.voronoi

> alias: voronoi

example

```js
dv.transform({
    type: 'diagram.voronoi',
    fields: ['field0', 'field1'], // Corresponds to a point on the axis
    extend: [[x0, y0], [x1, y1]], // range
    size: [width, height],        // range
    as: [ 'x', 'y' ],             // Each point encloses the polygon's vertex set
                                  // x: [ x0, x1, x2, ... ], y: [ y0, y1, y2, ... ]
})
```

## Geo
Geographic data related.

### geo.projection

example

```js
dv.transform({
    type: 'geo.projection',
    projection: 'geoAiry',                        // Specify the type of projection
    as: [ 'x', 'y', 'centroid_x', 'centroid_y' ], // x, y is the vertex set corresponding to the polygon
                                                  // _centroid_x is the x value of the center point
                                                  //  _centroid_y is the y value of the center point
});
```

### geo.centroid

example

```js
dv.transform({
    type: 'geo.centroid',
    field: 'name',                        // Fields marked with place names
    geoDataView: geoDataView,             // The geo data source used can be a DataView instance or a DataView instance name
    as: [ '_centroid_x', '_centroid_y' ], // _centroid_x is the x value of the center point
                                          // _centroid_y is the y value of the center point
});
```

### geo.region

For example:

```js
dv.transform({
    type: 'geo.region',
    field: 'name',            // Fields marked with place names
    geoDataView: geoDataView, // The geo data source used can be a DataView instance or a DataView instance name
    as: [ '_x', '_y' ],       // Polygon vertex set
                              // _x: [ x0, x1, x2, ... ], _y: [ y0, y1, y2, ... ]
});
```

## others

### tag-cloud

> alias: word-cloud

For example:

```js
dv.transform({
    type: 'tag-cloud',
    fields: [ 'text', 'value' ],    // Fields in the tag cloud layout
    font: 'serif',                  // label's font
    size: [ 500, 500 ],             // canvas size, [ width, height ]
    padding: 0,
    spiral: 'archimedean',          // Label spiral arrangement rule function 'archimedean' || 'rectangular' || {function}
    fontSize(d) { return d.value }, // Callback function to calculate the label font size, d is the original row data
    text(d) { return d.text },      // Generate a label text callback function, d is the original row data
    timeInterval: Infinity,         // The maximum iteration time
	imageMask: {Image},             // Image instance, must be loaded
})
```

> The example of word cloud layout with picture shape.

```js
const imageMask = new Image()
imageMask.crossOrigin = ''
imageMask.src = 'https://zos.alipayobjects.com/rmsportal/EEFqYWuloqIHRnh.jpg'
imageMask.onload = () => {
    dv.transform({
        type: 'tag-cloud',
        imageMask
    });
};
```
