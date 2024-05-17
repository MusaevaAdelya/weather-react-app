import {
	getCurrentTimeAndPeriodForTimezone,
	getCurrentDateForTimezone,
	formatUnixTime,
} from '../utils/timeFormat';

import { memo } from 'react';

function Weather({ data, isMetric }) {
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
					<span className='current__temp'>
						{data.main.temp}
						{isMetric ? '°C' : '°F'}
					</span>
				</p>
				<p className='current__atmosphere'>
					{data.weather[0].description}
				</p>
				<p className='current__info'>
					Feels like {data.main.feels_like}
					{isMetric ? '°C' : '°F'}
				</p>
				<p className='current__info'>
					<i className='bi bi-wind color-accent'></i>{' '}
					{data.wind.speed} {isMetric ? 'm/s' : 'mph'}{' '}
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

export default memo(Weather);
