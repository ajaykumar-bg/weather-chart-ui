import React, { useState, useEffect } from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from 'recharts';

function WeatherChart({ weatherData }) {
	const [chartData, setChartData] = useState([]);

	useEffect(() => {
		if (weatherData) {
			const { current, forecast } = weatherData;
			const initial = [{ name: 'Current', temp: current.temp_f }];
			const remaining = forecast.map((item) => {
				return {
					name: item.time,
					temp: item.temp_f,
				};
			});
			const final = [...initial, ...remaining];
			setChartData(final);
		}
	}, [weatherData]);

	return (
		<LineChart
			width={1000}
			height={300}
			data={chartData}
			margin={{
				top: 5,
				right: 30,
				left: 20,
				bottom: 5,
			}}
		>
			<CartesianGrid strokeDasharray='3 3' />
			<XAxis dataKey='name' />
			<YAxis />
			<Tooltip />
			<Line
				type='monotone'
				dataKey='temp'
				stroke='#8884d8'
				activeDot={{ r: 8 }}
			/>
		</LineChart>
	);
}

export default React.memo(WeatherChart);
