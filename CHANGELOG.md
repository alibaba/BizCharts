### 3.2.3
#### G2 version 3.2.7
#### buf fix
- fix(chart): downlownImage not working in svg context
- fix(event): fixed bug of guide-line click
- fix(g): avoid initializing matrix again, use reset instead
- fix(g): new a rect as clip instead of add the shape into a group
- fix(legend): fix continuous error position when useHtml is true
- fix(legend): slider mousemove events under the condition that legend container is a seperate canvas
- fix(region-filter): 判断layer销毁不执行创建shape的行为
- fix(tooltip): fixed tooltip bug of enterable feature
- fix(tooltip, event): fix plotleave and tooltip hide bugs

#### New Features
- chore(dev): remove svg-related building code
- chore(dev): update g and interaction
- chore(test): fixing test cases for new renderer
- chore(tooltip): blockTooltipChange -> stopTooltip
- feat(renderer): chart scope renderer switching
- feat(tooltip): add blockTooltipChange state
- feat(track): add trackingInfo for product analysis
- refactor(g): change __attrs to _attrs in tests

#### 3.2.1-beta.4
##### bug fix
- fix testDemo bugs: dataChange,data change lodash isEqual error.

#### 3.2.1-beta.3
##### bug fix
- after padding change, guide disappear.
- after geom label content change, change padding, geom label content change as before.

#### 3.2.1-beta.2
##### New Features
- feat(tooltip): support custom format
- add RegionFilter, DataMarker, DataRegion components
- add Guide Map demos
- support chart render svg

##### bug fix
- fix(legend): constrain size legend scroll bar size
- fix(tooltip): tooltip style in firefox, 
- fix(tooltip): Theme.tooltipMarker invalid.
- fix(legend): mouseover on customized legend title does not throw. 


#### 3.2.1-beta.1
- update to g2 3.2.7-beta.5
- support svg render for chart
- add bizcharts track info

#### 3.2.0
- update to g2 3.2.5

#### 3.1.10(6.15, 2018)
- reset g2 to 3.1.2

#### 3.1.9(6.15, 2018)
- fix 370, 365, 312
- update to g2 3.2.0-beta.1
- support render chart as svg

#### 3.1.8(5.28, 2018)
- according to the need load resources
- fix #204 #318 #327

#### 3.1.7(5.2, 2018)
- fix main Entrance

#### 3.1.6(5.2, 2018)
- up g2 version
- fix ts issue
- fix package browser module

#### 3.1.5(4.10, 2018)
- fix issue 244\249\210

#### 3.1.4(3.26, 2018)
- add types in package.json.

#### 3.1.4-beta.4(3.26, 2018)
- update g2 3.0.5-beta.5
- fix types g2 ts.index path.
- delete no need console logs.

#### 3.1.4-beta.3(3.12, 2018)
- update g2 3.0.5-beta.4
- when props change nothing, bizcharts will not repaint chart.

#### 3.1.4-beta.2(3.6, 2018)
- fix node-env development do not use prop-types as external lib.

#### 3.1.4-beta.1(3.6, 2018)
- bizcharts/umd do not use prop-types as external lib.

#### 3.1.3(3.2, 2018)
- fix issue 184, 99, 174, 164
- update g2 3.0.5-beta.4

#### 3.1.3-beta.2 (2.1, 2018)
- delete array.prototype find, and use for in to find
- update g2 3.0.5-beta.1

#### 3.1.3-beta.1 (1.29, 2018)
- Compatible with ie10&9
- update g2 3.0.4

#### 3.1.2 (1.18, 2017)
- fix `<Label>` prop update.

#### 3.1.1 (1.18, 2017)
- update g2 3.0.4-beta.4.
- when data=null show g2 axis.

#### 3.1.0 (1.07, 2017)
the release version which compate react16.

#### 3.1.0-beta.6 (12.29, 2017)
delete the no need dependence react-dom.
fix https://github.com/alibaba/BizCharts/issues/67

#### 3.1.0-beta.4 (12.28, 2017)
fixed update padding over and over again, geoms will be null.

#### 3.1.0-beta.3 (12.28, 2017)
upgrade g2 version to 3.0.4-beta.2.
fixed resize and update padding in the same time, g2 crash.

#### 3.1.0-beta.2 (12.27, 2017)
fix `<Axis visible={false}>` do not work.
add placeholder property to handle data is null.

#### 3.1.0-beta.1 (12.22, 2017)
Compatible with react16 version.
The use of facet changes, see [facet api doc]( https://github.com/alibaba/BizCharts/blob/master/doc/api/facet.md).

#### 3.0.5 (12.13, 2017)
Synchronization to g2 3.0.1 release version.

#### 3.0.4 (12.04, 2017)
fix chart invalid onPlotClick event.

#### 3.0.3 (11.28, 2017)
fix when resize chart container size, chart's label will be drawed twice.

#### 3.0.2 (11.23, 2017)
修复包入口，改为打包后的 umd 格式文件。
修改 Readme.md, 加入中英文双语介绍。

#### 3.0.1 (11.22, 2017)
修复 3.0.0 导出问题，使用时需要 BizCharts.default.Chart。
修复后直接可以 BizCharts.Chart 这样使用。
