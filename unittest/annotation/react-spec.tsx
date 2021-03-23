import React, { useState} from 'react';
import Chart from '../../src/components/Chart';
import Interval from '../../src/geometry/Interval';
import { Html, Line } from '../../src/components/Annotation';
import { ReactElement } from '../../src/components/Annotation';
import '../../src/core';
import { render, cleanup } from '@testing-library/react';


const MOCK_DATA = [
	{
		month: "Jan",
		city: "Tokyo",
		temperature: 7
	},
	{
		month: "Jan",
		city: "London",
		temperature: 3.9
	},
	{
		month: "Feb",
		city: "Tokyo",
		temperature: 13
	},
	{
		month: "Feb",
		city: "London",
		temperature: 4.2
	},
	{
		month: "Mar",
		city: "Tokyo",
		temperature: 16.5
	},
	{
		month: "Mar",
		city: "London",
		temperature: 5.7
	},
	{
		month: "Apr",
		city: "Tokyo",
		temperature: 14.5
	},
	{
		month: "Apr",
		city: "London",
		temperature: 8.5
	},
	{
		month: "May",
		city: "Tokyo",
		temperature: 10
	},
	{
		month: "May",
		city: "London",
		temperature: 11.9
	},
	{
		month: "Jun",
		city: "Tokyo",
		temperature: 7.5
	},
	{
		month: "Jun",
		city: "London",
		temperature: 15.2
	},
	{
		month: "Jul",
		city: "Tokyo",
		temperature: 9.2
	},
	{
		month: "Jul",
		city: "London",
		temperature: 17
	},
	{
		month: "Aug",
		city: "Tokyo",
		temperature: 14.5
	},
	{
		month: "Aug",
		city: "London",
		temperature: 16.6
	},
	{
		month: "Sep",
		city: "Tokyo",
		temperature: 9.3
	},
	{
		month: "Sep",
		city: "London",
		temperature: 14.2
	},
	{
		month: "Oct",
		city: "Tokyo",
		temperature: 8.3
	},
	{
		month: "Oct",
		city: "London",
		temperature: 10.3
	},
	{
		month: "Nov",
		city: "Tokyo",
		temperature: 8.9
	},
	{
		month: "Nov",
		city: "London",
		temperature: 5.6
	},
	{
		month: "Dec",
		city: "Tokyo",
		temperature: 5.6
	},
	{
		month: "Dec",
		city: "London",
		temperature: 9.8
	}
];

const Demo = (props) => {
	const { onGetG2Instance, ...others } = props;
	const [count, setCount] = useState(100);
	return <>
	<Chart appendPadding={10} data={MOCK_DATA} width={500} height={300} onGetG2Instance={onGetG2Instance}>
		<Interval
			position="month*temperature"
			color="city"
			area
			{...others}
		/>
    <Html position={['min', 'max']} html={`<div>${count}</div>`} />
		<ReactElement position={['min', 6]}  content={<div>{count}</div>} />
		<Line start={['min', 'min']} end={['max', 'max']} />
	</Chart>
	<div onClick={() => {
		setCount(count + 1)
	}}>click me</div>
	</>
}


describe('Anno-Annotation', () => {
	test('html', async () => {
		let chart = null;
		render(<Demo onGetG2Instance={c => { console.log(c); chart = c }} />);
		expect(chart.annotation().option.length).toBe(3);
    expect(chart.annotation().option[0].type).toBe('html');
    expect(chart.annotation().option[1].type).toBe('html');
    expect(chart.annotation().option[2].type).toBe('line');
    cleanup();
	})
})
