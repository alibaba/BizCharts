
# Connector (Data access)
*The document switched from G2*

A data view (DataSet.View) instance will use Connector when accessing data, the syntax is as follows:

```js
dv.source(data, {
    type: connectorName,
    ...otherOptions
});
```

for example:

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
```

In the above code, the data view instance `dv` loads a piece of CSV text using the` csv` type of Connector.

Currently `DataSet` supports the following commonly used `Connector`

## default

Directly call `dv.source (data)`, not specified by the configuration item Connector, then the following two default situations:

The first one, data is the specific array data:

```js
dv.rows = deepClone(data);
```

The second, data is passed in the name of another instance or instance of DataView:

```js
dv.rows = deepClone(ds.getView(otherDv).rows);
```

## dsv

See the specific usage examples:

```js
dv.source(dsvStr, {
	type: 'dsv',   // Specified use dsv connector
	delimiter: '|' // Specify the delimiter
})
```

## csv

See the specific usage examples:

```js
dv.source(csvStr, {
	type: 'csv',   // Specified use csv connector
	delimiter: ',' // Specify the delimiter
})
```

## tsv

See the specific usage examples:

```js
dv.source(tsvStr, {
	type: 'tsv' // Specified use tsv connector
})
```

## GeoJSON

See the specific usage examples:

```js
dv.source(geojsonData, {
    type: 'GeoJSON', // Alias geo / geojson
})
```

> dv.dataType will be changed to 'geo' so that dv can execute some Geo-related instance methods.

## TopoJSON

See the specific usage examples:

```js
dv.source(topojsonData, {
    type: 'TopoJSON', // Alias topojson
    object: 'xxx'     // TopoJSON is equivalent to multiple GeoJSON combined compression, each object is equivalent to a GeoJSON data, the specified object is extracted from a Geo data
})
```

> dv.dataType will be changed to 'geo' so that dv can execute some Geo-related instance methods.

## hierarchy

See the specific usage examples:

```js
dv.source(tree, {
    type: 'hierarchy',        // Alias tree
    children: d => d.children // Optional, function, return subtree
})
```

> dv.dataType will be changed to 'hierarchy' so that dv can execute some tree-structured instance methods and transforms.

> dv.root as the root node

## graph

See the specific usage examples:

```js
dv.source(graph, {
    type: 'graph',
	nodes: d => d.nodes, // Node set corresponds to the field
	edges: d => d.edges  // Edge set corresponding fields
})
```

> dv.dataType will be changed to 'graph' so that dv can execute graph related instance methods and Transforms.
