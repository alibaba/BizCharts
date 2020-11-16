## 4.0.15
##### 依赖升级
@antv/g2@4.0.15
@antv/g2Plot@1.1.28
##### featrue
大量数据下数据对比开关，用户可自己控制不进行图表配置项对比，新增属性 notCompareData。

##### fixed:
修复 translate 平移失效。
修复 slider 初始化start和end失效问题。 #1269
修复 Tooltip 由于自定义tooltip更新数据重渲染过程触发的默认tooltip没有销毁，表现为偶现两个tooltip。#1267
修复 Tooltip triggerOn 优先级应该该与lock 逻辑。
scale 发生变化不重建图表，转场重渲染，表现为scale改变有默认图形切换过程而非现在直接更新。
之前使用g2的changeData修改图表数据导致绘制两次，所以做来性能优化

##### 风险：
4.0.14 & 4.0.15两个版本依赖的g2版本中Axis轴事件失效。 4.0.13 如果使用到了坐标轴事件的亲，请暂时锁定版本。非常抱歉带来的不便。已经与g2团队一起修复，在4.1.0的版本中修复此问题。

## 4.0.14
- g2@2.0.15
- g2Plot@1.1.23
@antv/component": 0.7.2
##### fixed
- 修复jsx的tooltip removeChild 的bug
- 引入brush 的交互声明 <Interaction type="brush" />
- tooltip 点击锁定位置无效的问题
- getTheme 重复export


## 4.0.13
- g2@2.0.14
- g2Plot@1.1.23
##### feature
- plot 组件支持forceUpdate


## 4.0.13
- g2@2.0.14
- g2Plot@1.1.23
##### feature
- plot 组件支持forceUpdate

## 4.0.12 
- g2@2.0.14
- g2Plot@1.1.15
##### bugfix
- Tooltip triggerOn="click" 点击后才展示。
- 图表销毁和react销毁顺序问题导致，自定义tooltip 偶发removeChild 错误。
##### feature
- 新增 LineAdvance 的图形组件。
- 图表联动，当前支持没有设置adjust的图表联动。详细见Tooltip linkage 属性文档。
- Tooltip 点击后锁定位置。详见 Tooltip lock 属性文档。

### 4.0.11 (2020-07-23)
##### g2依赖 升级
- g2@2.0.12
- g2Plot@1.1.7 
##### bugfix
- react-reconciler required but not add into deps #1219
- Duplicate export #1221
- 修复Coordinate组件的action属性

### 4.0.10 (2020-07-14)
##### g2依赖 升级
- g2@2.0.12
- g2Plot@1.1.7 
##### bugfix
- Roboto字体带来的,中文裁切问题 
- 适配 g2 新增的一层div，dom 结构变化影响自定义Tooltip定位。


··· 中间是欠大家的log

### 4.0.0 正式发布 (2020-04-30)
