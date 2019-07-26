### 3.5.5
#### G2 version 3.5.8-beta.1
#### Fix Bugs
- fix bizcharts error can't be fresh.


### 3.5.4
#### G2 version 3.5.7
#### Fix Bugs
- dataview datasource length is 0,show placeholder.

### 3.5.4-beta.0
#### G2 version 3.5.7
#### Fix Bugs
- fix chart forceFit is false

### 3.5.3
#### G2 version 3.5.7
#### Fix Bugs
- data=[], legend tail bug
- fix issue-590

### 3.5.1
#### G2 version 3.5.2
#### Fix Bugs
- 饼图数据为空时，报错。

### 3.5.1
#### G2 version 3.5.1
#### Fix Bugs
- 韦恩图VennChart 接口变更支持。

### 3.5.0
#### G2 version 3.5.1
#### New Features
- feat(venn): venn geom label supports position adjusting
- feat(types): improve TooltipConfig type definition
- feat(types): add full LegendConfig.position enums.

#### Fix Bugs
- fix: label should keep default textStyle when textStyle is a function and returns null.
- fix: 兼容，legend实例attr中存在x与y而canvas形式中是通过group获取的兼容.
- fix(scale): Scale config should be effective when data is null or data length is 0.
- fix(legend): fix the scale alias for mixed legend does not work.
- fix(tooltip): Added line to TooltipConfig crosshairs type
- fix(Scale): 线性缩放时，需要深拷贝scale配置. 
- fix: auto padding blocks axis title.
- fix(schema): use cfg.color for lineAttrs.stroke if available.
- fix(HtmlTooltip): 在特定场景下HtmlTooltip.hide()时大概率获取不到container
- fix(label): show label for heatmap.
- fix: Use cfg.color for lineAttrs.stroke if available.
- fix: issue-1167 还原格式化.
- fix: when guide.html() is defined, legends is not in view. 
- fix: bug in guide. 
- fix: *.d.ts: Shape.registerShape and BashView.coord declare


### 3.4.5
#### G2 version 3.4.10
#### Bug Fixes
- revert chart data update, have no animation.
- fix legend ts position props.

### 3.4.4 (版本有问题，已经撤销)
#### G2 version 3.4.10
#### Bug Fixes
- fix chart data update, have no animation.

### 3.4.3 (2018-01-08)
#### G2 version 3.4.9
#### Bug Fixes
- fix(chart): auto padding with more accurate backPlot range.
- fix: applyMatrix when calculating bbox of axis title
- fix(chart): auto padding with more accurate backPlot range.
- clearInteraction不能清除scrollBar的bug
- fix pie-label adjustItems offset err


### 3.4.2 (2018-12-26)
#### G2 version 3.4.8
- All tracking code is removed, no more unexpected remote request will be sent.

#### Bug Fixes
- fix(interval): error bar filling issue.
- fix(schema): error bar can't show
- fix(scale & filter): remove min max limit if field filtered
- fix(shape): liquid fill shapes should use hollow shape styles by default,
- fix(tooltip): 正确清除 markers

### 3.4.1 (2018-11-28)
#### G2 version 3.4.5
#### Bug Fixes
- geom opacity is function
- tooltip crosshair style & dark theme tooltip


### 3.3.1 (2018-11-19)

#### G2 version 3.3.4

#### Bug Fixes

- update @antv/compnent0.2.7, fix pie label bug

### 3.3.0 (2018-11-16)

#### G2 version 3.3.4

#### New Features

