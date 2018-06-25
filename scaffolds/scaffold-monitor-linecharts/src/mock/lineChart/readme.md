# 曲线图主数据格式说明

```js
{
  "code": 200,
  "data": {
    "cityName": cityData[]
  },
  msg: "",
}
```
type of cityData  

```ts
interface cityData = {
  "timestamp": number,
  "value": number,
  "status": 0 | 1 | 2, // 0: 正常数据； 1: 有干扰数据，异常峰值或低谷； 2: 预警数据
}
```
