# BizCharts 4.0 升级





## 新特性
- 升级依赖 G2 4.0, react >= 16.13.x。
- 内置了g2-plot机制，快速实现基础图表，详情请[点击此链接](/product/BizCharts4/category/77/page/116)。
- 全面拥抱 TypeScript。
- 拥抱react hook 提供更强大的子组件拓展与封装能力。
- 更灵活的tooltip定制能力，轻松实现数据下钻。
- 全新的可视化组件：面向交互，体验优雅。
- 强大的 View 模块：可单独使用，具备完备的可视化组件、事件，支持 View 嵌套以及自动布局。
- 绘图引擎升级至 G 0.4 版本，支持双引擎切换。
- 引入数据更新机制。
- 动画机制改造，更细粒度，体验更好。
- 模块化管理，提供更加灵活的扩展机制。

## API 变更

4.0 在功能上全面兼容 3.x 的功能，在 API 接口上，我们进行了一些优化，在最大程度兼容 3.x 语法的基础上，提供了对用户更加友好，更易理解的函数命名以及更合理的配置项结构，具体的变化记录如下：
> 为了方便升级我们在4.0.x的版本上对大部分API都进行了适配，并会在console中提醒升级所对应的api。这些**升级提示将在4.1后移除。**

## 不兼容改动
- Bizcharts 默认开启Tooltip Axis Legend的功能，如果不需要可通过配置visible关闭此能力。
- `<Coord />` 组件废弃，将使用更加语义化的`<Coordinate /> `组件替代。
- `<Guide />` 组件废弃，且不需要嵌套使用Guide子组件。将使用`<Annotation.Text />` 等替代。其中 Guide.Html 不再支持。
- `<Chart forceFit />` 的属性更名为autoFit,且支持高度适应。
- `<Chart padding={[10,20]} />` 的padding属性只支持number[] | 'auto' 类型。不再支持 ['auto', 10, 'auto', 'auto'] 'auto' 与数字的混合用法。
- `<Geom />` 组件的label 不支持html类型
-  所有图形组件 按需引用路径发生变化，请看具体图形组件文档。
- `<Geom />` 子组件4.1版本后不再支持 `<Label />`组件，请使用Geom的label属性进行配置。
- `<Legend onClick />` 请使用 onValueChange替代，useHtml 不再支持。
- `<Chart />` 4.0 事件返回对象统一，第二个参数为图表实例，`(ev: eventObje, chart: G2Instance ) => any`;
- 不再支持intervalStack 图形。请使用`<Interval adjust="stack" />`
- 不再吐出 Util 工具。
- 不支持dataView数据格式，请使用 `data={dv.rows}`替代
- tooltip 的背景辅助框不再配置项中支持，需要使用交互组件 <Interaction type="active-region" />; 同时支持直角坐标系和极坐标系
- 图形属性样式全都定义在style中。textStyle 修改为 style。例 
```js
chart.axis('value', {
  label: {
    style: {
      textAlign: 'center',
    }, // 设置坐标轴文本样式
  },
  line: {
    style: {
      stroke: '#E9E9E9',
      lineDash: [3, 3],
    }, // 设置坐标轴线样式
  },
  grid: {
    line: {
      style: {
        lineDash: [3, 3],
      },
    }, // 设置坐标系栅格样式
  },
});

```

## 其他变更内容
- 推荐使用按需加载的方式使用图形组件。但不删除此用法，Geom组件在搭建场景自动配置场景下依然更加合适。
例 
```
<Geom type="interval" position="x*y" />
```
推荐
```
import Interval from 'bizcharts/lib/geometry/Interval';
<Interval position="x*y" />
```

## 新增组件

* `<Effects />` 可直接调用g2语法进行配置，方便特殊配置项与绘图过程debug。
```js
<Effects>
{(chart) => {
  // 处理过滤器之后的数据
  chart.getData().forEach(() => {
    return <Annotation.Text  {...}/>
  })
}}
</Effects>
```

## 不升级，同时使用两个版本
如果您的项目页面之间是隔离的，可以通过npm alias 使用多个版本的BizCharts 以使用新版本带来的新功能。
单页应用不支持，本质是一个页面，不支持多个版本同时使用。
```
npm install <alias>@npm:<name>:
// Examples:
npm install my-react@npm:react
npm install jquery2@npm:jquery@2
npm install jquery3@npm:jquery@3
npm install bizcharts@npm:bizcharts@3
npm install bizcharts4@npm:bizcharts@4
```
在项目使用
```jsx
import { Chart } from 'bizcharts4'; 
```
关于 npm alias:
在自定义别名下安装软件包。 允许并排使用多个版本的同名程序包，对于其他名称较长的程序包，则可以使用更方便的导入名称，并且可以使用git fork替换或派生的npm程序包作为替换。 别名仅在您的项目上起作用，并且不会在传递性依赖项中重命名程序包。 别名应遵循validate-npm-package-name中指定的命名约定。  
详细请阅读https://docs.npmjs.com/cli-commands/install.html
