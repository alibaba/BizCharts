# shape自定义右侧label

---

# shape自定义右侧label

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Chart, Geom, Axis, Tooltip, Legend, Coord, Shape } from '@ali/bizcharts';

Shape.registerShape('interval', 'leftLabel', {
  getPoints: function(cfg) {
    const width = cfg.size;
    const x = cfg.x;
    const min = cfg.y0;
    const max = cfg.y;
    
    return [
        {x: x - width / 2, y: min},
        {x: x - width / 2, y: max},
        {x: x + width / 2, y: max},
        {x: x + width / 2, y: min},  
        {x: x - width / 2, y: max},
        {x: x - width / 2, y: 1.0},
        {x: x + width / 2, y: 1.0},
        {x: x + width / 2, y: max},       
    ];
  },
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
    
    container.addShape('polygon', {
      attrs: {
        points: [
          [points[4].x, points[4].y],
          [points[5].x, points[5].y],
          [points[6].x, points[6].y],
          [points[7].x, points[7].y]
        ],
        fill: '#f8f8f8'
      }
    });    

    return container.addShape('text', {
      attrs: {
      	fontSize: 13,
      	text: cfg.origin._origin.genre,
      	fill: '#000',
        textAlign: 'left',
        textBaseline: 'middle',
        x: points[0].x + 400,
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
  { genre: 'Other', sold: 150, income: 3710 }
];

const cols = {
  sold: { alias: '销售量' },
  genre: { alias: '游戏种类' }
};

class App extends Component {
  componentDidMount() {
    this.chart = this.c.getG2Instance();
//    this.chart.downloadImage();
  }
  render() {
    return (<Chart width={600} height={400} data={data} scals={cols} animate={false} plotCfg={{margin: [20, 200, 20, 100]}} ref={(c) => { this.c = c; }}>
    <Coord type="rect" transpose />
		<Axis name="genre" title={null} labelOffset={20} tickLine={null} line={null} />
    <Axis name="sold" visible={false} />
		<Geom type="interval" position="genre*sold" color="genre" shape="leftLabel" />
	</Chart>)
  }
}

ReactDOM.render(<App />, document.getElementById('mountNode'));

````