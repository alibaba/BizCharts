import React from 'react';
import { render } from 'react-dom';
import Demo from '../src/index';

// 勿删 支持主题自动截图
const theme = window.location.search.match(/\?theme=(\w+)/);
if (theme) {
  // 暂时只支持 dark
  if (theme[1] === 'dark') {
    G2.Global.setTheme('dark');
  }
}

render(
  <Demo />,
  document.getElementById('container')
);
