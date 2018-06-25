module.exports = {
  toolkit: 'bizcharts-material',
  tasks: {
    start: [
      {
        command: 'fie link',
      },
      {
        command: 'npm start',
      },
    ],
    build: [
      {
        // 生成 es5 代码
        command: 'npm run compile',
      },
      {
        // 构建生成线上预览地址
        command: 'npm run build',
      },
    ],
  },
};
