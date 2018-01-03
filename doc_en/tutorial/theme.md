
# Theme

**Reference: [G2 Theme](https://antv.alipay.com/zh-cn/g2/3.x/tutorial/theme.html)**

## Chart Theme
Bizcharts provides two built-in themes: `default` and `dark`.
<img src="https://gw.alipayobjects.com/zos/rmsportal/EQadCjVFfaXjuPbSySJp.png" width="80%">

## Change Theme

You can change theme with the `BizCharts.setTheme(themeName)` API.

Exmaple:

```jsx
  BizCharts.setTheme('dark');
```

## Customize Theme
Also, by customizing the theme config and then call the `BizCharts.setTheme(themeConfig)` API.

Example:
```jsx
  const seaTheme = {
    animate:false,
	colors:{},
	shapes:{},
  };
  BizCharts.setTheme(seaTheme);
```
More detail about theme customization, reference [Theme API](/doc/api/theme.md)
