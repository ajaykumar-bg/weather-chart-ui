import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Box, CircularProgress } from '@mui/material';

import WeatherChart from './weather-chart.component';
import { SERVER_URL } from '../../constants';

const API_URL = `${SERVER_URL}/weather-data`;

function WeatherContainer() {
	const [loading, setLoading] = useState(false);
	const [weatherData, setWeatherData] = useState(null);
	const [error, setError] = useState('');

	const MINUTE_MS = 5000;

	useEffect(() => {
		const interval = setInterval(() => {
			getWeatherDetails();
		}, MINUTE_MS);

		return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
	}, []);

	const getWeatherDetails = () => {
		setLoading(true);
		let url = API_URL;
		axios
			.get(url)
			.then((response) => {
				setWeatherData(response.data);
			})
			.catch((err) => {
				setError(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		getWeatherDetails();
	}, []);

	if (loading) {
		return (
			<Box sx={{ display: 'flex' }}>
				<CircularProgress />
			</Box>
		);
	}
	if (error) {
		return <div className='error'>{error}</div>;
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<WeatherChart weatherData={weatherData} />
		</Box>
	);
}

export default WeatherContainer;
