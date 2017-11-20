# 漏斗图

---

# 漏斗图

````jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Geom, Coord, Legend, Tooltip,Label} from '@ali/bizcharts';

var data = [
        {"action": "Website visits", "value": 5654},
        {"action": "Downloads", "value": 4064},
        {"action": "Requested price list", "value": 1987},
        {"action": "Invoice sent", "value": 976},
        {"action": "Finalized", "value": 484}
      ];

ReactDOM.render((
  <Chart height={450} width={600} data={data}  plotCfg={{margin: [80, 150, 80, 150]}}>
    <Coord type="rect" transpose scale={[1, -1]} />
    <Legend name="action" position="bottom" />
    <Tooltip />
    <Geom type="intervalStack" adjustType="symmetric" position="action*value" color={['action', ['#C82B3D', '#EB4456', '#F9815C', '#F8AB60', '#EDCC72']]} shape="funnel">
      <Label label='action' offset={10} fontSize={14}/>
    </Geom>
  </Chart>
), document.getElementById('mountNode'));
````