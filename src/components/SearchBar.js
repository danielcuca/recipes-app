import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import MyContext from '../context/MyContext';

// const URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
// const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function SearchBar() {
  const [textInput, setTextInput] = useState('');
  const [radioOption, setRadioOption] = useState('');

  const { pathname } = useLocation();

  const { setDataDrinks, setDataMeals } = useContext(MyContext);

  const handleChangeInput = ({ target }) => {
    setTextInput(target.value);
  };

  const handleChangeRadio = ({ target }) => {
    setRadioOption(target.value);
  };

  const updatedData = (data) => {
    if (pathname === '/meals') {
      setDataMeals(data.meals);
    } else if (pathname === '/drinks') {
      setDataDrinks(data.drinks);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let apiUrl = '';
      switch (pathname) {
      case '/meals':
        if (radioOption === 'ingredient') {
          apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${textInput}`;
        } else if (radioOption === 'name') {
          apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${textInput}`;
        } else if (radioOption === 'letter' && textInput.length !== 1) {
          global.alert('Your search must have only 1 (one) character');
        } else if (radioOption === 'letter') {
          apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?f=${textInput}`;
        }
        break;

      case '/drinks':
        if (radioOption === 'ingredient') {
          apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${textInput}`;
        } else if (radioOption === 'name') {
          apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${textInput}`;
        } else if (radioOption === 'letter' && textInput.length !== 1) {
          global.alert('Your search must have only 1 (one) character');
        } else if (radioOption === 'letter') {
          apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${textInput}`;
        }
        break;

      default:
        break;
      }
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        console.log('data:', data);
        updatedData(data);
        setTextInput('');
        setRadioOption('');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

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
      <button
        type="submit"
        data-testid="exec-search-btn"
        onClick={ (e) => handleSubmit(e) }
      >
        Search

      </button>
    </form>
  );
}

export default SearchBar;
