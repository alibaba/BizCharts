# DataSet

Since BizCharts version 3.0, the original, built-in data processing module frame has been pulled from the BizCharts package and has become a package of its own. DataSet's goal is to provide state-driven, rich, and powerful data processing capabilities for various data visualization scenarios.

BizCharts supports data consistent with the G2 package, Generic support independent DataSet package.

## Glossary

| Glossary  | Description                                                                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| DataSet   | A collection of data                                                                                                                             |
| DataView  | A single data view, there are two general types of data (similar to a database table), tree data, map data and geographic information data types |
| State     | Variables that control the state of the data flowing inside the dataset                                                                          |
| Transform | Data transformation function, data view to do data processing, including map layout, data completion, data filtering, etc.                       |
| Connector | Data access function, used to load a data source (such as csv) into a data view                                                                  |

## Introduction

In BizCharts versions 1.x and 2.x, statistical functions and data processing were mixed with graphical syntax. This led to unnecessary metaphor, making the package more difficult to understand. The data processing modules (Frame and Stat) also limited further development of BizCharts data processing capabilities.

In order to improve the developer experience, in BizCharts 3.x we completely abstracted the data processing into its own package, DataSet. This allows us to further abstract, extend, and optimize the data processing independently from BizCharts.

We divide data processing into two major steps: data connection (Connector) and data transformation (Transform). Connector is responsible for importing and normalizing data (such as importing CSV data, importing GeoJSON data, etc.). Transform is responsible for various data transformation operations (such as graph layout, data statistics, data completion, etc.). Through this layering, DataSet supports a comprehensive set of algorithms and modules for data processing.

We also added the concept of a DataSet to a single DataView. Through unified state management, DataSet implements state synchronization and interaction between data views. The entire data processing module architecture is shown below.

