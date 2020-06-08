import React, {useEffect, useState} from 'react';
import {
  Chart,
  Line,
  
  Annotation,
} from '../../src';


function Labelline () {
  const [data, setData] = useState([]);
  useEffect(() => {
     fetch('https://alifd.alibabausercontent.com/materials/@bizcharts/other-datamarker_dataregion/0.1.4/mock.json')
       .then(res => res.json())
       .then(resdata => {
           setData(resdata);
       })
   }, [])
 



  return (
    <Chart
      height={400}
      data={data}
      autoFit
      scale={{
        time: {
          range: [0, 1],
        },
      }}
    >
      
      <Line
        position="time*rate"
      />
      <Annotation.DataMarker
        position={['2014-01-03', 6.763]}
        text={{
          content: '受稳健货币政策影响，协定存款利\n率居高不下,收益率达6.763%',
          style: {
            textAlign: 'left',
          },
        }}
      />
       <Annotation.DataMarker
          position={['2013-05-31', 2.093]}
          text={{
            content: '余额宝刚成立时，并未达到目标资产\n配置，故收益率较低',
            style: {
              textAlign: 'left',
            },
          }}
        />
        <Annotation.DataMarker
          position={['2016-09-04', 2.321]}
          autoAdjust={false}
          text={{
            content: '受积极货币政策的影响，收益率降\n到历史最低2.321%',
            style: {
              textAlign: 'right',
            },
          }}
          line={{
            length: 30,
            style: {
              stroke: 'red'
            }
          }}
        />
        <Annotation.DataRegion
          start={['2016-12-02', 2.517]}
          end={['2017-03-24', 3.83]}
          text={{
            content: '',
          }}
          lineLength={50}
        />
        <Annotation.DataMarker
          position={['2016-12-02', 2.517]}
          autoAdjust={false}
          text={{
            content: '宏观经济过热，受稳健货币政策影\n响，余额宝收益率随之上升',
            style: {
              textAlign: 'left',
            },
          }}
          line={{
            length: 130,
          }}
        />
        <Annotation.DataMarker
          position={['2017-03-24', 3.83]}
          line={{
            length: 50,
          }}
        />
        <Annotation.RegionFilter
            top
            start={['2016-01-01', 2.1]}
            end={['2016-12-02', 2.517]}
            color='yellow'
        />
      
    </Chart>
  );
}

export default Labelline;
