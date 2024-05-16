import React, { useState } from 'react';
import './styles/index.scss';

const API_KEY = 'c9ecd88c77676b8eb4080b4374ad2af2';

function formatUnixTime(unixTimestamp) {
	// Create a new Date object using the UNIX timestamp
	const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds

	// Get hours and minutes from the date object
	const hours = String(date.getHours()).padStart(2, '0'); // Ensure two digits for hours
	const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure two digits for minutes

	// Return formatted time string
	return `${hours}:${minutes}`;
}

function getCurrentDateForTimezone(timezoneOffset) {
	const currentTime = new Date(); // Get current time in UTC
	const localOffset = currentTime.getTimezoneOffset() * 60; // Get local timezone offset in seconds
	const targetOffset = timezoneOffset; // Target timezone offset in seconds
	const targetTime = new Date(
		currentTime.getTime() + (targetOffset + localOffset) * 1000
	); // Calculate target time

	return targetTime.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

function getCurrentTimeAndPeriodForTimezone(timezoneOffset) {
	const currentTime = new Date(); // Get current time in UTC
	const localOffset = currentTime.getTimezoneOffset() * 60; // Get local timezone offset in seconds
	const targetOffset = timezoneOffset; // Target timezone offset in seconds
	const targetTime = new Date(
		currentTime.getTime() + (targetOffset + localOffset) * 1000
	); // Calculate target time

	const hours = targetTime.getHours();
	const minutes = targetTime.getMinutes();
	const period = hours >= 12 ? 'PM' : 'AM';

	// Format hours to 12-hour clock format
	const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
	const formattedMinutes = String(minutes).padStart(2, '0');

	return [`${formattedHours}:${formattedMinutes}`, period];
}

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

function SearchInput({ city, setCity, handleSearch, setIsError }) {
	return (
		<form className='search' onSubmit={e => handleSearch(e)}>
			<input
				type='text'
				className='search__input'
				placeholder='Search a city'
				value={city}
				onChange={e => {
					setCity(e.target.value);
					setIsError(false);
				}}
			/>
			<button
				type='submit'
				className='bi bi-search search__icon'
			></button>
		</form>
	);
}

function Weather({ data }) {
	const [currentTime, period] = getCurrentTimeAndPeriodForTimezone(
		data.timezone
	);

	return (
		<div>
			<div className='current'>
				<h1 className='current__city-name'>{data.name}</h1>
				<p className='current__weather'>
					<img
						className='current__icon'
						src={`images/${data.weather[0].icon}.png`}
						// src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
						alt=''
					/>
					<span className='current__temp'>{data.main.temp}°C</span>
				</p>
				<p className='current__atmosphere'>
					{data.weather[0].description}
				</p>
				<p className='current__info'>
					Feels like {data.main.feels_like}°C
				</p>
				<p className='current__info'>
					<i className='bi bi-wind color-accent'></i>{' '}
					{data.wind.speed} m/s{' '}
					<i
						className='bi bi-droplet color-accent'
						style={{ marginLeft: '1rem' }}
					></i>
					{data.main.humidity}%
				</p>
				<p className='current__info'>
					Sunrise {formatUnixTime(data.sys.sunrise)} | Sunset{' '}
					{formatUnixTime(data.sys.sunset)}
				</p>
			</div>
			<div className='date'>
				<p className='date__time'>
					<span>{currentTime}</span>
					{period}
				</p>
				<p className='date__day'>
					{getCurrentDateForTimezone(data.timezone)}
				</p>
			</div>
		</div>
	);
}

export default App;
