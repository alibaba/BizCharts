
# 图表交互

## 默认交互
包括：
- active 激活，鼠标hover。
- select 选中，鼠标点击选择、框选。

## 激活
开启以及关闭 shape 对于鼠标 hover 时的响应效果，默认为各个 `<Geom>` 内置了 active 效果 。可以通过 *active* 属性关闭及开启。
例如：
```
<Geom active={false} />
<Geom active={true} />
```

## 选中
各个几何标记 geom 选中的模式包含如下三种：
1. 不可选中；
2. 单选；
3. 多选；
4. 选中是否可取消选中。

选中模式的设置方式如下：

```jsx
<Geom select={false} />; // 关闭
<Geom select={true} />; // 打开
<Geom select={[true, {
 mode: 'single' || 'multiple', // 选中模式，单选、多选
 style: { }, // 选中后 shape 的样式
 cancelable: true | false, // 选中之后是否允许取消选中，默认允许取消选中
 animate: true | false // 选中是否执行动画，默认执行动画
}]} />;
```

默认情况下，G2 中只有饼图支持选中交互，其他 geom 的选中模式默认情况下都是关闭的。

**图表交互控制可以跟[图表事件](../api/chart.md#event)结合用来定制图表的自定义交互，参见demo:[地图省市下钻](https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/map/drill-down)**

