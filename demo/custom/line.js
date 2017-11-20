# 双Y轴多数据折线图

---

# 双Y轴多数据折线图

````jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Geom, Axis, Frame, View, Tooltip, Legend} from '@ali/bizcharts';
import DataSet from '@antv/data-set';


const data = [
  { genre: 'Sports', sold: 275, income: 230, male: 1, female: 5 },
  { genre: 'Strategy', sold: 115, income: 667, male: 2, female: 3 },
  { genre: 'Action', sold: 120, income: 982, male: 3, female: 8 },
  { genre: 'Shooter', sold: 350, income: 5271, male: 4, female: 2 },
  { genre: 'Other', sold: 150, income: 3710, male: 3, female: 7 }
];

const ds = new DataSet();
const dv = ds.createView('tt');
dv.source(data);


//let category = new Frame(data);
//category = Frame.combineColumns(category, ['male', 'female'], 'category', 'type', 'genre');

const cols = {
  quantity: {
    tickCount: 6
  },
  category: {
    tickCount: 6
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      keys: ['sold', 'income']
    }
  }
  refreshFrame = () => {
    this.setState({
      keys: this.state.length > 2 ? ['sold', 'income'] : ['sold', 'income', 'female']
    })
  }
  render() {
    const { keys } = this.state;
    //let quantity = new Frame(data);
		//quantity = Frame.combineColumns(quantity, keys, 'quantity', 'type', 'genre');
    dv.transform({
      type:'fold',
      fields:keys,
      value:'quantity',
      key:"type",
      retains:['genre'],
		});

    return (<div>
      <button onClick={this.refreshFrame}>更新数据</button>
      <Chart height={400} data={dv} scals={cols} forceFit>
        <Axis name="genre" title={null} />
        <Legend />
        <Tooltip title={null} />
        <Geom type="line" position="genre*quantity" shape="smooth" color="type" />
      </Chart>
   </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('mountNode'));
````