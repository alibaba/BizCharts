# 环状图

---

# 环状图

````jsx
import { Chart, Coord, Geom, Stat, Tooltip, Guide, View }  from '@ali/bizcharts';
import DataSet from '@antv/data-set';


const data = [
  { genre: 'boy', sold: 195, type: '人群1' },
  { genre: 'girl', sold: 105, type: '人群1' },

  { genre: 'boy', sold: 205, type: '人群2' },
  { genre: 'girl', sold: 295, type: '人群2' },

  { genre: 'boy', sold: 305, type: '人群3' },
  { genre: 'girl', sold: 395, type: '人群3' },

  { genre: 'boy', sold: 405, type: '人群4' },
  { genre: 'girl', sold: 495, type: '人群4' },
];
//const frame = new Frame(data);
//const groups = Frame.group(frame, 'type');
const ds = new DataSet();
const dv = ds.createView('tt');
dv.source(data);
dv.transform({
  type: 'group',
	groupBy: [ 'type' ], // 以year字段进行分组
	orderBy: [ 'sold' ] // 以month字段进行排序
});
console.log(dv);
const groups = dv.rows;
// 自定义参数
const width = 200; // 每个环状图的宽
const spaceX = 80; // 两个环状图之间的水平间距
const spaceY = 50; // 两个环状图之间的垂直间距
const cols = 2; // 列数
// 计算所得参数
const rows = Math.ceil(groups.length / cols);
const chartWidth = (width * cols) + (spaceX * (cols - 1));
const chartHeight = (width * rows) + (spaceY * (rows - 1));
const intervalX = spaceX / chartWidth / 2;
const intervalY = spaceY / chartHeight / 2;

ReactDOM.render((
  <Chart width={chartWidth} height={chartHeight} plotCfg={{ margin: 0 }} animate={false}>
		{
			groups.map((subFrame, index) => {
        console.log(subFrame);
        
      	const col = index % cols;
        const row = Math.floor(index / cols);
        const x1 = ((1 + (intervalX * 2)) / cols) * col;
        const y1 = ((1 + (intervalY * 2)) / rows) * row;
        const x2 = (((1 + (intervalX * 2)) / cols) * (col + 1)) - (intervalX * 2);
        const y2 = (((1 + (intervalY * 2)) / rows) * (row + 1)) - (intervalY * 2);
        const boy = subFrame[0];
        const percent = Math.round(boy.sold / (boy.sold + subFrame[1].sold) * 100);
				const dv1 = ds.createView(index);
				dv1.source(subFrame);
        dv1.transform({
          type: 'percent',
          field: 'sold',           
          dimension: 'genre',       
          as: 'percent'            
				})
        return (
        	<View key={index} data={dv1} start={{ x: x1, y: y1 }} end={{ x: x2, y: y2 }}>
          	<Coord type="theta" radius={1} innerRadius={0.7} />
            <Tooltip />
            <Geom type="intervalStack" position='percent' color={['genre', ['#c81889', '#ddd']]} />
            <Guide html={{position:[-5.5, 0],alignX:'left',alignY:'bottom',offsetX:-40,offsetY:-70,html:'<div class="desc" style="white-space: nowrap; z-index: -1;">${percent}%</div>'}}/>
            <Guide html={{position:[-5.5, 0],alignX:'left',alignY:'bottom',offsetX:80,offsetY:-70,html:'<div class="title" style="white-space: nowrap; z-index: -1;">${boy.type}</div>'}}/>
         	</View>
        );
			})
		}
	</Chart>
), document.getElementById('mountNode'));

````