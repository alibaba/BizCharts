import { setAddon, configure, addDecorator, addParameters } from '@storybook/react';
// import JSXAddon from 'storybook-addon-jsx';
// import { setDefaults } from 'react-storybook-addon-props-combinations';
import { text, withKnobs, boolean, number } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo); 
addDecorator(withKnobs); 
addParameters({
  info: {
    inline: true,
    header: false,
  },
  backgrounds: [
    { name: '亮色主题', value: '#ffffff', default: true },
    { name: '暗色主题', value: '#3c4454' },
  ]
});


// automatically import all files ending in *.stories.tsx
// @ts-ignore
const req = require.context('../__stories__', true, /.stories.(jsx|tsx)$/);

function loadStories() {
  req.keys().forEach(req);
}
addParameters({
  options: {
    panelPosition: 'right',
    theme: {
      appBg: '#FFFFFF',
      textColor: '#000',
      colorSecondary: '#184c7c',
      brandTitle: 'BizCharts-plot',
      fontBase: 'PingFang-SC, Roboto, Microsoft YaHei',
      brandUrl: '//bizcharts.alibaba.net/index',
      brandImage: '//img.alicdn.com/tfs/TB1rvjLvkvoK1RjSZFwXXciCFXa-164-41.svg'
    }
  },
})
configure(loadStories, module);
