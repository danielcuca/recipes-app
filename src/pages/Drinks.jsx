import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';
import Loading from '../components/Loading';
import DrinksCard from './cards/DrinksCard';
import './Drinks.css';

function Drinks() {
  const { fetchDrinks,
    fetchDrinksCategories,
    setLoading,
    isLoading,
    toggle,
    setToggle,
    dataDrinksCategories,
    setDataDrinks } = useContext(MyContext);

  const numberOfItems = 12;

  useEffect(() => {
    fetchDrinks();
    fetchDrinksCategories();
  }, []);

  const handleByCategory = async ({ target }) => {
    setLoading(true);
    if (!toggle) {
      setDataDrinks([]);
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.value}`);
      const data = await response.json();
      const filterQuantity = await data.drinks.slice(0, numberOfItems);
      setDataDrinks(filterQuantity);
      setLoading(false);
      setToggle(true);
    } else {
      setToggle(false);
      fetchDrinks();
    }
  };

  const handleAll = () => {
    fetchDrinks();
    setToggle(false);
  };

  return (
    <div className="main__drinks">
      { isLoading ? <Loading /> : (
        <>
          { dataDrinksCategories.map((btn) => (
            <button
              key={ btn.strCategory }
              data-testid={ `${btn.strCategory}-category-filter` }
              value={ btn.strCategory }
              onClick={ handleByCategory }
            >
              {btn.strCategory}
            </button>
          ))}
          <button data-testid="All-category-filter" onClick={ handleAll }>All</button>
          <DrinksCard />
        </>
      )}
    </div>
  );
}

export default Drinks;
