import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';
import Loading from '../components/Loading';
import MealsCard from './cards/MealsCard';
import './Meals.css';

function Meals() {
  const { fetchMeals,
    fetchMealsCategories,
    setLoading,
    isLoading,
    toggle,
    setToggle,
    dataMealsCategories,
    setDataMeals } = useContext(MyContext);

  const numberOfItems = 12;

  useEffect(() => {
    fetchMeals();
    fetchMealsCategories();
  }, []);

  const handleByCategory = async ({ target }) => {
    if (!toggle) {
      setLoading(true);
      setDataMeals([]);
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.value}`);
      const data = await response.json();
      const filterQuantity = await data.meals.slice(0, numberOfItems);
      setDataMeals(filterQuantity);
      setLoading(false);
      setToggle(true);
    } else {
      setToggle(false);
      fetchMeals();
    }
  };

  const handleAll = () => {
    fetchMeals();
  };

  return (
    <div className="main__meals">
      { isLoading ? <Loading /> : (
        <>
          { dataMealsCategories.map((btn) => (
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
          <MealsCard />
        </>
      )}
    </div>
  );
}

export default Meals;
