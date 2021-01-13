import React from 'react';
import TinyLineChart from '../../src/plots/TinyLineChart';
import * as Annotation from '../../src/components/Annotation'
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


describe('Plots-TinyLineChart', () => {
    test('基础TinyLineChart', () => {
        let chart = null;
        render(<TinyLineChart
            {...basicCfg}
            size={10}
            onGetG2Instance={(c) => {
                chart = c;
            }}
        />);
        expect(chart.options.lineStyle.lineWidth).toBe(10);
        expect(chart.options.data[0]).toBe(3);
        expect(chart.options).toMatchSnapshot();
        cleanup();
    });
    test('TinyLineChart-guidLine-type', () => {
        let chart = null;
        render(<TinyLineChart
            {...basicCfg}
            smooth
            color="pink"
            lineStyle={{
                stroke: 'red' // 优先级高于color
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
    test('TinyLineChart-guidLine-start', () => {
        let chart = null;
        render(<TinyLineChart
            {...basicCfg}
            smooth
            color="pink"
            lineStyle={{
                stroke: 'red' // 优先级高于color
            }}
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
        cleanup();
    });

});
