
---
## 快速开始

### 通过 TNPM/NPM 安装   ![](http://web.npm.alibaba-inc.com/badge/v/@ali/bizcharts.svg?style=flat-square)

```bash
tnpm install @ali/bizcharts --save
```
### 使用示例
<center >![](https://img.alicdn.com/tps/TB1PVaoPFXXXXcSaXXXXXXXXXXX-519-401.png)</center >
```jsx
// 渲染图表
ReactDOM.render((
  <Chart width={600} height={400} data={data} scale={cols}>
      <Axis name="genre" />
      <Axis name="sold" />
      <Legend position="top" dy={-20} />
      <Tooltip />
      <Geom type="bar" position="genre*sold" color="genre" />
    </Chart>
), document.getElementById('mountNode'));
```
