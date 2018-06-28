# 样例大屏介绍

来自 Google Data Studio 中的电视广告传播效应分析仪表盘模版。

![image.png | left | 719x411](https://img.alicdn.com/tfs/TB1eGsixDtYBeNjy1XdXXXXyVXa-1325-872.png "")


## 命令

> 具体开发流程顺序如下

### 启动 & 调试

```
fie start
```

### 编译

```
fie build
```

### 发布

**发布日常**

```
fie publish d
```

**发布线上**

```
fie publish
```

**只发布 npm 包**

```
fie publish package
```

## 目录结构

```
.
├── README.md
├── build // fie build 后生成的目录
│   ├── index.html // 线上可预览的页面
│   └── main.min.js // 打包后的 bundle
├── db.json // 给 ice 打包用的，开发者无需关心
├── fie.config.js
├── index.html // 本地调试页面
├── index.js // 入口 js
├── menuConfig.js // 菜单配置
├── package.json
├── router.jsx // 路由
├── routerConfig.js // 路由配置
├── src
│   └── pages
└── webpack.config.js
```
