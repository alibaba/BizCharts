const path = require('path');

module.exports = (name, source, main, config = {}) => ({
  name,
  source: path.join(__dirname, '..', 'demos', source),
  main,
  "cases": [
    {
      id: name, // 此 id 一旦创建不可修改
      config,
    },
  ]
});
