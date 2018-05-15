<!--
index: 15
title: Theme 图表皮肤主题
resource:
  jsFiles:
    - ${url.dataSet}
    - ${url.g2}
-->

# 主题

**引用: [G2 Theme](https://antv.alipay.com/zh-cn/g2/3.x/tutorial/theme.html)**

## 图表主题
Bizcharts 提供了两种内建的主题: `default` and `dark`.
<img src="https://gw.alipayobjects.com/zos/rmsportal/EQadCjVFfaXjuPbSySJp.png" width="80%">

## 如何改变主题

你可以通过 `BizCharts.setTheme(themeName)` API 来改变主题.

Exmaple:

```jsx
  BizCharts.setTheme('dark');
```

## 自定义主题
当调用  `BizCharts.setTheme()` API 传入的参数是一个对象时，这个时候代表使用你自定义的主题配置。

Example:
```jsx
  const seaTheme = {
    animate:false,
	colors:{},
	shapes:{},
  };
  BizCharts.setTheme(seaTheme);
```

更多的自定义配置项, 请参考 [Theme API](/doc/api/theme.md)
