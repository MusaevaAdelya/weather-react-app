import React, { useState } from 'react';
import SearchInput from './SearchInput';
import Weather from './Weather';

const API_KEY = 'c9ecd88c77676b8eb4080b4374ad2af2';

function App() {
	const [city, setCity] = useState('');
	const [dataCurrent, setDataCurrent] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	async function sendRequest(url) {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		return data;
	}

	async function handleSearch(e) {
		e.preventDefault();
		setDataCurrent({});

		try {
			setIsLoading(true);

			const currentData = await sendRequest(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
			);
			setDataCurrent(currentData);
		} catch (error) {
			console.error('Error:', error);
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<main>
			<div className='bg-image'></div>
			<div className='app-container'>
				<SearchInput
					city={city}
					setCity={setCity}
					handleSearch={handleSearch}
					setIsError={setIsError}
				/>
				{isLoading && <p className='message'>Loading...</p>}
				{isError && <p className='message'>{city} is not a city</p>}
				{Object.keys(dataCurrent).length !== 0 && !isError && (
					<Weather data={dataCurrent} />
				)}
			</div>
		</main>
	);
}

export default App;
