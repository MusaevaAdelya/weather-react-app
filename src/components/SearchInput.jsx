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

export default SearchInput;
