import React from 'react';
import { Chart, LineAdvance } from '../../src';
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
	const { onGetG2Instance, pure, ...others } = props;
	return <Chart forceUpdate pure={pure} appendPadding={10} data={MOCK_DATA} width={500} height={300} onGetG2Instance={onGetG2Instance}>
		<LineAdvance
			position="month*temperature"
			color="city"
			area
			{...others}
		/>
	</Chart>
}


describe('geomtrys-LineAdvance', () => {
	test('has tow geometry: line area', async () => {
		let chart = null;
		render(<Demo onGetG2Instance={c => {
			console.log(c);
			chart = c
		}} />);
		expect(chart.geometries.length).toBe(2);
		expect(chart.geometries[0].type).toBe('line');
		expect(chart.geometries[1].type).toBe('area');
	})

	test('smooth shape', async () => {
		let chart = null;
		render(<Demo shape="smooth" onGetG2Instance={c => {
			chart = c
		}} />);
		expect(chart.geometries[0].elements[0].shapeType).toBe('smooth');
		expect(chart.geometries[1].elements[0].shapeType).toBe('gradient-smooth');
		cleanup()
	});

	test('pure chart tooltip', async () => {
		let chart = null;
		render(<Demo shape="smooth" pure onGetG2Instance={c => {
			chart = c;
			console.log(chart.options.tooltip)
		}} />);
		expect(chart.options.tooltip).toBe(false);
		cleanup();
	})
	
})
