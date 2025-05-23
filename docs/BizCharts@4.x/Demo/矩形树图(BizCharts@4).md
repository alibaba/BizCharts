# 矩形树图(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/e0fef800-9979-11ea-8225-e30c1937e15c.png)

```js
import DataSet from '@antv/data-set';
import { Chart, Polygon } from 'bizcharts';

const { DataView } = DataSet;
const data = {
  name: 'root',
  children: [
    { name: '分类 1', value: 560 },
    { name: '分类 2', value: 500 },
    { name: '分类 3', value: 150 },
    { name: '分类 4', value: 140 },
    { name: '分类 5', value: 115 },
    { name: '分类 6', value: 95 },
    { name: '分类 7', value: 90 },
    { name: '分类 8', value: 75 },
    { name: '分类 9', value: 98 },
    { name: '分类 10', value: 60 },
    { name: '分类 11', value: 45 },
    { name: '分类 12', value: 40 },
    { name: '分类 13', value: 40 },
    { name: '分类 14', value: 35 },
    { name: '分类 15', value: 40 },
    { name: '分类 16', value: 40 },
    { name: '分类 17', value: 40 },
    { name: '分类 18', value: 30 },
    { name: '分类 19', value: 28 },
    { name: '分类 20', value: 16 },
  ],
};
const dv = new DataView();
dv.source(data, {
  type: 'hierarchy',
}).transform({
  field: 'value',
  type: 'hierarchy.treemap',
  tile: 'treemapResquarify',
  as: ['x', 'y'],
});
// 将 DataSet 处理后的结果转换为 G2 接受的数据
const nodes = [];
for (const node of dv.getAllNodes()) {
  if (node.data.name === 'root') {
    continue;
  }
  const eachNode: any = {
    name: node.data.name,
    x: node.x,
    y: node.y,
    value: node.data.value,
  };

  nodes.push(eachNode);
}

const scale = {
  x: {
    nice: true,
  },
  y: {
    nice: true,
  },
}
console.log(dv.rows)
function Demo() {
  return <Chart
    scale={scale}
    pure
    height={200}
    autoFit
    data={nodes}
  >
    <Polygon
      color="name"
      position="x*y"
      style={{
        lineWidth: 1,
        stroke: '#fff'
      }}
      label={['name', {
        offset: 0,
        style: {
          textBaseline: 'middle',
        },
        content: (obj) => {
          if (obj.name !== 'root') {
            return obj.name;
          }
        }
      }]}
    />
  </Chart>
}

ReactDOM.render(<Demo />, mountNode);
```
