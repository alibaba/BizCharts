const create = require('./create');

module.exports = [
  create('geometry-line 测试', 'geom', 'line.jsx'),
  create('geometry-interval 测试', 'geom', 'interval.jsx'),
  create('feature-pure 测试', 'features', 'pure.jsx'),
  create('area-areaWithNull 测试', 'area', 'areaWithNull.jsx'),
  create('area-stackingArea 测试', 'area', 'stackingArea.jsx'),
  create('line-gradientPolyline 测试', 'line', 'gradientPolyline.jsx'),
  create('line-stepPolyline 测试', 'line', 'stepPolyline.jsx'),
  create('interval-basicBar 测试', 'interval', 'basicBar.jsx'),
  create('interval-basicColumn 测试', 'interval', 'basicColumn.jsx'),
  create('interval-histogram 测试', 'interval', 'histogram.jsx'),
  create('interval-bubble 测试', 'point', 'bubble.jsx'),
  create('interval-basicPoint 测试', 'point', 'basicPoint.jsx'),
  create('funnel-basicFunnel 测试', 'funnel', 'basicFunnel.jsx'),
  create('pie-basicPie 测试', 'pie', 'basicPie.jsx'),
  create('pie-nestedPie 测试', 'pie', 'nestedPie.jsx'),
  create('pie-nightingaleRoseIllustration 测试', 'pie', 'nightingaleRoseIllustration.jsx'),
  create('plot-bar', 'bugs', 'plot-bar.jsx'),
]
