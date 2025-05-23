# Text



## 组件使用
[两种使用方式](/product/BizCharts4/category/61/page/181#使用方式)

## attrs属性

使用方式
```js
<Text attrs={{
          x: 100,
          y: 100,
          fontFamily: 'PingFang SC',
          text: 'This is text',
          fontSize: 60,
          fill: '#1890FF',
          stroke: '#F04864',
        }} />
```

### 通用属性
[绘图属性](./169)

### x
_<number>_
文字的位置坐标 x。

### y
_<number>_
文字的位置坐标 y。

### text
_<string>_
显示文字。

### fontStyle
_<object>_
设置字体样式。

### fontVariant
_<'normal' | 'small-caps' | string>_
设置小型大写字母的字体显示文本，可选值'normal' | 'small-caps' 或字符串。

### fontWeight
_<'normal' | 'bold' | 'bolder' | 'lighter' | number>_
设置字体粗细，可选值'normal' | 'bold' | 'bolder' | 'lighter'或数值。

### fontSize
_<number>_
设置字体的尺寸。

### fontFamily
_<string>_
设置字体类型。

### textAlign
_<string>_
- 设置文本内容的对齐方式, 支持的属性值有：
  - center
  - end
  - left
  - right
  - start

### textBaseline
_<string>_
- 设置在绘制文本时使用的当前文本基线, 支持的属性值有：
  - top
  - middle
  - bottom