![data-set structure](https://img.alicdn.com/tfs/TB1pjlYcf6H8KJjy0FjXXaXepXa-1186-655.png)

## Installation

### umd

You can import online resources or local scripts via `<script>` tags.

```html
<!-- Introduced online resources -->
<script src="https://gw.alipayobjects.com/os/antv/assets/data-set/0.8.0/data-set.min.js"></script>
```

```html
<!-- Introduce local script -->
<script src="./data-set.js"></script>
```

This provides the global variable DataSet for use in subsequent scripts.

```html
<script src="https://gw.alipayobjects.com/os/antv/assets/data-set/0.8.0/data-set.min.js"></script>
<script>
var dv = new DataSet.View();
</script>
```

### npm

<a href="https://www.npmjs.com/package/@antv/data-set" target="_blank"><img src="https://img.shields.io/npm/v/@antv/data-set.svg?style=flat-square"></a>

We provide the DataSet npm package, which can be installed using the following:

```bash
npm install @antv/data-set --save
```

After installation you can `import` or `require` DataSet:

```js
import { View } from "@antv/data-set";
const dv = new View();
```

## api document

DataSet provides the following functions:

* Source data analysis, csv, dsv, geojson into standard JSON
* Processing data, including filter, map, fold (fill data) and other operations
* Statistical functions, summary statistics, percentage, sealing and other statistical functions
* Special data processing, including geographic data, rectangular tree, Sanji, word cloud data processing

See [dataset api documentation](../api/dataset.md) for more details

## Example

### DataView alone

If you're just working on the data, you do not need charting.

### State

DataSet state can be easily used in G2 charts:
1.Create a DataSet object, specify the status of the amount
2.Create a DataView object, use state variables in transform
3.Create a chart that references the previous creation of the DataView
4.Change the status of all DataView updates

    ```js
    // step1 create dataset, specifying a state variable, `year`
    const ds = new DataSet({
    state: {
        year: '2010'
    }
    });

    // step2 Create DataView
    const dv = ds.createView().source(data);

    dv.transform({
    type: 'filter',
    callback(row) {
        return row.year === ds.state.year;
    }
    });


    // step3 Reference DataView
    <Chart data={dv}>
    </Chart>

    // step4 Update `year` variable
    ds.setState('year', '2012');

    ```

####Note：

* When a DataSet sets a state variable, all the DataViews managed by that DataSet are updated. This can be affected by the explicit designations of watchingStates, which are not affected by the state variable when set to an empty array.
* All charts that reference a DataSet-managed DataView are automatically refreshed when that DataView is updated, and do not need to be manually refreshed.

### Chart linkage example

Suppose we have a CSV file, `population-by-age.csv`, which shows the population of different ages in different states of the United States. The contents of the file are as follows:

| State | 小于 5 岁 | 5 至 13 岁 | 14 至 17 岁 | 18 至 24 岁 | 25 至 44 岁 | 45 至 64 岁 | 65 岁及以上 |
| ----- | --------- | ---------- | ----------- | ----------- | ----------- | ----------- | ----------- |
| WY    | 38253     | 60890      | 29314       | 53980       | 137338      | 147279      | 65614       |
| DC    | 36352     | 50439      | 25225       | 75569       | 193557      | 140043      | 70648       |
| VT    | 32635     | 62538      | 33757       | 61679       | 155419      | 188593      | 86649       |
| ND    | 41896     | 67358      | 33794       | 82629       | 154913      | 166615      | 94276       |
| AK    | 52083     | 85640      | 42153       | 74257       | 198724      | 183159      | 50277       |
| SD    | 58566     | 94438      | 45305       | 82869       | 196738      | 210178      | 116100      |
| ...   | ...       | ...        | ...         | ...         | ...         | ...         | ...         |

We want to load the contents of a CSV file, draw a stacked histogram with the state horizontal and the population vertical, and look at a column for a comparison of ages for a given state Pieces of the population. Let's see how that's done using DataSet:

> Step 1：Create a DataSet instance of the DataSet to manage state state variable, `currentState`

```js
const ds = new DataSet({
  state: {
    currentState: "WY"
  }
});
```

> Step 2：Create a Data View View instance for stacked histograms, load data

```js
/*
 * If you do not need to use state management functions, you can not create a data view based on a DataSet instance
 * directly with const dv = new DataSet.View ();
 * This example requires the use of state variables in different data view instance communication between, so you need to
 * have a DataSet instance management status
 */
$.getJSON("/assets/data/population-by-age.csv", data => {
  const dvForAll = ds
    .createView("populationByAge") // Create a data view named populationByAge under the DataSet instance
    .source(data, {
      type: "csv" // Load data using a CSV-type Connector
    });
});
```

> Step 3: Consolidate population (with the addition of the "age" and "population" fields, which combine the population data for all ages into these two columns)

```js
dvForAll.transform({
  type: "fold",
  fields: [
    "小于5岁",
    "5至13岁",
    "14至17岁",
    "18至24岁",
    "25至44岁",
    "45至64岁",
    "65岁及以上"
  ],
  key: "age",
  value: "population"
});
```

> Step 4：Create a data view instance for the pie chart, inherit the data of the previous data view, filter the data through the state amount currentState, and count the population proportion of different age groups

```js
<Chart
    data={dvForAll}
    height={400}
    forceFit={true}
    onTooltipChange={(evt)=>{
        const items = evt.items || [];
        if (items[0]) {
            ds.setState('currentState', items[0].title);
        }
      }
    }
>
    <Legend position='top' />
    <Axis name="population" label={{
        formatter: val => {
        return val / 1000000 + 'M';
        }
    }}>
    <Geom
        type="intervalStack"
        position="state*population"
        color="age"
        select={[true, {
            mode: 'single',
            style: {
            stroke: 'red',
            strokeWidth: 5
            }
        }]}
    />
</Chart>
<Chart
    data={dvForOneState}
    height={300}
    forceFit={true}
    padding={0}
>
    <Coord type='theta' radius={0.8}/>
    <Geom
        type="intervalStack"
        position="percent"
        color="age"
    >
      <Label content={['age*percent',(age, percent) => {
        percent = (percent * 100).toFixed(2) + '%';
        return age + ' ' + percent;
      }]} />
    </Geom>
</Chart>
```

For more information [please click here](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/other/bar-change-pie)
