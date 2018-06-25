# 脚手架介绍

Bizcharts template. Origin from [https://datastudio.google.com/reporting/0B_U5RNpwhcE6ckdmZEJ0ZDJXUnM/page/VgD/preview](https://datastudio.google.com/reporting/0B_U5RNpwhcE6ckdmZEJ0ZDJXUnM/page/VgD/preview)

![](https://img.alicdn.com/tfs/TB1ilYex25TBuNjSspmXXaDRVXa-2840-1596.png)

## 命令

> 具体开发流程顺序如下

### 启动 & 调试

```
npm start
```

### 编译

```
npm build
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