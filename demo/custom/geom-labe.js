# 自定义 geom label 位置

---

# 自定义 geom label 位置

````jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Geom, Axis, Tooltip, Legend, Coord, Shape } from '@ali/bizcharts';

Shape.registerShape('interval', 'leftLabel', {
  draw(cfg, container) {
    const points = this.parsePoints(cfg.points);
		
    container.addShape('polygon', {
      attrs: {
        points: [
          [points[0].x, points[0].y],
          [points[1].x, points[1].y],
          [points[2].x, points[2].y],
          [points[3].x, points[3].y]
        ],
        fill: cfg.color
      }
    });
    
    console.log(points,points[0].y, points[2].y, ((points[0].y - points[2].y) / 2))
    return container.addShape('text', {
      attrs: {
      	fontSize: 13,
      	text: cfg.origin._origin.sold,
      	fill: '#000',
        textAlign: 'left',
        textBaseline: 'middle',
        x: points[0].x - 40,
        y: points[0].y - ((points[0].y - points[2].y) / 2)
      }
    });
  }
});

const data = [
  { genre: 'Sports', sold: 75, income: 2300 },
  { genre: 'Strategy', sold: 115, income: 667 },
  { genre: 'Action', sold: 120, income: 982 },
  { genre: 'Shooter', sold: 350, income: 5271 },
  { genre: 'Other', sold: 150, income: 3710 },
  { genre: 'Strategy', sold: 115, income: 667 },
  { genre: 'Action', sold: 120, income: 982 },
  { genre: 'Shooter', sold: 350, income: 5271 },
  { genre: 'Other', sold: 150, income: 3710 }
];

const cols = {
  sold: { alias: '销售量' },
  genre: { alias: '游戏种类' }
};

ReactDOM.render((
  <Chart width={600} height={400} data={data} scale={cols} plotCfg={{margin: [40, 80, 40, 200]}} animate={false} >
    <Coord type="rect" transpose />
		<Axis name="genre" title={null} labelOffset={190} labels={{label:{textAlign: 'left'}}} />
		<Axis name="sold" />
		<Legend position="right" />
		<Tooltip />
		<Geom type="interval" position="genre*sold" color="genre" shape="leftLabel" />
	</Chart>
), document.getElementById('mountNode'));

````