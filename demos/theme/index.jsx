/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Chart, Interval, Tooltip, useTheme, Effects } from '../../src';
// import { useChartTheme } from '../../src/hooks/useChartInstance';

const data = [
  {
    year: '1991',
    value: 3,
  },
  {
    year: '1992',
    value: 4,
  },
  {
    year: '1993',
    value: 3.5,
  },
  {
    year: '1994',
    value: 5,
  },
  {
    year: '1995',
    value: 4.9,
  },
  {
    year: '1996',
    value: 6,
  },
  {
    year: '1997',
    value: 7,
  },
  {
    year: '1998',
    value: 9,
  },
  {
    year: '1999',
    value: 13,
  },
];

function Basic() {
  const thems = [
    { name: 'Default', value: 'default' },
    { name: 'Dark', value: 'dark' },
    { name: 'Light', value: 'light' },
  ];
  const [theme, setTheme] = useTheme('dark');
  console.log(theme);
  const [chart, setChart] = useState();
  return (
    <div style={{ width: '100%', height: 350 }}>
      <Chart data={data} autoFit theme={theme} onGetG2Instance={setChart}>
        <Interval position="year*value" />
        <Tooltip />
        <Effects>
          {chart => {
            data.forEach((item) => {
              chart
                .annotation()
                .text({
                  position: [item.year, item.value],
                  content: item.value,
                  style: {
                    textAlign: 'center',
                  },
                  offsetY: -30,
                })
                .text({
                  position: [item.type, item.value],
                  content: (item.percent * 100).toFixed(0) + '%',
                  style: {
                    textAlign: 'center',
                  },
                  offsetY: -12,
                });
            });
          }}
        </Effects>
      </Chart>
      <div style={{ display: 'flex' }}>
        {thems.map(item => (
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              margin: '5px 0',
              color: theme.name === item.value ? theme.defaultColor : '',
              border: '1px solid #999',
              cursor: 'pointer',
            }}
            onClick={() => {
              if (chart) {
                // chart.theme(item.value);
              }
              setTheme(item.value);
              console.log(`change theme from ${theme.name} to ${item.value}`);
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Basic;
