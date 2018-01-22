
# DataSet

自BizChars 3.0版本开始，原先内置的数据处理模块frame从BizChars包中抽离出来，独立成为DataSet包。DataSet的目标是为数据可视化场景提供状态驱动（state driven）的、丰富而强大的数据处理能力。
BizCharts 对数据的支持跟G2一致，通用支持独立的 DataSet 包。

## 术语表

| 术语 | 英文 | 描述 |
| -------- | -------- | -------- |
| 数据集 | DataSet | 一组数据集合 |
| 数据视图 | DataView | 单个数据视图，目前有普通二维数据（类似一张数据库表）、树形数据、图数据和地理信息数据几种类型 |
| 状态量 | state | 数据集内部流转的控制数据状态的变量 |
| 变换 | Transform | 数据变换函数，数据视图做数据处理时使用，包括图布局、数据补全、数据过滤等等 |
| 连接器 | Connector | 数据接入函数，用于把某种数据源（譬如csv）载入到某个数据视图上 |

## 简介

在 BizChars 的 1.x 和 2.x 版本里，统计函数和数据处理是和图形语法混合在一起的。这一方面导致了不必要的隐喻，造成额外的理解成本，另一方面把数据处理模块（ Frame 和 Stat ）内置也限制了 BizChars 数据处理能力的进一步发展。

为追求更极致的体验，我们把数据处理部分从 BizChars 中完全抽离出来，对数据处理本身进行了进一步的抽象，扩展和优化，从而实现了一个独立的数据处理模块 DataSet。

首先我们把数据处理分为两个大的步骤：数据连接（Connector）和数据转换（Transform）。Connector 负责导入和归一化数据（譬如导入 CSV 数据，导入 GeoJSON 数据等），Transform 负责进行各种数据转换操作（譬如图布局、数据统计、数据补全等）。通过这样的分层，支持了前端社区非常全面的数据处理相关的算法和模块；其次，我们在单个数据视图（DataView）的基础上增加了数据集（DataSet）的概念，通过统一的 DataSet 管理，实现了各个数据视图之间的状态同步和交互。整个数据处理模块的架构如下图。

![data-set structure](https://img.alicdn.com/tfs/TB1pjlYcf6H8KJjy0FjXXaXepXa-1186-655.png)

## 安装

### 浏览器引入

可以通过`<script>`标签引入在线资源或者本地脚本。

```html
<!-- 引入在线资源 -->
<script src="https://gw.alipayobjects.com/os/antv/assets/data-set/0.8.0/data-set.min.js"></script>
```

```html
<!-- 引入本地脚本 -->
<script src="./data-set.js"></script>
```

这样，就可以在后续脚本中得到全局变量 DataSet。

```html
<script src="https://gw.alipayobjects.com/os/antv/assets/data-set/0.8.0/data-set.min.js"></script>
<script>
var dv = new DataSet.View();
</script>
```

### 通过 npm 安装

<a href="https://www.npmjs.com/package/@antv/data-set" target="_blank"><img src="https://img.shields.io/npm/v/@antv/data-set.svg?style=flat-square"></a>

我们提供了 DataSet 的 npm 包，可以通过下面的命令进行安装。

```bash
npm install @antv/data-set --save
```

安装后即可使用 `import` 或者 `require` 进行引用。

```js
import { View } from '@antv/data-set';
const dv = new View();
```

## api文档
DataSet 主要完成了以下功能：
 *源数据的解析，将csv, dsv,geojson 转成标准的JSON
 *加工数据，包括 filter,map,fold(补数据) 等操作
 *统计函数，汇总统计、百分比、封箱 等统计函数
 *特殊数据处理，包括 地理数据、矩形树图、桑基图、文字云 的数据处理
具体参见[dataset api 文档](../api/dataset.md)

## 使用示例

### 单独使用 DataView
如果仅仅是对数据进行加工，不需要图表联动

### 状态量
在G2 3.0 中使用 DataSet 的状态量(State) 可以很容易的实现图表的联动，步骤如下：
    1.创建 DataSet 对象，指定状态量
    2.创建 DataView 对象，在 transform 中使用状态量
    3.创建图表，引用前面创建 DataView
    4.改变状态量，所有 DataView 更新

```js
// step1 创建 dataset 指定状态量
const ds = new DataSet({
state: {
    year: '2010'
}
});

// step2 创建 DataView
const dv = ds.createView().source(data);

dv.transform({
type: 'filter',
callback(row) {
    return row.year === ds.state.year;
}
});


// step3 引用 DataView
<Chart data={dv}>
</Chart>

// step4 更新状态量
ds.setState('year', '2012');
```

#### 注意：
* 在 DataSet 创建了状态量后，默认会影响其管理的所有的 DataView， 可以通过 watchingStates 明确的指定受那些状态量影响，设置为空数组时不受状态量的影响。
* 所有引用了 DataSet 管理的 DataView 的图表都会受自动刷新，不需要手工刷新。

### 图表联动示例

假设我们有一个 CSV 文件 `population-by-age.csv`，里面的数据是美国各个州不同年龄段的人口数量，文件内容如下：

| State	| 小于5岁 | 5至13岁 | 14至17岁 | 18至24岁 | 25至44岁 | 45至64岁 | 65岁及以上 |
| ----	| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| WY | 38253 | 60890 | 29314 | 53980 | 137338 | 147279 | 65614  |
| DC | 36352 | 50439 | 25225 | 75569 | 193557 | 140043 | 70648  |
| VT | 32635 | 62538 | 33757 | 61679 | 155419 | 188593 | 86649  |
| ND | 41896 | 67358 | 33794 | 82629 | 154913 | 166615 | 94276  |
| AK | 52083 | 85640 | 42153 | 74257 | 198724 | 183159 | 50277  |
| SD | 58566 | 94438 | 45305 | 82869 | 196738 | 210178 | 116100 |
| ...	| ... | ... | ... | ... | ... | ... | ... |

我们希望把 CSV 文件的内容载入，画一个以州为横轴，人口数量为纵轴的层叠柱状图，并且在查看某个柱子的时候，希望能看到对应某个州的对比各个年龄段人口数量的饼图。下面我们来看看应该怎么画？

> Step1：创建数据集 DataSet 实例，管理 state 状态量

```js
const ds = new DataSet({
    state: {
        currentState: 'WY'
    }
});
```

> Step2：为层叠柱状图创建数据视图 View 实例，装载数据

```js
/*
 * 如果不需要用到状态管理之类的功能，也可以不基于 DataSet 实例创建数据视图
 * 直接用 const dv = new DataSet.View();
 * 本例需要用状态量在不同的数据视图实例之间通信，所以需要有一个 DataSet 实例管理状态量
 */
$.getJSON('/assets/data/population-by-age.csv', data => {
    const dvForAll = ds
        .createView('populationByAge') // 在 DataSet 实例下创建名为 populationByAge 的数据视图
        .source(data, {
            type: 'csv', // 使用 CSV 类型的 Connector 装载 data
        });
});
```

> Step3：合并人口数量列（新增"年龄段"和"人口"字段，把各个年龄段的人口数量列数据合并到这两列上）

```js
dvForAll.transform({
    type: 'fold',
    fields: [ '小于5岁','5至13岁','14至17岁','18至24岁','25至44岁','45至64岁','65岁及以上' ],
    key: 'age',
    value: 'population'
});
```

> Step4：为饼图创建数据视图实例，继承上一个数据视图的数据，通过状态量 currentState 过滤数据、统计不同年龄段人口占比

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
详情信息请[点击这里](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/other/bar-change-pie)
