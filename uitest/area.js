const path = require('path');

module.exports = {
  "name": "AreaChart",
  "source": path.join(__dirname, '..', 'src', 'plots', 'area'),
  "main": "index.tsx",
  "cases": [
    {
      id: '测试用例1', // 此 id 一旦创建不可修改
      config: {
        title: "2018年爆款商品A销售趋势",
        description: {
          text: "一达通进出口业务"
        },
        slider: true,
        xAxis: {
          visible: true
        },
        renderer: "svg",
        line: true,
        label: true,
        smooth: true,
        point: {
          visible: true,
          fill: "#cccccc"
        },
        yField: "count",
        xField: "month",
        forceFit: true,
        data: [
          { month: "Jan", type: "商品A", count: 1600 },
          { month: "Feb", type: "商品A", count: 4500 },
          { month: "Mar", type: "商品A", count: 5500 },
          { month: "Apr", type: "商品A", count: 4200 },
          { month: "May", type: "商品A", count: 2200 },
          { month: "Jun", type: "商品A", count: 11400 },
          { month: "Jun", type: "商品A", count: 1400 },
          { month: "Jul", type: "商品A", count: 1800 },
          { month: "Aug", type: "商品A", count: 2500 },
          { month: "Sep", type: "商品A", count: 3300 },
          { month: "Oct", type: "商品A", count: 3500 },
          { month: "Nov", type: "商品A", count: 2800 },
          { month: "Dec", type: "商品A", count: 2600 }
        ]
      }
    },
  ]
};