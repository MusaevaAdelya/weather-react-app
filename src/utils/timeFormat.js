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

export {
	formatUnixTime,
	getCurrentDateForTimezone,
	getCurrentTimeAndPeriodForTimezone,
};
