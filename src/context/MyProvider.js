import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const DRINKS_CATEGORIES_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const MEALS_CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const numberOfItems = 12;
  const numberOfCategories = 5;

  const [isLoading, setLoading] = useState(true);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [dataDrinksCategories, setDataDrinksCategories] = useState([]);
  const [dataMeals, setDataMeals] = useState([]);
  const [dataMealsCategories, setDataMealsCategories] = useState([]);
  const [toggle, setToggle] = useState(false);

  const fetchDrinks = async () => {
    const response = await fetch(DRINKS_URL);
    const data = await response.json();
    const filterQuantity = await data.drinks.slice(0, numberOfItems);
    setDataDrinks(filterQuantity);
    setLoading(false);
  };

  const fetchDrinksCategories = async () => {
    const responseCategories = await fetch(DRINKS_CATEGORIES_URL);
    const dataCategories = await responseCategories.json();
    const filterCategories = await dataCategories.drinks
      .slice(0, numberOfCategories);
    setDataDrinksCategories(filterCategories);
  };

  const fetchMeals = async () => {
    const response = await fetch(MEALS_URL);
    const data = await response.json();
    const filterQuantity = await data.meals.slice(0, numberOfItems);
    setDataMeals(filterQuantity);
    setLoading(false);
  };

  const fetchMealsCategories = async () => {
    const responseCategories = await fetch(MEALS_CATEGORIES_URL);
    const dataCategories = await responseCategories.json();
    const filterCategories = await dataCategories.meals
      .slice(0, numberOfCategories);
    setDataMealsCategories(filterCategories);
  };

  const value = useMemo(() => ({
    isLoading,
    setLoading,
    setDataDrinks,
    dataDrinks,
    dataDrinksCategories,
    fetchDrinks,
    fetchDrinksCategories,
    setDataMeals,
    dataMeals,
    dataMealsCategories,
    fetchMeals,
    fetchMealsCategories,
    toggle,
    setToggle,
  }));

  return (
    <MyContext.Provider value={ value }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
