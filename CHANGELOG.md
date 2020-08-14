
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
