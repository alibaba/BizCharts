#  词云 - 添加背景和图片(数探)图

---

#  词云 - 添加背景和图片(数探)图

````jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Geom, Coord, Tooltip, Shape, Util } from '@ali/bizcharts';
import CloudChart from '@ali/bizcharts-cloud';

// regist a cloud shape
Shape.registShape('point', 'customCloud', {
  drawShape(cfg, container) {
    cfg.points = this.parsePoints(cfg.points);
    const x = cfg.points[0].x;
    const y = cfg.points[0].y;

    // 背景圆
    container.addShape('circle', {
      attrs: {
        x,
        y,
        fill: cfg.origin._origin.bg || cfg.color,
        r: cfg.size / 2
      }
    });

    // 图片
    const imgWidth = 30;
    container.addShape('image', {
      attrs: {
        x: x - (imgWidth / 2),
        y: y + (imgWidth / 2) - 12,
        width: imgWidth,
        height: imgWidth,
        img: cfg.origin._origin.img
      }
    });

    // 文字样式
    const attrs = Util.mix(true, {}, {
      fillOpacity: cfg.opacity,
      fontSize: 13,
      rotate: 0,
      text: cfg.origin._origin.cate,
      textAlign: 'center',
      fill: '#fff',
      textBaseline: 'Alphabetic'
    }, cfg.style);

    return container.addShape('text', {
      attrs: Util.mix(attrs, {
        x,
        y: cfg.origin._origin.img ? (y - 10) : y
      })
    });
  }
});

const data = [
  {
    cate: '天秤座',
    size: 10,
    img: '//img.alicdn.com/tps/TB1vvFqPVXXXXaHXpXXXXXXXXXX-200-200.png',
    bg: '#5d91fb'
  },
  {
    cate: '射手座',
    size: 8,
    img: '//img.alicdn.com/tps/TB1YvZ0PFXXXXc8XVXXXXXXXXXX-200-200.png',
    bg: '#7bc8a7'
  },
  {
    cate: '白羊座',
    size: 9,
    img: '',
    bg: '#d881ae'
  },
  {
    cate: '水瓶座',
    size: 8,
    img: '',
    bg: '#ebc04c'
  },
  {
    cate: '天蝎座',
    size: 8,
    img: '',
    bg: '#b5a8e1'
  },
  {
    cate: '双子座',
    size: 6,
    img: '',
    bg: '#c8536f'
  },
  {
    cate: '双鱼座',
    size: 7,
    img: '',
    bg: '#f2da93'
  },
  {
    cate: '狮子座',
    size: 4,
    img: '',
    bg: '#df8e58'
  },
  {
    cate: '金牛座',
    size: 4,
    img: '',
    bg: '#908cda'
  },
  {
    cate: '巨蟹座',
    size: 9,
    img: '',
    bg: '#9580db'
  },
  {
    cate: '处女座',
    size: 6,
    img: '',
    bg: '#cfe7d1'
  },
  {
    cate: '摩羯座',
    size: 7,
    img: '',
    bg: '#93a2ee'
  }
];

data.sort((a, b) => b.size - a.size);
// 获取数据的最大值和最小值
const max = data[0].size;
const min = data[data.length - 1].size;
const maxDiameter = 110;
const minDiameter = 60;
// 设定每项大小配置函数
const size = words => (((words.size - min) / (max - min)) * (maxDiameter - minDiameter)) + minDiameter;
// 设定文字内容
const text = () => '〇'; // 以该字计算所占高宽

ReactDOM.render((
  <CloudChart width={800} height={400} data={data} plotCfg={{ margin: 0 }} text={text} size={size} padding={20}>
    <Coord reflect />
    <Tooltip title={null} />
    <Geom type="point" position="x*y" size={['size', s => s]} shape="customCloud" style={{ fontFamily: 'serif' }} tooltip="cate*size" />
	</CloudChart>
), document.getElementById('mountNode'));

````