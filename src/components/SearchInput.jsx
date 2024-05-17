import { memo } from 'react';

function SearchInput({
	city,
	isMetric,
	setCity,
	setIsMetric,
	handleSearch,
	setIsError,
}) {
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
			<div className='search__checkbox-container'>
				<input
					type='checkbox'
					className='search__checkbox'
					id='search__checkbox'
					checked={isMetric}
					onChange={e => setIsMetric(e.target.checked)}
				/>
				<label
					htmlFor='search__checkbox'
					className='search__checkbox-text'
				>
					Metric?
				</label>
			</div>
			<button
				type='submit'
				className='bi bi-search search__icon'
			></button>
		</form>
	);
}

export default memo(SearchInput);
