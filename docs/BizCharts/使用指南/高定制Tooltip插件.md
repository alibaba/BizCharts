# 高定制Tooltip插件

> Bizcharts 基于g2之上开发，所以默认tooltip功能只能支持字符串模版，或者dom元素。所以bx 生态为您提供了一个便捷插件 @ali/bx-tooltip

## 适用场景
- 要求，bizcharts 3.X, react: 16.3 以上
- 自定义 Tooltip
- 使用react UI 组件的tooltip，例如实现图表下钻等功能。
- 图表嵌套Tooltip，除fusion next / antD 组件外，可放入任意react组件包括嵌套bizcharts图表

## 安装

```node
tnpm install @ali/bx-tooltip --save
```

## 使用

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@alifd/next';
import useCustTooltip from 'bx-tooltip';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";

const data = [
      {year: "1991",value: 3 },
      {year: "1992",value: 4},
      {year: "1993",value: 3.5},
      {year: "1994",value: 5},
      {year: "1995", value: 4.9},
      {year: "1996",value: 6},
      { year: "1997",value: 7 },
      {year: "1998",value: 9},
      {year: "1999", value: 13}
    ];

const Basic = () => {
    const [ BxChart, CustTooltip ] = useCustTooltip(Chart, Tooltip);
    return (
      <div>
        <BxChart height={400} data={data} forceFit>
          <Axis name="year" />
          <Axis name="value" />
          <Geom type="line" position="year*value" />
          <Geom type="point" position="year*value" />
          <CustTooltip enterable triggerOn="click" >
            {(title, items, dom) => {
              // 第三个参数dom 是tooltip最外层的节点。
              // console.log(title, items);
              return <>
                自定义tooltip <br/>
                title: {title}
                {items.map((it, idx) => <div key={idx}>
                color: {it.color}<br/>
                数据: {it.point._origin.value}<br/>
                <Button type="primary" >详细信息</Button>
                </div>)}
              </>;
            }}
          </CustTooltip>
        </BxChart>
      </div>
    );
};

ReactDOM.render((
  <Basic />
), mountNode);
```

[在线试一试](https://codesandbox.io/s/amazing-golick-i693t?file=/src/App.js)

![demo截图](https://ata2-img.cn-hangzhou.oss-pub.aliyun-inc.com/fabbbc0c61e869259a7f0a3c653cde24.png)

> Ps: 此方案仅为3.5.X用户的方案。在bizcharts 4.0 版本中，会直接支持react组件。


