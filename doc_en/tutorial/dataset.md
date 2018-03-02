
# DataSet

Since BizChars version 3.0, the originally built-in data processing module frame is pulled from the BizChars package and becomes a DataSet package on its own. The DataSet's goal is to provide state driven, rich and powerful data processing capabilities for data visualization scenarios.
BizCharts support for data consistent with the G2, Generic support independent DataSet package.

## Glossary

| Glossary | Description |
| -------- | -------- |
| DataSet | A collection of data |
| DataView | A single data view, there are two general types of data (similar to a database table), tree data, map data and geographic information data types |
| state | Variables that control the state of the data flowing inside the dataset |
| Transform | Data transformation function, data view to do data processing, including map layout, data completion, data filtering, etc. |
| Connector | Data access function, used to load a data source (such as csv) into a data view |

## Introduction

In BizChars versions 1.x and 2.x, statistical functions and data processing are mixed with graphical syntax. This on the one hand leads to unnecessary metaphor, resulting in additional understanding of the cost, on the other hand the data processing module (Frame and Stat) built also limits the further development of BizChars data processing capabilities.

In order to pursue a more exquisite experience, we completely abstract the data processing part from BizChars, and further abstract, extend and optimize the data processing itself to realize an independent data processing module DataSet.

First, we divide data processing into two major steps: the data connector (Connector) and data transformation (Transform). Connector is responsible for importing and normalizing data (such as importing CSV data, importing GeoJSON data, etc.). Transform is responsible for various data transformation operations (such as graph layout, data statistics, data completion, etc.). Through this layering, the front-end community supports a very comprehensive set of algorithms and modules for data processing. Second, we added the concept of a DataSet to a single DataView. Through a unified DataSet management, Implements state synchronization and interaction between data views. The entire data processing module architecture as shown below.

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

In this way, you can get the global variable DataSet in subsequent scripts.

```html
<script src="https://gw.alipayobjects.com/os/antv/assets/data-set/0.8.0/data-set.min.js"></script>
<script>
var dv = new DataSet.View();
</script>
```

### npm

<a href="https://www.npmjs.com/package/@antv/data-set" target="_blank"><img src="https://img.shields.io/npm/v/@antv/data-set.svg?style=flat-square"></a>

We provide the DataSet npm package, which can be installed by the following command.

```bash
npm install @antv/data-set --save
```

After installation you can use `import` or` require` for reference.

```js
import { View } from '@antv/data-set';
const dv = new View();
```

## api document
DataSet mainly completed the following functions:
 *Source data analysis, the csv, dsv, geojson into standard JSON
 *Processing data, including filter, map, fold (fill data) and other operations
 *Statistical functions, summary statistics, percentage, sealing and other statistical functions
 *Special data processing, including geographic data, rectangular tree, Sanji, word cloud data processing
See [dataset api documentation](../api/dataset.md) for more details

## Example
### DataView alone
If you're just working on the data, you do not need charting.

### State quantity
The use of DataSet state (G2) in G2 3.0 can be easily linked to the chart, the steps are as follows:
    1.Create a DataSet object, specify the status of the amount
    2.Create a DataView object, use state variables in transform
    3.Create a chart that references the previous creation of the DataView
    4.Change the status of all DataView updates

    ```js
    // step1 create dataset specified state quantity
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

    // step4 Update status quantity
    ds.setState('year', '2012');

    ```

####Note：
    *After a DataSet creates a state quantity, it defaults to all the DataView's managed by it, which can be affected by the explicit designations of watchingStates, which are not affected by the state quantity when set to an empty array.
    *All charts referenced by DataSet-managed DataView are automatically refreshed and do not need to be manually refreshed.

### Chart linkage example

Suppose we have a CSV file, `population-by-age.csv`, which shows the population of different ages in different states of the United States. The contents of the file are as follows:

| State	| 小于5岁 | 5至13岁 | 14至17岁 | 18至24岁 | 25至44岁 | 45至64岁 | 65岁及以上 |
| ----	| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| WY | 38253 | 60890 | 29314 | 53980 | 137338 | 147279 | 65614  |
| DC | 36352 | 50439 | 25225 | 75569 | 193557 | 140043 | 70648  |
| VT | 32635 | 62538 | 33757 | 61679 | 155419 | 188593 | 86649  |
| ND | 41896 | 67358 | 33794 | 82629 | 154913 | 166615 | 94276  |
| AK | 52083 | 85640 | 42153 | 74257 | 198724 | 183159 | 50277  |
| SD | 58566 | 94438 | 45305 | 82869 | 196738 | 210178 | 116100 |
| ...	| ... | ... | ... | ... | ... | ... | ... |

We want to load the contents of a CSV file, draw a stacked histogram with the state horizontal and the population vertical, and look at a column for a comparison of ages for a given state Pieces of the population. Let's take a look at how to draw:

> Step1：Create a DataSet instance of the DataSet to manage state state quantities

```js
const ds = new DataSet({
    state: {
        currentState: 'WY'
    }
});
```

> Step2：Create a Data View View instance for stacked histograms, loading data

```js
/*
 * If you do not need to use state management functions, you can not create a data view based on a DataSet instance
 * directly with const dv = new DataSet.View ();
 * This example requires the use of state variables in different data view instance communication between, so you need to
 * have a DataSet instance management status
 */
$.getJSON('/assets/data/population-by-age.csv', data => {
    const dvForAll = ds
        .createView('populationByAge') // Create a data view named populationByAge under the DataSet instance
        .source(data, {
            type: 'csv', // Load data using a CSV-type Connector
        });
});
```

> Step3：Consolidated population (with the addition of the "age" and "population" fields, which combine the population data for all ages into these two columns)

```js
dvForAll.transform({
    type: 'fold',
    fields: [ '小于5岁','5至13岁','14至17岁','18至24岁','25至44岁','45至64岁','65岁及以上' ],
    key: 'age',
    value: 'population'
});
```

> Step4：Create a data view instance for the pie chart, inherit the data of the previous data view, filter the data through the state amount currentState, and count the population proportion of different age groups

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
For more information[please click here](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/other/bar-change-pie)
