
# 主题

## 图表主题
BizCharts 默认提供了两种主题:default、dark。
<img src="https://gw.alipayobjects.com/zos/rmsportal/EQadCjVFfaXjuPbSySJp.png" width="80%">

## 主题切换
用户可以使用 `BizCharts.setTheme(themeName)` api 切换图表的主题。

示例：
```jsx
  BizCharts.setTheme('dark');
```

## 自定义主题
用户可以使用 `BizCharts.setTheme(themeConfig)` api 切换自定义的主题。

示例：
```jsx
  const seaTheme = {
    animate:false,
	colors:{},
	shapes:{},
  };
  BizCharts.setTheme(seaTheme);
```
更多主题配置请参见 [defaultTheme](../api/theme.md)
