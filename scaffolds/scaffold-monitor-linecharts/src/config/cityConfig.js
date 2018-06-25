/**
 * 对城市信息进行全局颜色tip等元素配置
 */
export const cityConfig = [
  {
    city: '上海',
    color: '#F24B80',
    rgba: o => `rgba(242,75,128,${o})`,
    name: 'shanghai',
    tipImg: 'https://img.alicdn.com/tfs/TB1fO8Abv6H8KJjy0FjXXaXepXa-180-102.png',
  },
  {
    city: '北京',
    color: '#F9CB45',
    rgba: o => `rgba(249,203,69,${o})`,
    name: 'beijing',
    tipImg: 'https://img.alicdn.com/tfs/TB1ii8Abv6H8KJjy0FjXXaXepXa-180-102.png',
  },
  {
    city: '杭州',
    color: '#38E998',
    rgba: o => `rgba(56,233,152,${o})`,
    name: 'hangzhou',
    tipImg: 'https://img.alicdn.com/tfs/TB1MZlwbBfH8KJjy1XbXXbLdXXa-180-102.png',
  },
  {
    city: '深圳',
    color: '#00B7E5',
    rgba: o => `rgba(0,183,229,${o})`,
    name: 'shenzhen',
    tipImg: 'https://img.alicdn.com/tfs/TB15ClFbvDH8KJjy1XcXXcpdXXa-180-102.png',
  },
  // {
  //   city: '青岛',
  //   color: '#4D75FF',
  //   rgba: o => `rgba(77,117,255,${o})`,
  //   name: 'qingdao',
  //   tipImg: 'https://img.alicdn.com/tfs/TB1q7FybBTH8KJjy0FiXXcRsXXa-180-102.png',
  // },
  // {
  //   city: '张家口',
  //   color: '#7C5BF4',
  //   rgba: o => `rgba(124,91,244,${o})`,
  //   name: 'zhangjiakou',
  //   tipImg: 'https://img.alicdn.com/tfs/TB1SclwbBfH8KJjy1XbXXbLdXXa-180-102.png',
  // },
  // {
  //   city: '呼和浩特',
  //   color: '#D707FF',
  //   rgba: o => `rgba(215,7,255,${o})`,
  //   name: 'huhehaote',
  //   tipImg: 'https://img.alicdn.com/tfs/TB1zkFybBTH8KJjy0FiXXcRsXXa-180-102.png',
  // },
];

export const getCityConfigByName = name => cityConfig.find(c => c.name === name) || (console.warn(`[config/cityConfig] can't found city config of ${name}`), {});

export default { cityConfig };
