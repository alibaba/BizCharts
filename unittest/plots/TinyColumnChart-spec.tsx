import React from 'react';
import TinyColumnChart from '../../src/plots/TinyColumnChart';
import { render, cleanup } from '@testing-library/react';

const MOCK_DATA = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
];


const basicCfg = {
    data: MOCK_DATA,
    width: 400,
    height: 400,
    xField: 'year',
    yField: 'value',
}


describe('Plots-TinyColumnChart', () => {
    test('基础-TinyColumnChart', () => {
        let chart = null;
        render(<TinyColumnChart
            {...basicCfg}
            color="pink"
            onGetG2Instance={(c) => {
                chart = c;
            }}
        />);
        expect(chart.options).toMatchSnapshot();
        cleanup();
    });
    test('TinyColumnChart-guidLine-type', () => {
        let chart = null;
        render(<TinyColumnChart
            {...basicCfg}
            color="pink"
            columnStyle={{
                fill: 'red' // 优先级高于color
            }}
            guideLine={[
                {
                    type: 'mean',
                    lineStyle: {
                        stroke: 'red',
                    },
                    text: {
                        position: 'start',
                        content: '平均值',
                        style: {
                            lineWidth: 2,
                        },
                    },
                },
            ]}
            onGetG2Instance={(c) => {
                chart = c;
            }}
        />);
        expect(chart.options).toMatchSnapshot();
        cleanup();
    });
    test('TinyColumnChart-guidLine-start', () => {
        let chart = null;
        render(<TinyColumnChart
            {...basicCfg}
            guideLine={[
                {
                    start: ['min', 5],
                    end: ['max', 5],
                    lineStyle: {
                        stroke: 'red',
                    },
                    text: {
                        position: 'start',
                        content: '值:5',
                        style: {
                            lineWidth: 2,
                        },
                    },
                }
            ]}
            onGetG2Instance={(c) => {
                chart = c;
            }}
        />);
        expect(chart.options).toMatchSnapshot();
        // cleanup();
    });

});
