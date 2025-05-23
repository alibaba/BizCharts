# Slider

当数据量过大的时候可使用缩略轴控制数据窗口。

注意：版本 >= 4.0.3

代码示例
```
import { Chart Slider Line } from 'bizcharts';

<Chart padding="auto" autoFit height={500} data={data} >
    <Line shape="hv" position="month*value" />
    <Slider end={0.8} />
  </Chart>
```



## API

### height 
_<number>_
- 描述：slider 高度

### trendCfg 
_<object>_
- 描述：滑块背景区域配置
```js
{
  data: number[], // 背景图显示的数据
  smooth?: boolean, // 是否平滑
  isArea?: boolean, // 是否显示区域
  backgroundStyle?: object, // 背景图样式
  lineStyle?: object, // 线条样式
  areaStyle?: object, // 数据区域样式
}
```

### backgroundStyle 
_<object>_
- 描述：滑块背景样式

### foregroundStyle 
_<object>_
- 描述：滑块前景样式 

### handlerStyle 
_<object>_
- 描述：滑块两个操作块样式 

### textStyle 
_<object>_
- 描述：文本样式 

### minLimit 
_<number>_
- 描述：允许滑动位置的最大值,0-1的数值。

### maxLimit 
_<number>_
- 描述：允许滑动位置的最小值, 0-1的数值。

### start 
_<number>_
- 描述：滑块初始化的起始位置, 0-1的数值。

### end 
_<number>_
- 描述：滑块初始化的结束位置, 0-1的数值。

### formatter 
_<function>_
- 描述：滑块初始和结束文本格式化。
```js
formatter(val: any, datum: Datum, idx: number) => any;
```

