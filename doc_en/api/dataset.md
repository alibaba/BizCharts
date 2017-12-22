
# DataSet

Will registered in the global namespace. It is a DataSet constructor.

## Constants

### DataSet.CONSTANTS

For example, `DataSet.HIERARCHY` is the name of the hierarchical data structure.

### DataSet.connectors

An array of registered Connectors（Key-value pairs）.

### DataSet.transforms

Get registered transform（Key-value pairs).

## Classes

### DataSet

The constructor of dataset.

#### new DataSet([options])

Create and return a DataSet instance.
`new DataSet(options = {})`

| parameter | type | required |
| ---- | ---- | ---- |
| options | Object | N |

```js
const ds = new DataSet({
    state: { // define the initialization state quantity
        foo: 'bar'
    }
});
```

#### ds.isDataSet

Used to determine whether it is a DataSet instance，`ds.isDataSet === true`.

#### ds.views

To get all views, which mount on the dataset（key-value pairs）.

#### ds.state

To get the state variables on the dataset（key-value pairs）.

#### ds.createView()

> alias ds.view()

`ds.createView([name, ]options = {})` Return a view instance.

| parameter | type | required |
| ---- | ---- | ---- |
| name | String | N |
| options | Object | N |

```js
const dv0 = ds.createView();
const dv1 = ds.createView('foo');
const dv2 = ds.createView('bar', {
    watchingStates: [ 'fakeState' ]
});
```

#### ds.getView()

`ds.getView(name)` Returns the corresponding view instance of name.

| parameter | type | required |
| ---- | ---- | ---- |
| name | String | Y |

```js
const dv = ds.getView('foo');
```

#### ds.setView(name, dv)

`ds.setView(name, dv)` Set the corresponding data view instance as dv.

| parameter | type | required |
| ---- | ---- | ---- |
| name | String | Y |
| dv | DataSet.View | Y |

```js
ds.setView('foo', new DataSet.View());
```

#### ds.setState(name, value)

To set state of name as specified value.

> important！It will re-execute all name-related data processing flow. This interface provides a communication channel for the data views mounted on the data collection.

> Modify the state quantity must be by calling this interface，but not use this method `ds.state.xxx = 'yyy'`.

| parameter | type | required |
| ---- | ---- | ---- |
| name | String | Y |
| value | Any | Y |

```js
ds.setState('foo', 'bar');
```

#### ds.on(eventName, callback)

`ds.on(eventName, callback)` Listen to the specified event on the data set.

| parameter | type | required |
| ---- | ---- | ---- |
| eventName | String | Y |
| callback | Function | Y |

Currently supported events：

- `statechange` State change event，triggered after calling `setState()` method.

> important！This event is not triggered synchronously after the state amount has changed. But **asynchronously trigger ** after setState is called.

> The current view listening to a state view of the data automatically listen to this event.

```js
ds.on('statechange', (name, value) => {
    console.log(`state ${name}'s value has been changed to ${value}!`)
});
```

#### ds.emit(eventName[, params])

`ds.emit(eventName[, params])` Trigger event on the data set.

| parameter | type | required |
| ---- | ---- | ---- |
| eventName | String | Y |
| params | Arguments | N |


Currently supported events：

- `statechange` State change event，the state-related view will re-executes all data processing flow after triggering.

### DataSet.View

> alias DataSet.DataView

The constructor of DataView.

#### new View()

`const dv = new DataSet.View([ds[, options = {}]])` return data-view instance.

| parameter | type | required |
| ---- | ---- | ---- |
| ds | DataSet | N |
| options | Object | N |

```js
const dv0 = new DataSet.View();
const dv1 = new DataSet.View(ds, {
    watchingStates: [ 'foo' ] // listening state of `foo` change. if you nerver set any state, it will listen all state by default
});
```

#### dv.isView

> alias dv.isDataView

#### dv.loose

IS the data set associated. It will return `false` if there are instantiated by `ds.createView()` ，and return `true` by `new DataSet.View(options)`.

#### dv.dataType

To get the data type. Default value is `DataSet.TABLE`，optionaly `DataSet.TABLE`（Two-dimensional data）,`DataSet.GEO`（Geographic）, `DataSet.HIERARCHY` （hierarchy），and `DataSet.GRAPH`（Graph Data Structure）.

#### dv.origin

The source data of dataview.

#### dv.rows

The processed data of dataview.

#### dv.transforms

All registered transform of dataview.

#### dv.source(data[, options])
`dv.source(data, options)` Set source data into dataview.

| parameter | type | required |
| ---- | ---- | ---- |
| data | String / Array / Object / DataView | Y |
| options | Object | N |

Input a source data `data`, it could be a string/ array/object or an instance of DataView. And `options` config the `connector` and the configuration items of the data processing.

See the details [Connector API](connector.md)

#### dv.transform()

`dv.transform(options)` Transform the source data, and store transform into dv.transforms.
`options` config the `transform`.

| parameter | type | required |
| ---- | ---- | ---- |
| options | Object | Y |

See the details [Transform API](transform.md)

## Functions

### DataSet.registerConnector(name, callback)

`DataSet.registerConnector(name, callback)` To register a connector function，and all dataview can use this connector name to input source data.

| parameter | type | required |
| ---- | ---- | ---- |
| name | String | Y |
| callback | Function | Y |

`callback` is a function that receives two parameters and returns the data needed by the DataView instance.
Here is an exemple for a Connector register CSV data:

```js
const _ = require('lodash');
const {
    csvParse
} = require('d3-dsv');

DataSet.registerConnector('csv', (data, options = {}) => {
    const delimiter = options.delimiter || ',';
    if (!isString(delimiter)) {
        throw new TypeError('Invalid delimiter: must be a string!');
    }
    return dsvFormat(delimiter).parse(str);
});

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

### DataSet.getConnector(name)

Returns the connector for the specified name string.

| parameter | type | required |
| ---- | ---- | ---- |
| name | String | Y |

### DataSet.registerTransform(name, callback)

Calls the specified function for each data-view by this specified `name` to process data.

| parameter | type | required |
| ---- | ---- | ---- |
| name | String | Y |
| callback | Function | Y |

`callback` receives two parameters, instance of DataSet.View and options. 
 For example:

```js

DataSet.registerTransform('filter', (dv, options = {}) => {
    dv.rows = dv.rows.filter(options.callback || (row => !!row));
});

dv.transform({
    type: 'filter',
    callback(row) {
        return row.Run !== "1";
    }
})

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

### DataSet.getTransform(name)

Returns the transform for the specified name string.

| parameter | type | required |
| ---- | ---- | ---- |
| name | String | Y |
