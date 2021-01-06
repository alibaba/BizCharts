import React from 'react';
import ScatterChart from '../../src/plots/ScatterChart';
import { render, cleanup } from '@testing-library/react';

const MOCK_DATA = [
  {
    "Title": "Guardians of the Galaxy",
    "Genre": "Action",
    "Revenue (Millions)": 333.13,
    "Rating": 8.1
  },
  {
    "Title": "Prometheus",
    "Genre": "Adventure",
    "Revenue (Millions)": 126.46,
    "Rating": 7
  },
  {
    "Title": "Split",
    "Genre": "Horror",
    "Revenue (Millions)": 138.12,
    "Rating": 7.3
  },
  {
    "Title": "Sing",
    "Genre": "Animation",
    "Revenue (Millions)": 270.32,
    "Rating": 7.2
  },
  {
    "Title": "Suicide Squad",
    "Genre": "Action",
    "Revenue (Millions)": 325.02,
    "Rating": 6.2
  },
  {
    "Title": "The Great Wall",
    "Genre": "Action",
    "Revenue (Millions)": 45.13,
    "Rating": 6.1
  },
  {
    "Title": "La La Land",
    "Genre": "Comedy",
    "Revenue (Millions)": 151.06,
    "Rating": 8.3
  },
  {
    "Title": "Mindhorn",
    "Genre": "Comedy",
    "Revenue (Millions)": null,
    "Rating": 6.4
  },
  {
    "Title": "The Lost City of Z",
    "Genre": "Action",
    "Revenue (Millions)": 8.01,
    "Rating": 7.1
  },
  {
    "Title": "Passengers",
    "Genre": "Adventure",
    "Revenue (Millions)": 100.01,
    "Rating": 7
  },
  {
    "Title": "Fantastic Beasts and Where to Find Them",
    "Genre": "Adventure",
    "Revenue (Millions)": 234.02,
    "Rating": 7.5
  },
  {
    "Title": "Hidden Figures",
    "Genre": "Other",
    "Revenue (Millions)": 169.27,
    "Rating": 7.8
  },
  {
    "Title": "Rogue One",
    "Genre": "Action",
    "Revenue (Millions)": 532.17,
    "Rating": 7.9
  },
  {
    "Title": "Moana",
    "Genre": "Animation",
    "Revenue (Millions)": 248.75,
    "Rating": 7.7
  },
  {
    "Title": "Colossal",
    "Genre": "Action",
    "Revenue (Millions)": 2.87,
    "Rating": 6.4
  },
  {
    "Title": "The Secret Life of Pets",
    "Genre": "Animation",
    "Revenue (Millions)": 368.31,
    "Rating": 6.6
  },
  {
    "Title": "Hacksaw Ridge",
    "Genre": "Other",
    "Revenue (Millions)": 67.12,
    "Rating": 8.2
  },
  {
    "Title": "Jason Bourne",
    "Genre": "Action",
    "Revenue (Millions)": 162.16,
    "Rating": 6.7
  },
  {
    "Title": "Lion",
    "Genre": "Other",
    "Revenue (Millions)": 51.69,
    "Rating": 8.1
  },
  {
    "Title": "Gold",
    "Genre": "Adventure",
    "Revenue (Millions)": 7.22,
    "Rating": 6.7
  },
  {
    "Title": "Hounds of Love",
    "Genre": "Crime",
    "Revenue (Millions)": null,
    "Rating": 6.7
  },
  {
    "Title": "Trolls",
    "Genre": "Animation",
    "Revenue (Millions)": 153.69,
    "Rating": 6.5
  },
  {
    "Title": "Independence Day: Resurgence",
    "Genre": "Action",
    "Revenue (Millions)": 103.14,
    "Rating": 5.3
  },
  {
    "Title": "Paris pieds nus",
    "Genre": "Comedy",
    "Revenue (Millions)": null,
    "Rating": 6.8
  },
  {
    "Title": "Bahubali: The Beginning",
    "Genre": "Action",
    "Revenue (Millions)": 6.5,
    "Rating": 8.3
  },
  {
    "Title": "Dead Awake",
    "Genre": "Horror",
    "Revenue (Millions)": 0.01,
    "Rating": 4.7
  },
  {
    "Title": "Bad Moms",
    "Genre": "Comedy",
    "Revenue (Millions)": 113.08,
    "Rating": 6.2
  },
  {
    "Title": "Assassin's Creed",
    "Genre": "Action",
    "Revenue (Millions)": 54.65,
    "Rating": 5.9
  },
  {
    "Title": "Why Him?",
    "Genre": "Comedy",
    "Revenue (Millions)": 60.31,
    "Rating": 6.3
  },
  {
    "Title": "X-Men: Apocalypse",
    "Genre": "Action",
    "Revenue (Millions)": 155.33,
    "Rating": 7.1
  },
  {
    "Title": "Deadpool",
    "Genre": "Action",
    "Revenue (Millions)": 363.02,
    "Rating": 8
  },
  {
    "Title": "Resident Evil: The Final Chapter",
    "Genre": "Action",
    "Revenue (Millions)": 26.84,
    "Rating": 5.6
  },
  {
    "Title": "Captain America: Civil War",
    "Genre": "Action",
    "Revenue (Millions)": 408.08,
    "Rating": 7.9
  },
  {
    "Title": "Interstellar",
    "Genre": "Adventure",
    "Revenue (Millions)": 187.99,
    "Rating": 8.6
  },
  {
    "Title": "Doctor Strange",
    "Genre": "Action",
    "Revenue (Millions)": 232.6,
    "Rating": 7.6
  },
  {
    "Title": "The Magnificent Seven",
    "Genre": "Action",
    "Revenue (Millions)": 93.38,
    "Rating": 6.9
  },
  {
    "Title": "5- 25- 77",
    "Genre": "Comedy",
    "Revenue (Millions)": null,
    "Rating": 7.1
  },
  {
    "Title": "Sausage Party",
    "Genre": "Animation",
    "Revenue (Millions)": 97.66,
    "Rating": 6.3
  },
  {
    "Title": "Moonlight",
    "Genre": "Other",
    "Revenue (Millions)": 27.85,
    "Rating": 7.5
  },
  {
    "Title": "Don't Fuck in the Woods",
    "Genre": "Horror",
    "Revenue (Millions)": null,
    "Rating": 2.7
  },
  {
    "Title": "The Founder",
    "Genre": "Other",
    "Revenue (Millions)": 12.79,
    "Rating": 7.2
  },
  {
    "Title": "Lowriders",
    "Genre": "Other",
    "Revenue (Millions)": 4.21,
    "Rating": 6.3
  },
  {
    "Title": "Pirates of the Caribbean: On Stranger Tides",
    "Genre": "Action",
    "Revenue (Millions)": 241.06,
    "Rating": 6.7
  },
  {
    "Title": "Miss Sloane",
    "Genre": "Other",
    "Revenue (Millions)": 3.44,
    "Rating": 7.3
  },
  {
    "Title": "Fallen",
    "Genre": "Adventure",
    "Revenue (Millions)": null,
    "Rating": 5.6
  },
  {
    "Title": "Star Trek Beyond",
    "Genre": "Action",
    "Revenue (Millions)": 158.8,
    "Rating": 7.1
  },
  {
    "Title": "The Last Face",
    "Genre": "Other",
    "Revenue (Millions)": null,
    "Rating": 3.7
  },
  {
    "Title": "Star Wars: Episode VII - The Force Awakens",
    "Genre": "Action",
    "Revenue (Millions)": 936.63,
    "Rating": 8.1
  },
  {
    "Title": "Underworld: Blood Wars",
    "Genre": "Action",
    "Revenue (Millions)": 30.35,
    "Rating": 5.8
  }];

