import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const numberOfItems = 12;
  const [isLoading, setLoading] = useState(true);
  const [dataDrinks, setDataDrinks] = useState(null);
  const [dataMeals, setDataMeals] = useState(null);
  const fetchDrinks = async () => {
    const response = await fetch(DRINKS_URL);
    const data = await response.json();
    const filterQuantity = await data.drinks.slice(0, numberOfItems);
    setDataDrinks(filterQuantity);
    setLoading(false);
  };
  const fetchMeals = async () => {
    const response = await fetch(MEALS_URL);
    const data = await response.json();
    const filterQuantity = await data.meals.slice(0, numberOfItems);
    setDataMeals(filterQuantity);
    setLoading(false);
  };
  const value = useMemo(() => ({
    isLoading,
    setLoading,
    dataDrinks,
    fetchDrinks,
    fetchMeals,
    dataMeals,
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
