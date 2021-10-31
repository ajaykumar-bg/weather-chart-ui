import './App.css';
import Drawer from './components/common/drawer.component';
import WeatherChartContainer from './components/weather-chart/weather-chart.container';

function App() {
	return (
		<div className='app'>
			<Drawer>
				<WeatherChartContainer />
			</Drawer>
		</div>
	);
}

export default App;