const padding = [90, 90, 90, 90];

const basicCfg = {
  padding: padding,
  data: MOCK_DATA,
  xField: 'Revenue (Millions)',
  yField: 'Rating',
  shape: 'circle',
  colorField: 'Genre',
  forceFit: true,
  width: 500,
  height: 500,
}

describe('Plots-ScatterChart', () => {
  test('基础散点图', () => {
    let chart = null;
    render(<ScatterChart
      onGetG2Instance={c => (chart = c)}
      title="基础散点图"
      {...basicCfg}
      sizeField="Rating"
      pixelRatio={3}
      renderer="svg"
      meta={{
        Rating: {
          formatter: val => `${val}%`
        }
      }}
      color={['red', 'green', 'yellow', 'black', 'orange']}
      pointStyle={{
        strokeOpacity: 0.5,
      }}
      size={[5, 10]}
    />);
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });

  test('xAxis-散点图', () => {
    let chart = null;
    render(<ScatterChart
      title="xAxis-散点图"
      {...basicCfg}
      xAxis={{
        line: {
          visible: true,
          style: {
            stroke: "black",
            lineWidth: 2,
            lineDash: [4, 5],
            strokeOpacity: 0.7,
            shadowColor: "black",
            shadowBlur: 10,
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            cursor: "pointer",
          },
        },
        grid: {
          visible: true,
          line: {
            style: {
              stroke: "orange",
              lineWidth: 2,
              lineDash: [4, 5],
            },
          },
        },
        label: {
          visible: true,
          // formatter: (val) => `${val}$`,

          suffix: "%",
          // @ts-ignore
          // offsetX: 40,
          // offsetY: 4,
          offset: 20,
          style: {
            fill: "red",
          },
          autoHide: true,
          autoRotate: true,
        },
        tickLine: {
          visible: true,
          style: {
            fill: "red",
            stroke: "red",
          },
        },
        title: {
          // @ts-ignore
          visible: true,
          text: "名称11",
          offset: 50,
          style: {
            fill: "blue",
          },
        },

      }}
      onGetG2Instance={c => (chart = c)}
    />);
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });


  test('label-散点图', () => {
    let chart = null;
    render(<ScatterChart
      onGetG2Instance={c => (chart = c)}
      title="label-散点图"
      {...basicCfg}
      label={
        {
          visible: true,
          formatter: val => `${val.Rating}1`,
          offsetX: 10,
          offsetY: 10,
          style: {
            fill: 'red',
          },
        }
      }
    />);
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });


  test('quadrant-散点图', () => {
    let chart = null;
    render(<ScatterChart
      onGetG2Instance={c => (chart = c)}
      title="quadrant-散点图"
      {...basicCfg}
      quadrant={{
        xBaseline: 500,
        yBaseline: 5,
        lineStyle: {
          //@ts-ignore
          fill: 'red',
          stroke: 'red',
        },
        regionStyle: [
          {
            //@ts-ignore
            stroke: 'pink'
          },
          {
            //@ts-ignore
            fill: 'blue'
          },
          {
            //@ts-ignore
            fill: 'green'
          },
          {
            //@ts-ignore
            fill: 'yellow'
          },
        ],
        labels: [ // labels优先级高于label
          {
            content: '第一象限',
            style: {
              fill: 'red'
            }
          },
          {
            content: '第二象限',
          },
          {
            content: '第三象限',
          },
          {
            content: '第四象限',
          },
        ],
        label: {
          text: ['第一象限', '第二象限', '第三象限', '第四0象限'],
          style: {
            fill: '#ccc',
            fontSize: 16,
            opacity: 0.6
          }
        }

      }}
    />);
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });

  test('trendline-散点图', () => {
    let chart = null;
    render(<ScatterChart
      onGetG2Instance={c => (chart = c)}
      title="quadrant-散点图"
      {...basicCfg}
      trendline={{
        type: 'poly',
        style: {
          stroke: 'black',
          lineWidth: 1
        },
        showConfidence: true,
        confidenceStyle: {
          fill: 'red',
          opacity: 0.1
        }
      }}
    />);
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });


});
