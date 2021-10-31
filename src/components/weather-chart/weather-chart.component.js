import React from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from 'recharts';

const getWeatherData = (weatherData) => {
	if (weatherData) {
		const { current, forecast } = weatherData;
		const initial = [{ name: 'Current', temp: current.temp_f }];
		const remaining = forecast.map((item) => {
			return {
				name: item.time,
				temp: item.temp_f,
			};
		});
		return [...initial, ...remaining];
	}
};

function WeatherChart({ weatherData }) {
	const chartData = React.useMemo(
		() => getWeatherData(weatherData),
		[weatherData]
	);
	if (!weatherData) {
		return null;
	}

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