- chore(demo): add some guide demos.
- chore(dev): @babel/env => @babel/preset-env
- chore(dev): add scripts for npm run pixel-test
- chore(dev): update issue templates
- chore: modify components reference
- feat(theme): add chart view theme to tooltip
- feat: add default style for guide component.
- feat: add label type: interval
- feat: component legend
- feat: demo for custom html legend. fix: custom html and htmlpage category legend
- feat: double direction interaction (from chart to legend)
- feat: legend component html scroll
- feat: legend demos
- feat: legend-component, html controller, offset
- feat: mini tooltip
- feat: tooltip controller module import
- refactor(axis): AxisController
- refactor(demo): modify demos' styles
- refactor(demo): modify html tooltip styles
- refactor(geom-labels): merge master
- refactor(legend): update demo html style
- refactor(tooltip): modify tooltip marker style
- refactor: adapt to new guide components.
- refactor: better guide.render().
- refactor: modify some test case with Labels
- refactor: tooltip controller
- refactor: use @antv/components to render label instead of Labels
- refactor: use components to render label instead of `Labels`
- refator: modify label callback args to fields
- revert: remove polar coordinate support
- test(bin): add scripts for npm run pixel-test
- test: add Node.js 10
- test: delete some tests; fix: @antv/component/lib
- test: legend controller

#### Bug Fixes

- fix(area): modify default style of area
- fix(area): remove default fillOpacity from area shape
- fix(axis): clear axis component correctly in axisController
- fix(axis): set default label offset to 8px
- fix(dev): require lib version instead of src
- fix(geom-labels): add unit test of scaled coord labels
- fix(geom-labels): change label dependency to lib
- fix(geom-labels): fix callback value type
- fix(geom-labels): fix default label textStyle sometimes doesn't work
- fix(geom-labels): fix label dependency
- fix(geom-labels): fix label offset format to match with component
- fix(geom-labels): fix offset exception when coord is scaled
- fix(geom-labels): fix polygon label position calculation
- fix(geom-labels): fix transposed text align logic
- fix(geom-labels): modify label position calculation when geom is polygon
- fix(geom-labels): resume drawLines
- fix(label): merge labelLine only if a value is assigned to it
- fix(legend): fix default style of color-legend demo
- fix(legend): fix default style of legend marker of area
- fix(legend): fix default style of legend marker of area & demo styles
- fix(legend): marker for area should be a closed path
- fix(pie-label): fix labelLine end point error
- fix(test): auto padding in ci evironment
- fix(tooltip): fixed tooltip won't hide when plotleave fired
- fix(tooltip): should not merge viewTheme into default tooltip cfg again
- fix(tooltip): viewTheme in controller
- fix(tooltip):mini-tooltip flash
- fix: configuration to control the interaction from chart to legend -- reactive [boolean]
- fix: fix polar labels don't work
- fix: html legend filter
- fix: scales to scale
- fix: viewTheme


### 3.2.4（2018-9-26）
#### G2 version 3.2.8
#### New features
* add chart forceUpdate prop.
* add animate false test lib
* chore(dev): coord as an interval dependency
* chore(dev): upgrade babel
* chore(dev): upgrade dataset, support grouped KED transform
* feat(geom): support dodge adjust for violin geom
* feat(geom): support violin
* feat(geom): violin geom supports smooth/smoothHollow shapes
* feat(guide): add start,end support
* refactor(arc): sort out codes related to Math
* refactor(polar): add endAngle until endAngle > startAngle

#### bug fix
* fix(Global): G2.Global.animate setting is not working,
* fix(arc): fix unable to draw circle
* fix(arc): when start and end is equal, it should not be a circle
* fix(chart): getSnapRecords for points. 
* fix(dev): upgrade babel preset env for torchjs
* fix(label): modify unit tests of label rotation
* fix(label): stop setting rotation in attr(), use shape.transform instead
* fix(legend):field option error
* fix(liquidfill): clip shape should not be added into group
* fix(polar): add endAngle until endAngle > startAngle
* fix(polar): avoid possible exception when startAngle > endAngle
* fix: add unit test of Polar coord when startAngle > endAngle
* fix: add unit test of drawing arc
* fix: modify test case accordingly
* fix: resume origin code of direction
* fix: 修复shared为false，tooltip不随动的bug
* fix: 修改tooltip方法，旧的存在bug，导致typscript报错，无法使用第一个方法。


### 3.2.3（2018-9-25）
#### G2 version 3.2.7-beta.5
#### New features
* add chart forceUpdate prop.

### 3.2.2
#### G2 version 3.2.7
#### bug fix
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
