# 3.1.3-beta.2 (3.2, 2018)
- fix issue 184, 99, 174, 164
- update g2 3.0.5-beta.4

# 3.1.3-beta.2 (2.1, 2018)
- delete array.prototype find, and use for in to find
- update g2 3.0.5-beta.1

# 3.1.3-beta.1 (1.29, 2018)
- Compatible with ie10&9
- update g2 3.0.4

# 3.1.2 (1.18, 2017)
- fix `<Label>` prop update.

# 3.1.1 (1.18, 2017)
- update g2 3.0.4-beta.4.
- when data=null show g2 axis.

# 3.1.0 (1.07, 2017)
the release version which compate react16.

# 3.1.0-beta.6 (12.29, 2017)
delete the no need dependence react-dom.
fix https://github.com/alibaba/BizCharts/issues/67

# 3.1.0-beta.4 (12.28, 2017)
fixed update padding over and over again, geoms will be null.

# 3.1.0-beta.3 (12.28, 2017)
upgrade g2 version to 3.0.4-beta.2.
fixed resize and update padding in the same time, g2 crash.

# 3.1.0-beta.2 (12.27, 2017)
fix `<Axis visible={false}>` do not work.
add placeholder property to handle data is null.

# 3.1.0-beta.1 (12.22, 2017)
Compatible with react16 version.
The use of facet changes, see [facet api doc]( https://github.com/alibaba/BizCharts/blob/master/doc/api/facet.md).

# 3.0.5 (12.13, 2017)
Synchronization to g2 3.0.1 release version.

# 3.0.4 (12.04, 2017)
fix chart invalid onPlotClick event.

# 3.0.3 (11.28, 2017)
fix when resize chart container size, chart's label will be drawed twice.

# 3.0.2 (11.23, 2017)
修复包入口，改为打包后的 umd 格式文件。
修改 Readme.md, 加入中英文双语介绍。

# 3.0.1 (11.22, 2017)
修复 3.0.0 导出问题，使用时需要 BizCharts.default.Chart。
修复后直接可以 BizCharts.Chart 这样使用。