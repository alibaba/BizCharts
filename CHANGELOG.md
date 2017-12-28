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