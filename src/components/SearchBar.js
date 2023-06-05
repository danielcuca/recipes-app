import React from 'react';

function SearchBar() {
  return (
    <form action="">
      <input data-testid="search-input" type="text" placeholder="Search" />
      <label htmlFor="">
        <input data-testid="ingredient-search-radio" type="radio" name="" id="" />
      </label>
      <label htmlFor="">
        <input data-testid="name-search-radio" type="radio" name="" id="" />
      </label>
      <label htmlFor="">
        <input data-testid="first-letter-search-radio" type="radio" name="" id="" />
      </label>
      <button data-testid="exec-search-btn">Search</button>
    </form>
  );
}

export default SearchBar;
