import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
// const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function SearchBar() {
  const [textInput, setTextInput] = useState('');
  const [radioOption, setRadioOption] = useState('');

  // const { pathname } = useLocation();

  const handleChangeInput = ({ target }) => {
    setTextInput(target.value);
  };

  const handleChangeRadio = ({ target }) => {
    setRadioOption(target.value);
  };

  // const verifyOptions = () => {
  //   let url = '';
  //   switch (radioOption) {
  //   case 'ingredient':
  //     url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${textInput}`;
  //     return url;

  //   case 'name':
  //     url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${textInput}`;
  //     return url;

  //   case 'letter': {
  //     if (textInput.length > 1) {
  //       global.alert('Your search must have only 1 (one) character');
  //     }
  //     url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${textInput}`;
  //     return url;
  //   }

  //   default:
  //     break;
  //   }
  // };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     let apiUrl = '';
  //     try {
  //       if (pathname === '/meal') {
  //         apiUrl = verifyOptions();
  //       } else if (pathname === '/drinks') {
  //         apiUrl = verifyOptions();
  //       }

  //       const response = await fetch(apiUrl);

  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log('Data:', data);
  //       }
  //     } catch (error) {
  // log
  //     }
  //   };

  return (
    <form action="">
      <input
        data-testid="search-input"
        type="text"
        value={ textInput }
        placeholder="Search"
        onChange={ handleChangeInput }
      />
      <label htmlFor="ingredient">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="radio-option"
          value="ingredient"
          id="ingredient"
          checked={ radioOption === 'ingredient' }
          onChange={ handleChangeRadio }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          data-testid="name-search-radio"
          type="radio"
          name="radio-option"
          value="name"
          id="name"
          checked={ radioOption === 'name' }
          onChange={ handleChangeRadio }
        />
      </label>
      <label htmlFor="letter">
        First letter
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="letter"
          id="letter"
          value="letter"
          checked={ radioOption === 'letter' }
          onChange={ handleChangeRadio }
        />
      </label>
      <button data-testid="exec-search-btn">Search</button>
    </form>
  );
}

export default SearchBar;
